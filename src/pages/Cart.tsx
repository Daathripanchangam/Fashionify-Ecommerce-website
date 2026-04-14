import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { Order } from '@/types';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const order: Order = {
      customerName: formData.customerName,
      email: formData.email,
      address: formData.address,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString()
    };
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Failed to place order');
    }
    const data = await response.json(); 
    clearCart();
    toast.success(`Order placed successfully!`);
    setFormData({
      customerName: '',
      email: '',
      address: ''
    });
    setIsCheckout(false);
  } catch (error) {
    toast.error("Error placing order", {
      description: "Please try again",
    });
    console.error("Error placing order:", error);
  }
};
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  if (isCheckout) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-bold mb-2">Order Summary</h2>
          <div className="flex justify-between font-medium">
            <span>Total ({cart.reduce((a, c) => a + c.quantity, 0)} items):</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        <form onSubmit={handlePlaceOrder}>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium mb-1">Full Name</label>
              <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange}
                required placeholder="Enter your full name"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} 
              required placeholder="Enter your email"/>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Shipping Address
              </label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange}
                required placeholder="Enter your shipping address" rows={3}/>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button type="button" variant="outline" onClick={() => setIsCheckout(false)}>Back to Cart</Button>
            <Button type="submit">Place Order</Button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cart.map(item => (
              <div key={item.product.id} className="border-b last:border-b-0 p-4 flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded"/>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-blue-600 font-bold">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    -</Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    +</Button>
                </div>
                <div className="text-right font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  ✕</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between mb-2 text-sm">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-6" onClick={() => setIsCheckout(true)}>Proceed to Checkout</Button>

          <Button variant="outline" className="w-full mt-2" onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
