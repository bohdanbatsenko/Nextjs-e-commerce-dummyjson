'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Product, MediaGalleryItem } from '@/types/product';
import Breadcrumb from '@/components/Breadcrumb';
import AddToCart from '@/components/AddToCart';
import Stars from '@/components/Stars';
import { useEffect, useState, Suspense, lazy, useContext, FC } from 'react';
//import { useProductsContext } from "@/context/products_context";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import { useSearchParams  } from 'next/navigation';
import { from, useQuery } from '@apollo/client';
import { 
  GET_PRODUCT_DETAILS, 
  ProductDetailsType,
  ProductDetailsResponseType,
  ConfigurableProductVariant
 } from '@/lib/queries/getProductDetails';
import { ConfigurableProductOptions } from '@/components/products/options/ConfigurableProductOptions';
import { SelectedConfigurableProductOptions, HandleSelectConfigurableOption } from '@/types/product';
import type { PriceRange } from '@/lib/queries/getCategoryProducts';
import type { MediaGalleryItemType } from '@/lib/queries/mediaGalleryFragment';

function Loading() {
  return <p>Loading a product...</p>;
}

const ProductPage: FC = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  const [productData, setProductData] = useState<ProductDetailsType | null | undefined>(null);
  const [selectedConfigurableProductOptions, setSelectedConfigurableProductOptions] = useState<SelectedConfigurableProductOptions>({})
  const [selectedVariant, setSelectedVariant] = useState<ConfigurableProductVariant>(null)
  const [price, setPrice] = useState<PriceRange | null>(null);
  const [mediaGallery, setMediaGallery] = useState<MediaGalleryItemType[]>([]);

  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { url_key: key }
  });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (data && data.products && data.products.items.length > 0) {
      //console.log('Data', data)
      setProductData(data.products.items[0])
    }
  }, [data]);

  useEffect(() => {
    if (productData) {
      if (selectedVariant) {
        setPrice(selectedVariant.product.price_range);
        setMediaGallery([...selectedVariant.product.media_gallery, ...productData.media_gallery]);
      } else {
        setPrice(productData.price_range);
        setMediaGallery(productData.media_gallery);
      }
    }
  },[selectedVariant, productData])

  const findSelectProductVariant = (
    selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
    productData: ProductDetailsType,
  ): ConfigurableProductVariant | null => {
    if (productData.__typename !== 'ConfigurableProduct') {
      return null;
    }
    let variants = productData.variants;
    Object.keys(selectedConfigurableProductOptions).forEach(code => {
      variants = variants.filter((variant) => {
        const attribute = variant.attributes.find(attr => attr.code === code);
        return attribute?.value_index === selectedConfigurableProductOptions[code];
      });
    });
  
    return variants?.[0];
  };
  
  const imagesGallery: MediaGalleryItem[] = productData?.media_gallery ?? [];
  
  const renderOptions = () => {
    if (data && data.products && data.products.items[0].__typename === 'ConfigurableProduct') {
      return <ConfigurableProductOptions 
        options={data.products.items[0].configurable_options}
        handleSelectConfigurableOption={handleSelectConfigurableOption}
        selectedConfigurableProductOptions={selectedConfigurableProductOptions}
        />
    }
    return null;
  }

  const handleSelectConfigurableOption: HandleSelectConfigurableOption = (optionCode, valueIndex) => {
    setSelectedConfigurableProductOptions((prevOptions) => ({
      ...prevOptions,
      [optionCode]: valueIndex
    })
    )
  }

  useEffect(() => {
    if (productData && Object.keys(selectedConfigurableProductOptions).length > 0) {
      const  variant = findSelectProductVariant(selectedConfigurableProductOptions, productData);
      setSelectedVariant(variant)
    }
  }, [productData, selectedConfigurableProductOptions]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  console.log('ProductData', productData)
  // const priceData = product.price?.regularPrice?.amount;
  // const currency = "USD";
  // const value = priceData?.value;
  // const price = value?.toLocaleString("en-US", {
  //   style: "currency",
  //   currency,
  // });

  return (
    <main>
      <div className='px-10 lg:px-20 py-5'>
        {productData && (
          <Suspense fallback={<Loading />}>
            <Breadcrumb products title={productData.name} />
              <article>
                <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3 flex flex-col justify-center items-center bg-gray-100 lg:sticky top-0 text-center center p-4">
                    {selectedImage ? 
                    (<img
                      src={selectedImage} 
                      width={300}
                      height={280}
                      alt="Product" 
                      className=""
                    />) : (
                      productData.media_gallery && productData.media_gallery.length > 0 ? (
                        <img src={productData.media_gallery[0].url} width={300} height={300} alt={productData.name} />
                      ) : (<p>No images available</p>)
                      
                    )}
                    <hr className="border-white border-2 my-6" />
                    <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center mx-auto">
                      {imagesGallery ? 
                      (imagesGallery.map((image, index) => (
                        // <Image key={index} src={image} width={120} height={100} alt="Product" className="object-cover w-24 cursor-pointer" />
                        <img
                          key={index} 
                          src={image.url} 
                          width={120} 
                          height={100} 
                          alt={productData.name}
                          className="object-cover w-8 md:w-24 cursor-pointer" 
                          onClick={() => setSelectedImage(image.url)}
                        />
                      ))) : (<p>No images</p>)}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h2 className="text-3xl font-extrabold text-gray-800">{productData.name}</h2>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <p className="text-gray-800 text-xl font-bold">
                        ${productData.price?.regularPrice?.amount.value}</p>
                      
                      <p className="text-gray-400 text-xl">
                      <span style={{ textDecoration: 'line-through' }}>
                        ${productData.price?.regularDataPrice?.amount.value}</span>
                        <span className="text-sm ml-1">{t("shop.productDetails.taxIncluded")}</span>
                      </p>
                      <p className="text-black text-xl">15%
                        <span className="text-sm ml-1">{t("shop.productDetails.discount")}</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 flex-grow border-t border-gray-300">
                    <hr className=""/>
                      <div className="px-15">
                        {renderOptions()}
                      </div>

                    </div>
                    <div className="flex gap-4 space-x-2 mt-4">
                      <div className="">
                        <span className="text-sm">SKU:</span>
                        <h3 className="text-sm font-bold text-gray-800 capitalize">{productData.sku}</h3>
                      </div>
                      <div className="">
                        <span className="text-sm">{t("shop.productDetails.category")}:</span>
                        <h3 className="text-sm font-bold text-gray-800 capitalize">
                          {productData.categories.map((c, index) => (
                            <span key={index} className='mr-2'>{c.name}</span>
                        ))}</h3>
                      </div>
                      <div className="">
                        <span className="text-sm">{t("shop.productDetails.stock")}:</span>
                        <h3 className="text-sm font-bold text-gray-800 capitalize">
                          {productData?.stock_status?.replace("_", " ")}</h3>
                      </div>
                      <div className="">
                        <span className="text-sm">Type:</span>
                        <h3 className="text-sm font-bold text-gray-800 capitalize">{productData.__typename}</h3>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Stars ratingSummary={productData.rating_summary} />
                    </div>

                    <div className='mt-6 flex justify-between items-center'>
                    <AddToCart product={productData} selectedVariant={selectedVariant}/>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800">{t("shop.productDetails.about")} {productData.name}</h3>
                  <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                    <li dangerouslySetInnerHTML={{ __html: productData.description?.html }} />
                  </ul>
                </div>

                {/* <div className="flex gap-4 space-x-2 mt-4">
                  <div>
                    <span className="text-sm">{t("shop.productDetails.warrantyInfo")}:</span>
                    <h3 className="text-sm font-bold text-gray-800 capitalize">Product warrantyInformation</h3>
                  </div>
                  <div>
                    <span className="text-sm">{t("shop.productDetails.shippingInfo")}:</span>
                    <h3 className="text-sm font-bold text-gray-800 capitalize">Product shippingInformation</h3>
                  </div>
                  <div>
                    <span className="text-sm">{t("shop.productDetails.availability")}:</span>
                    <h3 className="text-sm font-bold text-gray-800 capitalize">Product availabilityStatus</h3>
                  </div>
                </div>

                <div className="flex gap-4 space-x-2 mt-4">
                  <div>
                    <span className="text-sm">{t("shop.productDetails.return")}:</span>
                    <h3 className="text-sm font-bold text-gray-800 capitalize">Product returnPolicy</h3>
                  </div>
                  <div>
                    <span className="text-sm">{t("shop.productDetails.minimumQty")}:</span>
                    <h3 className="text-sm font-bold text-gray-800 capitalize">Product minimumOrderQuantity</h3>
                  </div>
                </div> */}

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

                  {/* {product.reviews && product.reviews.map((review, index) => (
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
                  ))} */}
                  <div className="flex items-start mt-8">
                    <Image 
                      src="https://readymadeui.com/team-2.webp" 
                      className="w-12 h-12 rounded-full border-2 border-white" 
                      width={100}
                      height={100}
                      alt={productData.name}
                      />
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
          </Suspense>
        )}

      
      </div>
    </main>
  );
}

export default ProductPage;