'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "next/navigation";
import CartContext from '@/context/CartContext';
import { toasterNotifier } from '@/hooks/useToasterNotify';

const Product = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [product, setProduct] = useState(null);
  const cartCtx = useContext(CartContext);
  const { notifyAddedToCart, notifyRemovedFromCart } = toasterNotifier()

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const productData = await res.json();
      setProduct(productData);
    } catch (err) {
      console.error("Failed to fetch product: ", err);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

    const handleRemoveFromCart = (id) => {
    cartCtx.removeItem(id);
    notifyRemovedFromCart(id);
  };


  return <>
  <div className="font-[sans-serif]">
    {/* <ToastContainer limit={1}/> */}
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
              <Image src={product.thumbnail} width={400} height={280} alt="Product" className="w-4/5 rounded object-cover" />
              <hr className="border-white border-2 my-6" />
              <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center mx-auto">
                {product.images.map((image, index) =>(
                    <Image key={index} src={image} width={120} height={100} alt="Product" className="object-cover w-24 cursor-pointer" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">{product.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">${product.price}</p>
                <p className="text-gray-400 text-xl"><strike>${product.price}</strike> <span className="text-sm ml-1">Tax included</span></p>
              </div>
              <div className="flex space-x-2 mt-4">
                <svg className="w-5 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-5 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-5 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-5 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>

              <div className='mt-6 flex justify-between items-center'>
              {
                !cartCtx.items.find(item => item.id === product.id) ? (
                  <Button onClick={() => {
                    cartCtx.addItem(product)
                    notifyAddedToCart(product)
                    }
                  }>Add to cart</Button>
                ) : (
                  <div className="flex gap-4">
                    <Button onClick={() => {
                        cartCtx.addItem(product)
                      }
                  }>+</Button>
                  <p className='text-gray-600'>{cartCtx.items.find(item => item.id === product.id).quantity}</p>
                  <Button
                    onClick={() => {
                      const cartItem = cartCtx.items.find((item) => item.id === product.id);
                      if (cartItem.quantity === 1) {
                        handleRemoveFromCart(product.id);
                      } else {
                        cartCtx.removeItem(product.id);
                      }
                    }}>-</Button>
                </div>
                )
              }
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">About {product.description}</h3>
            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
              <li>{product.description}</li>
            </ul>
          </div>
          <div className="mt-8 max-w-md">
            <h3 className="text-lg font-bold text-gray-800">Reviews(10)</h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">5.0</p>
                <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div className="w-2/3 h-full rounded bg-gray-800"></div>
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">4.0</p>
                <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div className="w-1/3 h-full rounded bg-gray-800"></div>
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">3.0</p>
                <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div className="w-1/6 h-full rounded bg-gray-800"></div>
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">2.0</p>
                <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div className="w-1/12 h-full rounded bg-gray-800"></div>
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">1.0</p>
                <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div className="w-[6%] h-full rounded bg-gray-800"></div>
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
              </div>
            </div>
            <div className="flex items-start mt-8">
              <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
              <div className="ml-3">
                <h4 className="text-sm font-bold">John Doe</h4>
                <div className="flex space-x-1 mt-1">
                  <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <p className="text-xs !ml-2 font-semibold">2 mins ago</p>
                </div>
                <p className="text-xs mt-4">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
              </div>
            </div>
            <button type="button" className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded">Read all reviews</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Product;