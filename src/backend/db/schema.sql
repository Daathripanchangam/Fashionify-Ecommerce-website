
-- Database: ShopEasy

-- Create the database
CREATE DATABASE Fashionify;
GO

USE ShopEasy;
GO

-- Products Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Description NVARCHAR(500),
    Image NVARCHAR(255),
    Category NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Insert Sample Products
INSERT INTO Products (Name, Price, Description, Image, Category) VALUES 
('Classic White T-Shirt', 19.99, 'A comfortable classic white t-shirt made with 100% cotton.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60', 'Clothing'),
('Denim Jeans', 49.99, 'Classic blue denim jeans with a comfortable fit.', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60', 'Clothing'),
('Running Shoes', 79.99, 'Lightweight running shoes with extra cushioning.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60', 'Footwear'),
('Wireless Headphones', 129.99, 'Noise-cancelling wireless headphones with 20-hour battery life.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', 'Electronics'),
('Backpack', 59.99, 'Durable backpack with multiple compartments.', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&auto=format&fit=crop&q=60', 'Accessories'),
('Smartwatch', 199.99, 'A feature-packed smartwatch with health monitoring.', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60', 'Electronics'),
('Water Bottle', 24.99, 'Insulated water bottle that keeps drinks cold for 24 hours.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60', 'Accessories'),
('Sunglasses', 89.99, 'Polarized sunglasses with UV protection.', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60', 'Accessories');
GO

-- Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) DEFAULT 'Pending'
);
GO

-- OrderItems Table
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO
