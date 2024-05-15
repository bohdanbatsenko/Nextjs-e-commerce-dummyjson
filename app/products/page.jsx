'use client';

import Image from 'next/image';
import './page.module.css'
//import Filters from '@/components/Filters';
import Link from 'next/link';

import { useRouter } from 'next/navigation'
import { useEffect, useState, useContext } from "react";
import { CartProvider } from '@/context/cart';
import { CartContext } from '@/context/cart';
import { ToastContainer } from 'react-toastify';
import { toasterNotifier } from '@/hooks/useToasterNotify';
import Button from '@/components/Button';

export function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext)
  const { notifyAddedToCart, notifyRemovedFromCart } = toasterNotifier()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)


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

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= products.length &&
      pageNumber !== page
    )
      setPage(pageNumber);    
  };

  return <>
    <div className='flex flex-col justify-center bg-gray-100'>
    <ToastContainer />
      <div className='flex justify-between items-center px-20 py-5'>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
    </div>

    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 px-20'>
      <div>
        <div className='mb-2'><Button onClick={handleReset}>Reset</Button></div>
        {categories.map((category) => (
          <div onClick={() => {
            if(selectedCategories.includes(category)){
                removeCategory(category);
            } else{
                addCategory(category);
            }
            }}  key={category}> 

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value={category} 
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={event => { 
                    event.target.checked ? addCategory(event.target.value) : removeCategory(event.target.value);
                  }}
                />
                <label className="form-check-label pl-2" htmlFor={category}>
                {category}     
                </label>
              </div> 
          </div>

      ))}
      </div>
      <div className='lg:col-span-4'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
  {filteredProducts.length && (
      (selectedCategories.length === 0 
        ? filteredProducts.slice(page * limit - limit, page * limit) 
        : filteredProducts
        .filter((item) => selectedCategories.includes(item.category))
          .slice(page * limit - limit, page * limit))
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
          <div className='mt-6 flex justify-between items-center'>
            {
              !cartItems.find(item => item.id === product.id) ? (
                <Button onClick={() => {
                  addToCart(product)
                  notifyAddedToCart(product)
                  }
                }>Add to cart</Button>
              ) : (
                <div className="flex gap-4">
                  <Button onClick={() => {
                      addToCart(product)
                    }
                }>+</Button>
                <p className='text-gray-600'>{cartItems.find(item => item.id === product.id).quantity}</p>
                <Button
                  onClick={() => {
                    const cartItem = cartItems.find((item) => item.id === product.id);
                    if (cartItem.quantity === 1) {
                      handleRemoveFromCart(product);
                    } else {
                      removeFromCart(product);
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

      {products.length > limit && (
        <section className="pagination">
          <Button
            onClick={() => handlePageChange(page - 1)}
            className={`arrow ${page === 1 ? "pagination__disabled" : ""}`}
          >
            {"<"}
          </Button>
          {[...Array(Math.floor(products.length / limit))].map((_, i) => (
            <span
              className={`page__number cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                page === i + 1 ? "selected__page__number" : ""
              }`}
              style={page === i + 1 ? { backgroundColor: 'black', color: 'white' } : {}}
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <Button
            onClick={() => handlePageChange(page + 1)}
            className={`arrow ${
              page === Math.floor(products.length / limit)
                ? "pagination__disabled"
                : ""
            }`}
          >
            {">"}
          </Button>
        </section>
      )}

      </div>
    </div>
  </div>
  </>    
}

export default function WrappedProductsPage() {
  return (
    <CartProvider>
      <ProductsPage />
    </CartProvider>
  );
}