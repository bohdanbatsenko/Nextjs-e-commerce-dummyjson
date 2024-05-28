'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from "react";
import CartContext from '@/context/CartContext';
import Button from '@/components/Button';
import { toasterNotifier } from '@/hooks/useToasterNotify';

const ProductCart = ({product}) => {
  const cartCtx = useContext(CartContext)
  const { notifyAddedToCart, notifyRemovedFromCart } = toasterNotifier()
  const handleAddToCart = (product) => {
    cartCtx.addItem(product)
  }

  const handleRemoveFromCart = ({id, title}) => {
    cartCtx.removeItem(id);
    notifyRemovedFromCart(title);
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
      <div className='mt-2 md:mt-6 flex flex-col lg:flex-row justify-between items-center'>
        {
          !cartCtx.items.find(item => item.id === product.id) ? (
            <Button onClick={() => {
              handleAddToCart(product)
              notifyAddedToCart(product)
              }
            }>Add to cart</Button>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => {
                  handleAddToCart(product)
                }
            }>+</Button>
            <p className='text-gray-600'>{cartCtx.items.find(item => item.id === product.id).quantity}</p>
            <Button
              onClick={() => {
                const cartItem = cartCtx.items.find((item) => item.id === product.id);
                  if (cartItem.quantity === 1) {
                    handleRemoveFromCart(product);
                  } else {
                    cartCtx.removeItem(product.id);
                  }
              }}>-</Button>
          </div>
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
  )
};

export default ProductCart;