import { useState, useEffect } from 'react';
import Button from './Button';

const Filters = ({handleOnClick}) => {
  const [ categories, setCategories ] = useState([])
  async function getCategories() {
    const response = await fetch('https://dummyjson.com/products/categories')
    const data = await response.json()
    // Check if data is an array before setting it to the state
    if (Array.isArray(data)) {
      setCategories(data);
    } else {
      // If data is an object with a 'products' array inside it
      setCategories(data.categories || []);
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  return <div>
    <div className='mb-2'><Button onClick={() => handleOnClick('all')}>All</Button></div>
    {categories.map((category, idx) => (
      <div key={`${category}-${idx}`} className='mb-2'>
      <Button onClick={() => handleOnClick(category)}>{category}</Button>
      </div>
    ))}
  </div>

}
export default Filters;