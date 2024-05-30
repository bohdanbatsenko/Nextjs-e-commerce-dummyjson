'use client';
import { useContext } from 'react';
import CartContext from '@/context/CartContext';
import { toasterNotifier } from '@/hooks/useToasterNotify';

const Cart = () => {
  const cartCtx = useContext(CartContext)
  const { notifyRemovedFromCart, notifyCartCleared } = toasterNotifier()

  const handleRemoveFromCart = ({id, title}) => {
    cartCtx.removeItem(id)
    notifyRemovedFromCart(title)
  }

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

  return (
    <>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="flex flex-col gap-4">
        {cartCtx.items && cartCtx.items.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <div className="flex gap-4">
              <img src={item.thumbnail} alt={item.title} className="rounded-md h-24" width='150' height='100'/>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  cartCtx.addItem(item)
                }}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  const cartItem = cartCtx.items.find((product) => product.id === item.id);
                  if (cartItem.quantity === 1) {
                    handleRemoveFromCart(item);
                  } else {
                    cartCtx.removeItem(item.id);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        cartCtx.items ? (
          <div className="flex flex-col justify-between items-center">
        <h2 className="text-lg font-bold">Total: ${cartTotal}</h2>
        <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={() => {
            cartCtx.clearCart()
            notifyCartCleared()
          }}
        >
          Clear cart
        </button>
      </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )
      }
    </div>
    </>
  )
}

export default Cart;