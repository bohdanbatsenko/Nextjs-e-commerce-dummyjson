import React from 'react';
import { CartDetailItemType } from '@/lib/queries/cartItemsFragment';
import { getPriceString } from '@/utils/price';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

interface CartDetailsListItemProps {
  index: number;
  isLast: boolean;
  removing: boolean;
  item: CartDetailItemType;
  onRemoveCartItemPress: (item: CartDetailItemType) => void;
}

const CartDetailsListItem: React.FC<CartDetailsListItemProps> = ({
  index,
  isLast,
  item,
  onRemoveCartItemPress,
  removing,
}) => {
  const key = item?.product?.url_key;

  return (
    <article className='w-full lg:w-4/5 flex items-center gap-1 sm:gap-2 md:gap-3'>

        <div className='hidden md:block border-2 mb-2 md:mb-4'>
          {/* <Image
            src={item.product.image.url}
            alt={item.product.name}
            width={80}
            height={80}
            objectFit="contain"
          /> */}
          <img
            src={item?.product?.image?.url}
            alt={item?.product?.name}
            className="object-cover object-center w-16 h-16"
          />
        </div>

        <div className='flex grow items-start justify-center flex-col py-2 md:size-full'>
          <Link 
            href={{
              pathname: "/products/product/",
              query: {key},
            }}
            title={item?.product?.name}
          >
          <h2 className="text-lg font-light md:text-xl">{item?.product?.name}</h2>
        </Link>
          

          <p>{getPriceString(item.prices.price)}</p>
          <p>{`qty: ${item.quantity}`}</p>
        </div>

        <div className='flex gap-2 md:gap-4 h-full'>
          <button onClick={() => onRemoveCartItemPress(item)}>
              <FaTrash size={24} color="black" />
          </button>
        </div>
      {/* {!isLast && <p className="hr">is last</p>} */}
      
    </article>
  );
};

export default CartDetailsListItem;
