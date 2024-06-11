'use client';

import Button from "./Button";
import { useState, useEffect } from "react";
import { useFilterContext } from "@/context/filter_context";

const Filters = () => {
  const [categories, setCategories] = useState();
  const {
    filters: { text, category: categoryFilter, min_price, max_price, price },
    updateFilters,
    all_products: products,
    clearFilters,
  } = useFilterContext();

  const getCategories = () => { 
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())  
    .then((data) => {
      setCategories(data);
    })  
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    getCategories()
  }, [])

  if (products.length > 0) {
    return (
      <div>
        <div className='content'>
          <form 
            className='filter__form' 
            onSubmit={(e) => e.preventDefault()}>
            <div className='relative w-4/5 mb-4'>
            <label htmlFor="voice-search" className="sr-only">Search</label>
              <input
                type='text'
                name='text'
                placeholder='Search product'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={text}
                onChange={updateFilters}
              />
            </div>
            <div className='form__control mb-4'>
              <h4 className="text-xl mb-2">Categories</h4>
              <div className='form__categories'>
              {categories && categories.map((category) => (
                <div key={category.slug}> 
                    <div className="form-check">
                      <input 
                        className="w-5 h-5 cursor-pointer appearance-none border border-gray-800  rounded-md mr-2 hover:border-amber-500 hover:bg-amber-100 checked:bg-no-repeat checked:bg-center checked:border-amber-500 checked:bg-amber-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" 
                        name="category"
                        type="checkbox" 
                        value={category.slug} 
                        id={category.slug}
                        checked={categoryFilter.includes(category.slug)}
                        onChange={updateFilters}
                      />
                      <label className="inline-block ps-[0.15rem] hover:cursor-pointer pl-2" htmlFor={category.slug}>
                      {category.name}     
                      </label>
                    </div> 
                </div>
              ))}
              </div>
            </div>
            <div className='form__control'>
              <h4 className="text-xl mb-2">Price</h4>
              <p className='price'>${price}</p>
              <input
                type='range'
                name='price'
                min={min_price}
                max={max_price}
                value={price}
                onChange={updateFilters}
              />
            </div>
          </form>
          <Button
            onClick={clearFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default Filters;