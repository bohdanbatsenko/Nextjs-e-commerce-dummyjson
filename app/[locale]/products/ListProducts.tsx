
import Link from "next/link";
import Image from "next/image";
import { useParams } from 'next/navigation'
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const ListProducts = ({ products }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  return (
    <div className="grid grid-cols-1 gap-1.2 p-1 md:mb-1.5">
    {products.map(({ title, thumbnail, id, price, description }) => (
      <article key={id} className='bg-white shadow-md rounded-lg px-2 py-2 md:px-5 md:py-5 flex align-center items-center mb-2.5'>
        <div className='product__img mr-4'>
          <Image src={thumbnail} width={200} height={200} alt={title}/>
        </div>
        <div className='product__info'>
          <h3 className="text-sm md:text-lg uppercase font-bold">{title}</h3>
          <p className='mt-2 text-gray-600'>${price}</p>
          <p className="mt-2 mb-4 text-gray-600 text-md">{description.slice(0, 70)}...</p>
          <Link
            href={{
              pathname: "products/product",
              query: {id: id},
            }}
            className="mt-2 lg:mt-0 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
          {t("shop.viewProduct")}
        </Link>
        </div>
      </article>
      ))}
      </div>
    );
  };
  


export default ListProducts;