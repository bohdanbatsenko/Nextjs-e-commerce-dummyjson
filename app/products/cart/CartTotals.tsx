import { useCartContext } from '@/context/cart_context';
import Link from 'next/link';

const CartTotals = () => {
  const { total_items, total_price, checkout } = useCartContext();
  return (
    <article className='border-2 border-amber-500 p-4 lg:self-start'>
      <div>
        <h3 className='total__items'>
          Total Items : <span>{total_items}</span>
        </h3>
        <br />
        <h4 className='total__price'>
          Total Price : <span>${total_price.toFixed(2)}</span>
        </h4>
      </div>
      <hr className='my-4'/>
      <Link
        href='/checkout'
        type='button'
        className='total__btn'
        onClick={checkout}
      >
        Checkout
      </Link>
    </article>
  );
};

export default CartTotals;