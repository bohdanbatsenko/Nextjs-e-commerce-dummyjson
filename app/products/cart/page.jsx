'use client';
import { useContext } from 'react'
import { CartContext } from '../../../context/cart'
import { CartProvider } from '../../../context/cart';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

  const notifyRemovedFromCart = (item) => toast.error(`${item.title} removed from cart!`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff'
    }
  })

  const notifyCartCleared = () => toast.error(`Cart cleared!`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff'
    }
  })

  const handleRemoveFromCart = (product) => {
    removeFromCart(product)
    notifyRemovedFromCart(product)
  }


  return (
    <>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <div className="flex gap-4">
              <img src={item.thumbnail} alt={item.title} className="rounded-md h-24" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  addToCart(item)
                }}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  const cartItem = cartItems.find((product) => product.id === item.id);
                  if (cartItem.quantity === 1) {
                    handleRemoveFromCart(item);
                  } else {
                    removeFromCart(item);
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
        cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
        <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
        <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={() => {
            clearCart()
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

export default function WrappedCartPage() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
}