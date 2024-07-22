'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AddToCart from '@/components/AddToCart';
import Stars from '@/components/Stars';
import { useEffect, useState, useContext } from 'react';
import { useProductsContext } from "@/context/products_context";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import { useSearchParams  } from 'next/navigation';

function Product() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const [selectedImage, setSelectedImage] = useState("");

  const {
    single_product: product,
    single_product_loading: loading,
    single_product_error: error,
    fetchSingleProduct,
  } = useProductsContext();

  // const router = useRouter();
  // const pathname = usePathname()
  const searchParams = useSearchParams()
  //const params = useParams();
  const id = searchParams.get('id');
  if (!product) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    //console.log(`Fetching product with id: ${id} and locale: ${locale}`);
    fetchSingleProduct(id);
  }, [id, locale]);

  useEffect(() => {
    if (product && product.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
}, [product]);

  // const { 
  //   title,
  //   description,
  //   category,
  //   quantity,
  //   price,
  //   discountPercentage,
  //   rating,
  //   stock,
  //   tags,
  //   image,
  //   brand,
  //   sku,
  //   weight,
  //   dimensions,
  //   warrantyInformation,
  //   shippingInformation,
  //   availabilityStatus,
  //   reviews,
  //   returnPolicy,
  //   minimumOrderQuantity,
  //   meta,
  //   thumbnail,
  //   images } = product;
    
  return (
    <main>
      <div className='px-10 lg:px-20 py-5'>
      <Breadcrumb products title={product.title} />
        <article>
          <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 flex flex-col justify-center items-center bg-gray-100 lg:sticky top-0 text-center center p-4">
              {selectedImage && 
              <Image
                src={selectedImage} 
                width={300}
                height={280}
                alt="Product" 
                className="" 
              />}
              <hr className="border-white border-2 my-6" />
              <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center mx-auto">
                {product.images && product.images.map((image, index) => (
                  // <Image key={index} src={image} width={120} height={100} alt="Product" className="object-cover w-24 cursor-pointer" />
                  <Image
                    key={index} 
                    src={image} 
                    width={120} 
                    height={100} 
                    alt="Product" 
                    className="object-cover w-8 md:w-24 cursor-pointer" 
                    onClick={() => setSelectedImage(image)}
                  />
                )
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-gray-800">{product.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">${product.price}</p>
                <p className="text-gray-400 text-xl">
                <span style={{ textDecoration: 'line-through' }}>${product.price}</span>
                  <span className="text-sm ml-1">{t("shop.productDetails.taxIncluded")}</span>
                </p>
                <p className="text-black text-xl">{product.discountPercentage}%
                  <span className="text-sm ml-1">{t("shop.productDetails.discount")}</span>
                  </p>
              </div>
              <div className="flex gap-4 space-x-2 mt-4">
                <div className="">
                  <span className="text-sm">SKU:</span>
                  <h3 className="text-sm font-bold text-gray-800 capitalize">{product.sku}</h3>
                </div>
                <div className="">
                  <span className="text-sm">{t("shop.productDetails.category")}:</span>
                  <h3 className="text-sm font-bold text-gray-800 capitalize">{product.category}</h3>
                </div>
                <div className="">
                  <span className="text-sm">{t("shop.productDetails.stock")}:</span>
                  <h3 className="text-sm font-bold text-gray-800 capitalize">{product.stock}</h3>
                </div>
                <div className="">
                  <span className="text-sm">{t("shop.productDetails.brand")}:</span>
                  <h3 className="text-sm font-bold text-gray-800 capitalize">{product.brand}</h3>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
              <Stars stars={product.rating} />
              </div>

              <div className='mt-6 flex justify-between items-center'>
              <AddToCart product={product} />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">{t("shop.productDetails.about")} {product.title}</h3>
            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
              <li>{product.description}</li>
            </ul>
          </div>

          <div className="flex gap-4 space-x-2 mt-4">
            <div>
              <span className="text-sm">{t("shop.productDetails.warrantyInfo")}:</span>
              <h3 className="text-sm font-bold text-gray-800 capitalize">{product.warrantyInformation}</h3>
            </div>
            <div>
              <span className="text-sm">{t("shop.productDetails.shippingInfo")}:</span>
              <h3 className="text-sm font-bold text-gray-800 capitalize">{product.shippingInformation}</h3>
            </div>
            <div>
              <span className="text-sm">{t("shop.productDetails.availability")}:</span>
              <h3 className="text-sm font-bold text-gray-800 capitalize">{product.availabilityStatus}</h3>
            </div>
          </div>

          <div className="flex gap-4 space-x-2 mt-4">
            <div>
              <span className="text-sm">{t("shop.productDetails.return")}:</span>
              <h3 className="text-sm font-bold text-gray-800 capitalize">{product.returnPolicy}</h3>
            </div>
            <div>
              <span className="text-sm">{t("shop.productDetails.minimumQty")}:</span>
              <h3 className="text-sm font-bold text-gray-800 capitalize">{product.minimumOrderQuantity}</h3>
            </div>
          </div>

          <div className="mt-8 max-w-md">
            <h3 className="text-lg font-bold text-gray-800">{t("shop.productDetails.reviews")}(10)</h3>
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

            {product.reviews && product.reviews.map((review, index) => (
              <div key={index} className="flex items-start mt-8">
                <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                  <div className="ml-3">
                  <h4 className="text-sm font-bold">{review.reviewerName}</h4>
                  
                  <div className="flex space-x-1 mt-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  ))}
                  <p className="text-xs !ml-2 font-semibold">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <p className="text-xs mt-4">{review.comment}</p>
                </div>
              </div>
            ))}
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
            <button 
            type="button" 
            className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded">
              {t("shop.productDetails.readAllReviews")}
              </button>
          </div>
          </div>
        </div>
        </div>
      </article>
      </div>
    </main>
  );
}

export default Product;