'use client';

import './page.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useContext } from "react";
import CartContext from '@/context/CartContext';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
import SearchForm from '@/components/SearchForm';
import ProductCard from '@/components/ProductCard';
import { Product, Products, FilteredProducts } from '@/types/product';
import { CategoryType, SelectedCategories } from '@/types/category';

let PageSize = 8;

const ProductsPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FilteredProducts[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories[]>([]);
  const cartCtx = useContext(CartContext)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchProduct = () => {
    setSelectedCategories([])
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.products && data.products.length) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearchProduct();
  };

  const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked 
      ? addCategory(event.target.value) 
      : removeCategory(event.target.value);
  }

  const addCategory = (category) => {
    setSearchTerm('')
    if(!selectedCategories.includes(category)){
        setSelectedCategories(prev => ([...prev, category]))
    }
  }
  
  const removeCategory = (category) => {
    if(selectedCategories.includes(category)){
        const removedList = selectedCategories.filter((item) => (item !== category));
        setSelectedCategories(removedList);
    }
  }

  const handleReset = () => {
    setSelectedCategories([]);
    setFilteredProducts(products);
  }

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

  const getProducts = () => {
    fetch('https://dummyjson.com/products?limit=400')
    .then(res => res.json())
    .then((data) => {
      if (data.products && data.products.length) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      };
    })  
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    getProducts()
  }, [searchTerm])

  useEffect(() => {
    if(selectedCategories.length === 0){
      setFilteredProducts(products);
    } else{
      setFilteredProducts(
        products.filter((item) => selectedCategories.includes(item.category))
      );
    }
  }, [selectedCategories, products])

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  return <>
    <div className='flex flex-col justify-center bg-gray-100'>
      <div className='flex flex-col sm:flex-row justify-between items-center px-10 lg:px-20 py-5'>
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
        <SearchForm 
          searchTerm={searchTerm}
          onChangeHandler={(event) => setSearchTerm(event.target.value)}
          searchFormSubmitHandler={handleSearchFormSubmit}
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-10 lg:grid-cols-5 px-5 md:px-10 lg:px-20'>
        <div className=''>
          <div className='mb-2'><Button onClick={handleReset}>Reset</Button></div>

          {categories.map((category) => (
            <div onClick={() => {
              //if(selectedCategories.includes(category.slug)){
              if(selectedCategories.map(category => category.slug).includes(category.slug)) {
                  removeCategory(category.slug);
              } else{
                  addCategory(category.slug);
              }
              }}  key={category.slug}> 

                <div className="form-check">
                  <input 
                    className="w-5 h-5 cursor-pointer appearance-none border border-gray-800  rounded-md mr-2 hover:border-amber-500 hover:bg-amber-100 checked:bg-no-repeat checked:bg-center checked:border-amber-500 checked:bg-amber-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" 
                    type="checkbox" 
                    value={category.slug} 
                    id={category.slug}
                    checked={selectedCategories.includes(category.slug)}
                    onChange={filterHandler}
                  />
                  <label className="inline-block ps-[0.15rem] hover:cursor-pointer pl-2" htmlFor={category.slug}>
                  {category.name}     
                  </label>
                </div> 
            </div>
        ))}

        </div>
        <div className='col-span-2 md:col-span-2 lg:col-span-4'>
          <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-5 lg:px-0 lg:pr-10'>
            {filteredProducts.length && (
              (selectedCategories.length === 0 
                ? filteredProducts.slice(firstPageIndex, lastPageIndex)
                : filteredProducts
                .filter((item) => {
                  return selectedCategories.includes(item.category)})
                .slice(firstPageIndex, lastPageIndex)
                )
                  .map(product => (
                    <ProductCard product={product} key={product.id}/>
              ))
            )}
          </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={filteredProducts.length === 0 ? products.length : filteredProducts.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  </div>
  </>    
}

export default ProductsPage;