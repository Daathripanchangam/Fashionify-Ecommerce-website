// Import required modules
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '1234',
  server: process.env.DB_SERVER || 'LAPTOP-A7CLFG45',
  database: process.env.DB_DATABASE || 'ShopEasy',
  options: {
    encrypt: false, // Set to true only for Azure
    trustServerCertificate: true // Important for local dev
  }
};

// Connect to database
async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// --- API ROUTES ---

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Products WHERE ProductID = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  const { customerName, email, address, items, total } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const transaction = new sql.Transaction(pool);

    await transaction.begin();

    try {
      const request = transaction.request();
      request.input('customerName', sql.NVarChar, customerName);
      request.input('email', sql.NVarChar, email);
      request.input('address', sql.NVarChar, address);
      request.input('total', sql.Decimal(10, 2), total);

      const orderResult = await request.query(`
        INSERT INTO Orders (CustomerName, Email, Address, TotalAmount) 
        OUTPUT INSERTED.OrderID 
        VALUES (@customerName, @email, @address, @total)
      `);

      const orderId = orderResult.recordset[0].OrderID;

      for (const item of items) {
        await transaction.request()
          .input('orderId', sql.Int, orderId)
          .input('productId', sql.Int, item.product.id)
          .input('quantity', sql.Int, item.quantity)
          .input('price', sql.Decimal(10, 2), item.product.price)
          .query(`
            INSERT INTO OrderItems (OrderID, ProductID, Quantity, Price)
            VALUES (@orderId, @productId, @quantity, @price)
          `);
      }

      await transaction.commit();
      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders by email
app.get('/api/orders/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`
        SELECT o.*, oi.ProductID, oi.Quantity, oi.Price, p.Name as ProductName
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        JOIN Products p ON oi.ProductID = p.ProductID
        WHERE o.Email = @email
      `);

    const orderMap = new Map();

    result.recordset.forEach(row => {
      if (!orderMap.has(row.OrderID)) {
        orderMap.set(row.OrderID, {
          id: row.OrderID,
          customerName: row.CustomerName,
          email: row.Email,
          address: row.Address,
          total: row.TotalAmount,
          date: row.OrderDate,
          status: row.Status,
          items: []
        });
      }

      orderMap.get(row.OrderID).items.push({
        id: row.ProductID,
        name: row.ProductName,
        price: row.Price,
        quantity: row.Quantity
      });
    });

    res.json(Array.from(orderMap.values()));
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
});
