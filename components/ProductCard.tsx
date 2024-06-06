'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
// import CartContext from '@/context/CartContext';
import { useCart } from '@/hooks/useCart';
import Button from '@/components/Button';
import { toasterNotifier } from '@/hooks/useToasterNotify';
import { CartProductType } from '@/types/cartProductType';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: any;
}

const ProductCard:React.FC<ProductCardProps> = ({product}) => {
  const {handleAddProductToCart, cartProducts} = useCart(); 
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType | null>(null);
  const { notifyAddedToCart } = toasterNotifier()

  useEffect(() => {
    if (product) {
      setCartProduct({
        id: product.id,
        title: product.title,
        description: product.description,
        quantity: 1,
        category: product.category,
        price: product.price,
        thumbnail: product.thumbnail,        
      })
    }
  }, [product])

  useEffect(() => {
    setIsProductInCart(false)
    
    if (product && Array.isArray(cartProducts)) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts, product]);


  if (!cartProduct) {
    return <div>Loading...</div>;
  };

  return (
    <div key={product.id} className='bg-white shadow-md rounded-lg px-2 py-2 md:px-5 md:py-5 flex flex-col justify-between'>
      <Image src={product.thumbnail} width={300} height={200} alt={product.title} className='rounded-md h-14 object-cover md:h-48 sm:object-scale-down' />
      <div className='mt-2 md:mt-4'>
        <h1 className='text-sm md:text-lg uppercase font-bold'>
          {product.title}
          </h1>
        <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
        <p className='mt-2 text-gray-600'>${product.price}</p>
      </div>
      <div className='mt-2 min-h-[60px]  content-end'>
        {isProductInCart 
          ? <div className='block w-full'><p className='text-slate-500'>Already in cart</p></div> 
          : ''
          }
      <div className='md:mt-2 flex flex-col lg:flex-row justify-between items-center'>
        {
          isProductInCart ? (
          
              <Link 
                className="mt-2 lg:mt-0 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700" 
                href="/products/cart"
              >
                Go to cart
              </Link>
          
          ) : (
            
              <Button onClick={() => {
                handleAddProductToCart(cartProduct)
                notifyAddedToCart(cartProduct)
                }
              }>Add to cart
            </Button>
          )
        }
        <Link
          href={{
            pathname: "products/product",
            query: {id: product.id},
          }}
          className="mt-2 lg:mt-0 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
        View
        </Link>
      </div>
    </div>
  </div>
  )
};

export default ProductCard;