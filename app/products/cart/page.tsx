'use client';
//import CartContext from '@/context/CartContext';
import { useCartContext } from '@/context/cart_context';
import Button from '@/components/Button';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import EmptyCart from './EmptyCart';


const Cart = () => {
  const { cart, clearCart } = useCartContext();

  if (cart?.length < 1) {
    return <EmptyCart />;
  }

  return (
    <main className='px-5 lg:px-20 py-5'>
    <Breadcrumb title='Cart' />
    <div className='grid md:grid-cols-3 mt-4 md:mt-8 lg:px-10 md:gap-6'>
      <div className='cart-content grid gap-1 md:gap-2 md:col-span-2'>
        <div className='cart__items p-2'>
          {!cart 
            ? 'No items in cart'
            : cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div className='cart__links flex items-center justify-between p-2'>
          <Button>
            <Link href='/products'>Buy more</Link>
          </Button>
          <Button
            onClick={clearCart}
          >
            Clear cart
          </Button>
        </div>
      </div>
      <CartTotals />
    </div>
  </main>
  )
}

export default Cart;