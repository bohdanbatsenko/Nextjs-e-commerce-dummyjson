'use client';

import Button from "@/components/Button";
import Image from "next/image";
import { CartProductType } from "@/types/cartProductType";
import { truncate } from "fs";
import Link from "next/link";
import SetQuantity from "@/components/SetQuantity";
import { useCart } from '@/hooks/useCart';

type ItemContentProps = {
  item: CartProductType
}

const ItemContent:React.FC<ItemContentProps> = ({item}) => {
  const { 
    handleRemoveProductFromCart, 
    handleCartQtyIncrease, 
    handleCartQtyDecrease } = useCart();
  
  return <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center">
    <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
      <Link 
        href={{
          pathname: "/products/product",
          query: {id: item.id},
        }}>
        <div className="relative w-[70px] aspect-square">
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover"/>
        </div>
      </Link>
      <div className="flex flex-col justify-between">
      <Link 
          href={{
            pathname: "/products/product",
            query: {id: item.id},
          }}
        >{item.title}</Link>
        <div className=""></div>
        <div className="max-w-[70px]">
          <Button onClick={()=>handleRemoveProductFromCart(item)}>Remove</Button>
        </div>
      </div>
    </div>
    <div className="justify-self-center">{item.price}</div>
    <div className="justify-self-center">
      <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {handleCartQtyIncrease(item)}}
          handleQtyDecrease={() => {handleCartQtyDecrease(item)}}
        />
    </div>
    <div className="justify-self-end font-semibold">{item.price * item.quantity}</div>
  </div>
}

export default ItemContent;