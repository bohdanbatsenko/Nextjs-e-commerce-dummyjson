// import React, { useState } from "react";

// interface UpdateCartFormProps {
//   itemId: string;
//   setItemData: any;
//   qty: number;
// }

// const UpdateCartForm: React.FC<UpdateCartFormProps> = ({ itemId, setItemData, qty }) => {
//   const [quantity, setQuantity] = useState<string>(`${qty}` || "1");
//   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuantity(e.target.value);
//     setItemData({ qty: e.target.value, id: itemId });
//   };
//   return (
//     <>
//       <input
//         className="w-16 p-2 text-sm font-normal text-center border"
//         defaultValue={qty}
//         type="text"
//         value={quantity}
//         onChange={(e) => changeHandler(e)}
//         min="1"
//         required
//       />
//     </>
//   );
// };

// export default UpdateCartForm;