'use client';

import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters";
import Products from "./Products";
import Sort from "@/components/Sort";


const ProductsPage = () => {
  return (
    <main>
      <Breadcrumb title="products" products={console.log('products')}/>
      
      <div className='flex flex-col sm:flex-row justify-between items-center px-10 lg:px-20 py-5'>
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
          
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-10 lg:grid-cols-5 px-5 md:px-10 lg:px-20">
        <Filters />
        <div className='col-span-2 md:col-span-2 lg:col-span-4'>
          <Sort />
          <Products />
        </div>
      </div>
    </main>
  );
};


export default ProductsPage;