'use client';

import AmountButtons from "./AmountButtons";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from '@/context/cart_context';

const MiniCartItem = ({product}) => {
  const { toggleAmount, removeItem } = useCartContext();
  
  return (
    <li key={product.id} className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <Image
        key={product.id}
        src={product.image}
        width={100}
        height={100}
        alt={product.title}
        className="h-full w-full object-cover object-center"
      />
    </div>
    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <Link 
              href={{
                pathname: "products/product/",
                query: {id: product.id},
              }}
            >{product.title}</Link>
          </h3>
          <p className="ml-4">{product.price}</p>
        </div>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">Qty {product.quantity}</p>
        <AmountButtons 
          amount={product.amount} 
          increase={() => toggleAmount(product.id, "inc")} 
          decrease={() => toggleAmount(product.id, "dec")} 
        />
      </div>
    </div>
  </li>    
  )
}

export default MiniCartItem;