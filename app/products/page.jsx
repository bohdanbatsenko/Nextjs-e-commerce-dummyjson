'use client';

import Image from 'next/image';
import './page.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState, useContext } from "react";
import CartContext from '@/context/CartContext';
import Pagination from '@/components/Pagination';
//import { ToastContainer, toast } from 'react-toastify';
import { toasterNotifier } from '@/hooks/useToasterNotify';
import Button from '@/components/Button'; 

let PageSize = 8;

const ProductsPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const cartCtx = useContext(CartContext)
  const { notifyAddedToCart, notifyRemovedFromCart } = toasterNotifier()
  const [currentPage, setCurrentPage] = useState(1);

  const addCategory = (category) => {
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
    console.log('handle Reset')
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
    fetch('https://dummyjson.com/products?limit=100')
    .then(res => res.json()) 
    .then((data) => {
      if (data.products && data.products.length) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      };
    })  

    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if(selectedCategories.length === 0){
      setFilteredProducts(products);
    } else{
      setFilteredProducts(
        products.filter(
        (item) => selectedCategories.includes(item.category)
        )
      );
    }
  }, [selectedCategories, products])

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  const handleAddToCart = (product) => {
    cartCtx.addItem(product)
  }

  const handleRemoveFromCart = (id) => {
    cartCtx.removeItem(id);
    notifyRemovedFromCart(id);
  };

  return <>
    <div className='flex flex-col justify-center bg-gray-100'>
    {/* <ToastContainer limit={1} /> */}
      <div className='flex justify-between items-center px-20 py-5'>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-10 lg:grid-cols-5 px-5 md:px-10 lg:px-20'>
      <div className=''>
        <div className='mb-2'><Button onClick={handleReset}>Reset</Button></div>

        {categories.map((category) => (
          <div onClick={() => {
            if(selectedCategories.includes(category)){
                removeCategory(category);
            } else{
                addCategory(category);
            }
            }}  key={category.slug}> 

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value={category.slug} 
                  id={category.slug}
                  checked={selectedCategories.includes(category.slug)}
                  onChange={event => { 
                    event.target.checked ? addCategory(event.target.value) : removeCategory(event.target.value);
                  }}
                />
                <label className="form-check-label pl-2" htmlFor={category.slug}>
                {category.name}     
                </label>
              </div> 
          </div>
      ))}

      </div>
      <div className='col-span-2 md:col-span-2 lg:col-span-4'>
        <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 lg:px-0 lg:pr-10'>
  {filteredProducts.length && (
      (selectedCategories.length === 0 
        ? filteredProducts.slice(firstPageIndex, lastPageIndex)
        : filteredProducts
        .filter((item) => selectedCategories.includes(item.category))
        .slice(firstPageIndex, lastPageIndex)
        )
          .map(product => (
        <div key={product.id} className='bg-white shadow-md rounded-lg px-5 py-5 flex flex-col justify-between'>
          <Image src={product.thumbnail} width={300} height={200} alt={product.title} className='rounded-md h-48' />
          <div className='mt-4'>
            <h1 className='text-lg uppercase font-bold'>
              {product.title}
              </h1>
            <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
            <p className='mt-2 text-gray-600'>${product.price}</p>
          </div>
          <div className='mt-6 flex flex-col lg:flex-row justify-between items-center'>
            {
              !cartCtx.items.find(item => item.id === product.id) ? (
                <Button onClick={() => {
                  handleAddToCart(product)
                  notifyAddedToCart(product)
                  }
                }>Add to cart</Button>
              ) : (
                <div className="flex gap-4">
                  <Button onClick={() => {
                      handleAddToCart(product)
                    }
                }>+</Button>
                <p className='text-gray-600'>{cartCtx.items.find(item => item.id === product.id).quantity}</p>
                <Button
                  onClick={() => {
                    const cartItem = cartCtx.items.find((item) => item.id === product.id);
                    if (cartItem.quantity === 1) {
                      handleRemoveFromCart(product.id);
                    } else {
                      cartCtx.removeItem(product.id);
                    }
                  }}>-</Button>
              </div>
              )
            }

            <Link
              href={{
                pathname: "products/product",
                query: {id: product.id},
              }}
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
            View
            </Link>
        </div>
        </div>
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