'use client';

import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "next/navigation";
import { Product } from '@/types/product';
import ProductDetails from './ProductDetails';


const Product:React.FC = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [product, setProduct] = useState<Product>();
  
  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const productData = await res.json();
      productData.quantity = 1;
      setProduct(productData);
    } catch (err) {
      console.error("Failed to fetch product: ", err);
    }
  };

  return <>
    <ProductDetails product={product}/>
  </>
}

export default Product;