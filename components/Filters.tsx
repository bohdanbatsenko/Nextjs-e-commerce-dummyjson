'use client';

import Button from "./Button";
import { useState, useEffect } from "react";
import { useFilterContext } from "@/context/filter_context";
import { getUniqueValues } from "@/utils/helpers";


const Filters = () => {
  const [categories, setCategories] = useState();
  const {
    filters: { text, category: categoryFilter, min_price, max_price, price },
    updateFilters,
    all_products: products,
    clearFilters,
  } = useFilterContext();

  const filterHandler = (e) => {
    updateFilters(e);
    console.log(e.target.value)
    console.log(e.target.checked)
  };

  // const categories = getUniqueValues(products, "category");
  //   console.log('Categories are: ',categories)

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
  console.log(categories)
  if (products.length > 0) {
    return (
      <div>
        <div className='content'>
          <form className='filter__form' onSubmit={(e) => e.preventDefault()}>
            <div className='form__control'>
              <input
                type='text'
                name='text'
                placeholder='Search'
                className='search__input'
                value={text}
                onChange={updateFilters}
              />
            </div>
            <div className='form__control'>
              <h4>Categories</h4>
              <div className='form__categories'>
              {categories && categories.map((category) => (
                <div key={category.slug}> 
                    <div className="form-check">
                      <input 
                        className="w-5 h-5 cursor-pointer appearance-none border border-gray-800  rounded-md mr-2 hover:border-amber-500 hover:bg-amber-100 checked:bg-no-repeat checked:bg-center checked:border-amber-500 checked:bg-amber-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" 
                        type="checkbox" 
                        value={category.slug} 
                        id={category.slug}
                        checked={categoryFilter.includes(category.slug)}
                        onChange={filterHandler}
                      />
                      <label className="inline-block ps-[0.15rem] hover:cursor-pointer pl-2" htmlFor={category.slug}>
                      {category.name}     
                      </label>
                    </div> 
                </div>
              ))}
                {/* {categories.map((c, index) => (
                  <input
                    key={index}
                    type='checkbox'
                    name='category'
                    className={category === c ? "active" : null}
                    onClick={updateFilters}
                    data-category={c}
                  >
                  <label className="inline-block ps-[0.15rem] hover:cursor-pointer pl-2" htmlFor={c.slug}>
                  {c}     
                  </label>
   
                ))} */}
              </div>
            </div>
            <div className='form__control'>
              <h4>Price</h4>
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