'use client';

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CART, UPDATE_CART_MUTATION, DELETE_CART_MUTATION } from '@/lib/queries/cart/cartQueries';
import UpdateCartForm from './cartNew/CartUpdate';
import ApplyCoupon from './cartNew/ApplyCoupon';

export default function Cart() {
  const cartId = localStorage.getItem("cartId");

  const { data, loading, error } = useQuery(GET_CART, {
    variables: { cartId },
    skip: !cartId,
  });

  const [updateCartItem] = useMutation(UPDATE_CART_MUTATION);
  const [deleteCartItem] = useMutation(DELETE_CART_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUpdate = async (itemId: string, quantity: number) => {
    try {
      await updateCartItem({
        variables: {
          cartId,
          cartItems: [{ cart_item_uid: itemId, quantity }],
        },
      });
      console.log("Cart item updated");
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await deleteCartItem({
        variables: {
          cartId,
          itemId,
        },
      });
      console.log("Cart item deleted");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="px-4 mt-4 mb-10 text-5xl md:px-0 font-extralight">Shopping Cart</h1>
      <div className="grid gap-16 md:grid-cols-12">
        <div className="order-2 -mt-10 md:mt-0 md:col-span-8 md:order-1">
          <form className="divide-y">
            {data.cart.items.map((item: any) => (
              <div key={item.cartItemId} className="px-4 py-6 md:px-2">
                <div className="md:columns-2">
                  <div className="flex gap-4">
                    <img
                      src={item.product.thumbnail.url}
                      alt=""
                      className="object-cover object-center w-16 h-16 md:w-40 md:h-48"
                    />
                    <h2 className="text-lg font-light md:text-xl">{item.product.name}</h2>
                  </div>
                  <div className="flex items-center justify-between w-full gap-4 text-lg font-medium max-w-72 md:max-w-full md:text-xl">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium md:hidden">Price</p>
                      <p>{item.prices.price.value}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium md:hidden">Qty</p>
                      <UpdateCartForm
                        itemId={item.cartItemId}
                        qty={item.quantity}
                        setItemData={(data) => handleUpdate(data.id, data.qty)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium md:hidden">Subtotal</p>
                      <p>{item.prices.row_total.value}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-auto max-w-fit">
                  <button type="button" className="bg-transparent" onClick={() => handleDelete(item.cartItemId)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </form>
          <ApplyCoupon />
        </div>
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import UpdateCartForm from './cartNew/CartUpdate';
// import useCheckoutQuoteFetch, { useDeleteCartItem, useUpdateCartItem } from '@/hooks/useCartNew';

// import ApplyCoupon from './cartNew/ApplyCoupon';
// export const formatPrice = (value: number, currency: string) => {
//   return value?.toLocaleString("en-US", {
//     style: "currency",
//     currency,
//   });
// };

// export default function Cart() {
//   useCheckoutQuoteFetch();

//   const [items, setItems] = useState(() => {
//     const cartQuote = localStorage.getItem("cartItems");
//     return JSON.parse(cartQuote || "{}").items || [];
//   });
//   const [cartData, setCartData] = useState(() => {
//     const cartQuote = localStorage.getItem("cartItems");
//     return JSON.parse(cartQuote || "{}");
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const cartQuote = localStorage.getItem("cartItems");
//       const cartData = JSON.parse(cartQuote || "{}") || [];
//       setItems(cartData.items || []);
//       setCartData(cartData);
//     };

//     handleStorageChange();

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const [itemData, setItemData] = useState({ qty: "", id: "" });
//   const { updateCartItem } = useUpdateCartItem();
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     updateCartItem(itemData.id, itemData.qty)
//       .then((updatedCart) => {
//         console.log("Updated cart:", updatedCart);
//       })
//       .catch((error) => {
//         console.error("Failed to update cart item:", error);
//       });
//   };
//   const { deleteCartItem } = useDeleteCartItem();

//   const handleDelete = (itemId: string) => {
//     deleteCartItem(itemId)
//       .then((deleteCartItem) => {
//         console.log("Updated cart after deletion:", deleteCartItem);
//       })
//       .catch((error) => {
//         console.error("Failed to delete cart item:", error);
//       });
//   };
//   const prices = cartData?.prices;
//   const selectedMethod = cartData?.shipping_addresses?.[0]?.selected_shipping_method;

//   return (
// <div className="container mx-auto">
//       <h1 className="px-4 mt-4 mb-10 text-5xl md:px-0 font-extralight">Shopping Cart</h1>
//       <div className="grid gap-16 md:grid-cols-12">
//         <div className="order-2 -mt-10 md:mt-0 md:col-span-8 md:order-1">
//           <form onSubmit={handleSubmit} className="divide-y">
//             <div className="hidden p-3 mt-6 text-sm font-medium md:flex columns-2">
//               <p className="w-full">Item</p>
//               <div className="flex items-center justify-between w-full">
//                 <p className="ml-9 md:ml-0">Price</p>
//                 <p className="ml-9 md:ml-0">Qty</p>
//                 <p className="ml-9 md:ml-0">Subtotal</p>
//               </div>
//             </div>
//             {items.map((item: any) => (
//               <div key={item?.cartItemId} className="px-4 py-6 md:px-2">
//                 <div className="md:columns-2">
//                   <div className="flex gap-4">
//                     <img
//                       src={item?.product?.thumbnail?.url}
//                       alt=""
//                       className="object-cover object-center w-16 h-16 md:w-40 md:h-48"
//                     />
//                     <h2 className="text-lg font-light md:text-xl">{item?.product?.name}</h2>
//                   </div>
//                   <div className="flex items-center justify-between w-full gap-4 text-lg font-medium max-w-72 md:max-w-full md:text-xl">
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Price</p>
//                       <p>{formatPrice(item?.prices?.price?.value, item?.prices?.price?.currency)}</p>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Qty</p>
//                       <UpdateCartForm itemId={item?.cartItemId} qty={item?.quantity} setItemData={setItemData} />
//                     </div>{" "}
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Subtotal</p>
//                       <p>{formatPrice(item?.prices?.row_total?.value, item?.prices?.row_total?.currency)}</p>
//                     </div>
//                   </div>
//                 </div>{" "}
//                 <div className="flex items-center gap-4 ml-auto max-w-fit">
//                   <svg
//                     className="w-5 h-5 text-black"
//                     fill="none"
//                     strokeWidth={2}
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
//                     />
//                   </svg>
//                   <button type="button" className="bg-transparent" onClick={() => handleDelete(item?.cartItemId)}>
//                     <svg
//                       className="w-5 h-5 text-black"
//                       fill="none"
//                       strokeWidth={3}
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-center py-6 md:justify-end md:my-6 border-y border-y-slate-300 md:border-y-0">
//               <button type="submit" className="px-4 py-2 text-sm border border-solid border-neutral-300 bg-neutral-200">
//                 Update Shopping Cart
//               </button>
//             </div>
//           </form>
//           <div className="py-3 mb-10 md:py-0 border-y border-y-slate-300 md:border-y-0">
//             <ApplyCoupon />
//           </div>
//         </div>
//         <div className="order-1 w-full p-6 md:col-span-4 md:order-2 bg-neutral-100 max-h-fit">
//           <div className="flex flex-col divide-y divide-slate-300">
//             <p className="pb-4 text-2xl font-extralight">Summary</p>
//             <div className="flex flex-col gap-4 py-4 text-sm font-light">
//               <div className="flex items-center justify-between">
//                 <p>Subtotal</p>
//                 <p>{formatPrice(prices?.subtotal_excluding_tax?.value, prices?.subtotal_excluding_tax?.currency)}</p>
//               </div>
//               {prices?.discounts.length > 0 && (
//                 <div className="flex items-center justify-between">
//                   <p>Discount({cartData?.applied_coupons?.[0]?.code || "Free"})</p>
//                   {prices?.discounts?.map((item: { amount: { value: number; currency: string } }, index: number) => (
//                     <p key={index}>{formatPrice(item?.amount?.value, item?.amount?.currency)}</p>
//                   ))}
//                 </div>
//               )}
//               {selectedMethod && (
//                 <div className="flex items-center justify-between">
//                   <p>Shipping({selectedMethod?.carrier_title})</p>
//                   <p>{formatPrice(selectedMethod?.amount?.value, selectedMethod?.amount?.currency)}</p>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center justify-between py-4 font-medium">
//               <p>Order Total</p>
//               <p>{formatPrice(prices?.grand_total?.value, prices?.grand_total?.currency)}</p>
//             </div>
//             <div className="flex flex-col items-center w-full">
//               <button className="w-full px-8 py-4 my-6 font-medium text-white bg-sky-600 hover:bg-sky-700">
//                 Process To Checkout
//               </button>
//               <p className="text-sm font-normal text-sky-500">Check Out with Multiple Addresses</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// import Button from '@/components/Button';
// import Link from 'next/link';
// import Breadcrumb from '@/components/Breadcrumb';
// // import CartItem from './CartItem';
// // import CartTotals from './CartTotals';
// import EmptyCart from './EmptyCart';
// // New magento gql
// // Internationalization
// import { useTranslation } from "@/app/i18n/client";
// import type { LocaleTypes } from "@/app/i18n/settings";

// import CartDetailsListItem from './CartDetailsListItem';
// import { useCartDetails } from '@/hooks/useCartDetails';
// import { CartDetailItemType } from '@/lib/queries/cartItemsFragment';
// import { getPriceString } from '@/utils/price';


// const Cart = () => {
//   const locale = useParams()?.locale as LocaleTypes;
//   const { t } = useTranslation(locale, "common");
//   //const { cart, clearCart } = useCartContext();
//   const [removeItemUid, setRemoveItemUid] = useState('');
//   const {
//     getCartDetails,
//     loading,
//     cartItems,
//     totals,
//     removeFromCart,
//     removeItemLoading,
//   } = useCartDetails();

//   useEffect(() => {
//     getCartDetails();
//   }, [])
//   // const cartItems = useSelector(getCartItems);
//   console.log('cartItems', cartItems)

//   const onRemoveCartItemPress = (item) => {
//     setRemoveItemUid(item.uid);
//     removeFromCart(item.uid);
//   };

//   const renderCartItem = (item, index) => {
//     const isLast = cartItems.length - 1 === index;
//     return (
//       <CartDetailsListItem
//         key={item.product.sku}
//         removing={removeItemLoading && removeItemUid === item.uid}
//         index={index}
//         isLast={isLast}
//         onRemoveCartItemPress={() => onRemoveCartItemPress(item)}
//         item={item}
//       />
//     );
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="px-4 mt-4 mb-10 text-5xl md:px-0 font-extralight">Shopping Cart</h1>
//       {cartItems.length <= 0 && <EmptyCart/> }

//     <div className="flex flex-col flex-1">
//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           cartItems.map((item, index) => renderCartItem(item, index))
//         )}
//       </div>
//       <div className="bg-lightgray p-2.5">
//         {totals && (
//           <p className="my-2.5">{`Totals: ${getPriceString(totals?.grand_total)}`}</p>
//         )}
//         <button
//           disabled={loading}
//           className={`bg-black text-white w-80 h-12 flex items-center justify-center cursor-pointer ${
//             loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
//           }`}
//           onClick={() => {
//             console.log('router.push(routes.NAVIGATION_CHECKOUT_ROUTE)');
//           }}
//         >
//           Checkout
//         </button>
//       </div>
//     </div>
    

//     </div>
//   );
//   }

// export default Cart;
  









// import React, { useEffect, useState } from "react";
// import UpdateCartForm from "./cartUpdate";
// import useCheckoutQuoteFetch, { useDeleteCartItem, useUpdateCartItem } from "@/hooks/useCart";
// import ApplyCoupon from "./ApplyCoupon";

// export const formatPrice = (value: number, currency: string) => {
//   return value?.toLocaleString("en-US", {
//     style: "currency",
//     currency,
//   });
// };

// export default function Cart() {
//   useCheckoutQuoteFetch();
//   const [items, setItems] = useState(() => {
//     const cartQuote = localStorage.getItem("cartItems");
//     return JSON.parse(cartQuote || "{}").items || [];
//   });
//   const [cartData, setCartData] = useState(() => {
//     const cartQuote = localStorage.getItem("cartItems");
//     return JSON.parse(cartQuote || "{}");
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const cartQuote = localStorage.getItem("cartItems");
//       const cartData = JSON.parse(cartQuote || "{}") || [];
//       setItems(cartData.items || []);
//       setCartData(cartData);
//     };

//     handleStorageChange();

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   });
//   const [itemData, setItemData] = useState({ qty: "", id: "" });
//   const { updateCartItem } = useUpdateCartItem();
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     updateCartItem(itemData.id, itemData.qty)
//       .then((updatedCart) => {
//         console.log("Updated cart:", updatedCart);
//       })
//       .catch((error) => {
//         console.error("Failed to update cart item:", error);
//       });
//   };
//   const { deleteCartItem } = useDeleteCartItem();

//   const handleDelete = (itemId: string) => {
//     deleteCartItem(itemId)
//       .then((deleteCartItem) => {
//         console.log("Updated cart after deletion:", deleteCartItem);
//       })
//       .catch((error) => {
//         console.error("Failed to delete cart item:", error);
//       });
//   };
//   const prices = cartData?.prices;
//   const selectedMethod = cartData?.shipping_addresses?.[0]?.selected_shipping_method;
//   return (
// <div className="container mx-auto">
//       <h1 className="px-4 mt-4 mb-10 text-5xl md:px-0 font-extralight">Shopping Cart</h1>
//       <div className="grid gap-16 md:grid-cols-12">
//         <div className="order-2 -mt-10 md:mt-0 md:col-span-8 md:order-1">
//           <form onSubmit={handleSubmit} className="divide-y">
//             <div className="hidden p-3 mt-6 text-sm font-medium md:flex columns-2">
//               <p className="w-full">Item</p>
//               <div className="flex items-center justify-between w-full">
//                 <p className="ml-9 md:ml-0">Price</p>
//                 <p className="ml-9 md:ml-0">Qty</p>
//                 <p className="ml-9 md:ml-0">Subtotal</p>
//               </div>
//             </div>
//             {items.map((item: any) => (
//               <div key={item?.cartItemId} className="px-4 py-6 md:px-2">
//                 <div className="md:columns-2">
//                   <div className="flex gap-4">
//                     <img
//                       src={item?.product?.thumbnail?.url}
//                       alt=""
//                       className="object-cover object-center w-16 h-16 md:w-40 md:h-48"
//                     />
//                     <h2 className="text-lg font-light md:text-xl">{item?.product?.name}</h2>
//                   </div>
//                   <div className="flex items-center justify-between w-full gap-4 text-lg font-medium max-w-72 md:max-w-full md:text-xl">
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Price</p>
//                       <p>{formatPrice(item?.prices?.price?.value, item?.prices?.price?.currency)}</p>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Qty</p>
//                       <UpdateCartForm itemId={item?.cartItemId} qty={item?.quantity} setItemData={setItemData} />
//                     </div>{" "}
//                     <div className="flex flex-col gap-2">
//                       <p className="text-sm font-medium md:hidden">Subtotal</p>
//                       <p>{formatPrice(item?.prices?.row_total?.value, item?.prices?.row_total?.currency)}</p>
//                     </div>
//                   </div>
//                 </div>{" "}
//                 <div className="flex items-center gap-4 ml-auto max-w-fit">
//                   <svg
//                     className="w-5 h-5 text-black"
//                     fill="none"
//                     strokeWidth={2}
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
//                     />
//                   </svg>
//                   <button type="button" className="bg-transparent" onClick={() => handleDelete(item?.cartItemId)}>
//                     <svg
//                       className="w-5 h-5 text-black"
//                       fill="none"
//                       strokeWidth={3}
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-center py-6 md:justify-end md:my-6 border-y border-y-slate-300 md:border-y-0">
//               <button type="submit" className="px-4 py-2 text-sm border border-solid border-neutral-300 bg-neutral-200">
//                 Update Shopping Cart
//               </button>
//             </div>
//           </form>
//           <div className="py-3 mb-10 md:py-0 border-y border-y-slate-300 md:border-y-0">
//             <ApplyCoupon />
//           </div>
//         </div>
//         <div className="order-1 w-full p-6 md:col-span-4 md:order-2 bg-neutral-100 max-h-fit">
//           <div className="flex flex-col divide-y divide-slate-300">
//             <p className="pb-4 text-2xl font-extralight">Summary</p>
//             <div className="flex flex-col gap-4 py-4 text-sm font-light">
//               <div className="flex items-center justify-between">
//                 <p>Subtotal</p>
//                 <p>{formatPrice(prices?.subtotal_excluding_tax?.value, prices?.subtotal_excluding_tax?.currency)}</p>
//               </div>
//               {prices?.discounts.length > 0 && (
//                 <div className="flex items-center justify-between">
//                   <p>Discount({cartData?.applied_coupons?.[0]?.code || "Free"})</p>
//                   {prices?.discounts?.map((item: { amount: { value: number; currency: string } }, index: number) => (
//                     <p key={index}>{formatPrice(item?.amount?.value, item?.amount?.currency)}</p>
//                   ))}
//                 </div>
//               )}
//               {selectedMethod && (
//                 <div className="flex items-center justify-between">
//                   <p>Shipping({selectedMethod?.carrier_title})</p>
//                   <p>{formatPrice(selectedMethod?.amount?.value, selectedMethod?.amount?.currency)}</p>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center justify-between py-4 font-medium">
//               <p>Order Total</p>
//               <p>{formatPrice(prices?.grand_total?.value, prices?.grand_total?.currency)}</p>
//             </div>
//             <div className="flex flex-col items-center w-full">
//               <button className="w-full px-8 py-4 my-6 font-medium text-white bg-sky-600 hover:bg-sky-700">
//                 Process To Checkout
//               </button>
//               <p className="text-sm font-normal text-sky-500">Check Out with Multiple Addresses</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



  // return (
  //   <main className='px-5 lg:px-20 py-5'>
  //   <Breadcrumb title={t("shop.cart.cart")} />
  //   <div className='grid md:grid-cols-3 mt-4 md:mt-8 lg:px-10 md:gap-6'>
  //     <div className='cart-content grid gap-1 md:gap-2 md:col-span-2'>
  //       <div className='cart__items p-2'>
  //       {!cart || cart.length < 1 
  //       ? (<div>No items in cart</div>)
  //       : cart.map((item, index) => (
  //           <CartItem key={index} {...item} />
  //         ))}
  //       <ul>
  //         {cartItems.map(item => (
  //           <li key={item.sku}>{item.name} - {item.quantity}</li>
  //         ))}
  //       </ul>
  //       </div>
  //       <div className='cart__links flex items-center justify-between p-2'>
  //         <Button>
  //           <Link href='/products'>{t("shop.cart.buyMore")}</Link>
  //         </Button>
  //         <Button
  //           onClick={clearCart}
  //         >
  //           {t("shop.cart.clearCart")}
  //         </Button>
  //       </div>
  //     </div>
  //     <CartTotals />
  //   </div>
  // </main>
  // )
// }

// export default Cart;