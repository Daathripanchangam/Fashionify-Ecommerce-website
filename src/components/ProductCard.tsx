
import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-transform hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-0">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="mt-auto">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
