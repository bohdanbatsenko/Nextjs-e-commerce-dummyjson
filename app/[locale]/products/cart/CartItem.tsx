'use client';

import { useCartContext } from '@/context/cart_context';
import Link from 'next/link';
import Image from 'next/image';
import AmountButtons from '@/components/AmountButtons';
import Button from '@/components/Button';
import { FaTrash } from "react-icons/fa";

const CartItem = ({ title, price, amount, id, image }) => {
  const { toggleAmount, removeItem } = useCartContext();

  const croppedTitle = title ? title.substring(0, 25) + '...' : title;

  const increase = () => {
    toggleAmount(id, 'inc');
  };
  
  const decrease = () => {
    toggleAmount(id, 'dec');
  };
  
  return <article className='w-full lg:w-4/5 flex items-center gap-1 sm:gap-2 md:gap-3'>
      <div className='item__img hidden md:block border-2 mb-2 md:mb-4'>
        {/* <Image src={thumbnail} width={100} height={100} alt="Product" className="object-cover w-10 cursor-pointer" /> */}
        <Image src={image} width={200} height={200} alt="Product" className="object-cover w-100 cursor-pointer" />
      </div>
      <div className='item__info flex grow items-start justify-center flex-col py-2 md:size-full'>
        <Link 
        href={{
          pathname: "/products/product/",
          query: {id},
        }}
        title={title}
        >
          {croppedTitle}
        </Link>
        <p>
          ${price} &#9747; {amount} :
          <br />
          <span>${(price * amount).toFixed(2)}</span>
        </p>
      </div>
      <div className='flex gap-2 md:gap-4 h-full'>
        <AmountButtons amount={amount} increase={increase} decrease={decrease} />
        <Button
          onClick={() => removeItem(id)}
        >
          <FaTrash />
        </Button>
      </div>
  </article>
}

export default CartItem;