// import React, { useState } from "react";

// import { FaChevronDown } from "react-icons/fa6";
// import { useApplyCoupon, useRemoveCoupon } from "@/hooks/useCart";

// export default function ApplyCoupon() {
//   const [viewCoupun, setViewCoupon] = useState(false);
//   const { applyCoupon } = useApplyCoupon();
//   const cartQuote = localStorage.getItem("cartItems");
//   //const cartData = JSON.parse(cartQuote || "") || [];
//   const cartData = cartQuote ? JSON.parse(cartQuote) : [];
//   const [code, setCode] = useState(cartData?.applied_coupons?.[0]?.code || "");
//   const handleSubmit = () => {
//     applyCoupon(code)
//       .then((coupon) => {
//         console.log("Updated cart after applying coupon:", coupon);
//       })
//       .catch((error) => {
//         console.error("Failed to apply coupon:", error);
//       });
//   };
//   const { removeCoupon } = useRemoveCoupon();
//   const handleRemove = () => {
//     removeCoupon()
//       .then((coupon) => {
//         setCode("");
//         console.log("Updated cart after removing coupon:", coupon);
//       })
//       .catch((error) => {
//         console.error("Failed to remove coupon:", error);
//       });
//   };
//   const appliedCoupon = cartData?.applied_coupons?.length > 0 ? true : false;
//   return (
//     <div className="px-4 md:px-0">
//       <p className="flex items-center justify-between gap-4 text-sm md:max-w-fit md:text-base text-sky-500">
//         Apply Discount Code{" "}
//         <FaChevronDown
//           onClick={() => setViewCoupon(!viewCoupun)}
//           className={`w-4 h-4 ${viewCoupun ? "rotate-180" : "-rotate-0"}`}
//         />
//       </p>
//       {viewCoupun && (
//         <div className="flex items-center justify-between my-2 mb-6 border md:mb-0 border-slate-300 md:max-w-fit">
//           <input
//             type="text"
//             className="px-3 max-w-44 focus:outline-0"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           />
//           <button
//             type="button"
//             className="px-3 py-1.5 text-sm bg-neutral-200"
//             onClick={appliedCoupon ? handleRemove : handleSubmit}
//           >
//             {appliedCoupon ? "Cancel Coupon" : "Apply Coupon"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }