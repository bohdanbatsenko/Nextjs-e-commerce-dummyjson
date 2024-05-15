import { useState, useEffect } from 'react';

const Filters = () => {
  const [ categories, setCategories ] = useState([])
  //const [selectedCategories, setSelectedCategories] = useState([]); 

  // const handleCheckboxChange = (event) => {
  //   setSelectedCategories(event.target.value);
  //   handleOnClick(event.target.value)
  // };
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

  // const addCategory = (category) => {
  //   if(!selectedCategories.includes(category)){
  //       setSelectedCategories(prev => ([...prev, category]))
  //   }     
  // }

  // const removeCategory = (category) => {
  //   if(selectedCategories.includes(category)){
  //       const removedList = selectedCategories.filter((item) => (item !== category));
  //       setSelectedCategories(removedList);
  //   }
  // }

  useEffect(() => {
    getCategories()
  }, [])



  return <div>
    {/* <div className='mb-2'>
      <div className="flex items-center">
        <input 
          type="radio" 
          name="category"
          value="all"
          className="w-5 h-5"
          checked={selectedCategories === 'all'}
          onChange={handleCheckboxChange}
          />
        <label htmlFor="radio"
          className="text-sm text-black ml-4">
          <span className="w-2.5 h-2.5">All</span>
        </label>
      </div>
      </div> */}

    {categories.map((category) => (
      <div key={category}> 
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={category} id={category} />
            <label className="form-check-label" htmlFor={category}>
            {category}     
            </label>
          </div> 
      </div>
     ))}

    {/* {categories.map((category, idx) => (
      <div key={`${category}-${idx}`} className='mb-2'>
      <div className="flex items-center">
        <input 
          type="radio" 
          name={category}
          className="w-5 h-5"
          checked={selectedCategories === category}
          value={category}
          onChange={handleCheckboxChange}
          />
        <label htmlFor="radio"
          className="text-sm text-black ml-4">
          <span className="w-2.5 h-2.5">{category}</span>
        </label>
      </div>

      </div>
    ))} */}

  </div>

}
export default Filters;