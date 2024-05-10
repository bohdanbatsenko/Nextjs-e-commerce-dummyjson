import { useState, useEffect } from 'react';

const Filters = ({handleOnClick, value}) => {
  const [ categories, setCategories ] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all'); 

  const handleCheckboxChange = (event) => {
    setSelectedCategory(event.target.value);
    handleOnClick(event.target.value)
  };
  // const handleCheckboxAllChange = () => {
  //   setIsChecked(!isChecked);
  // }

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
    <div className='mb-2'>
      {/* <Button onClick={() => handleOnClick('all')}>All</Button> */}
      <div className="flex items-center">
        <input 
          type="radio" 
          name="category"
          value="all"
          className="w-5 h-5"
          checked={selectedCategory === 'all'}
          onChange={handleCheckboxChange}
          />
        <label htmlFor="radio"
          className="text-sm text-black ml-4">
          <span className="w-2.5 h-2.5">All</span>
        </label>
      </div>

      </div>
    {categories.map((category, idx) => (
      <div key={`${category}-${idx}`} className='mb-2'>
      {/* <Button onClick={() => handleOnClick(category)}>{category}</Button> */}
      
      <div className="flex items-center">
        <input 
          type="radio" 
          name={category}
          className="w-5 h-5"
          checked={selectedCategory === category}
          value={category}
          onChange={handleCheckboxChange}
          />
        <label htmlFor="radio"
          className="text-sm text-black ml-4">
          <span className="w-2.5 h-2.5">{category}</span>
        </label>
      </div>

      </div>
    ))}
  </div>

}
export default Filters;