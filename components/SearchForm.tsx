
'use client';

import { FaSearch } from "react-icons/fa";

const SearchForm = ({searchTerm, onChangeHandler, searchFormSubmitHandler}) => {
  return (
    <div className="searchForm">
      <form className="flex items-center max-w-lg mx-auto" onSubmit={searchFormSubmitHandler}>   
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <input 
              type="text" 
              id="voice-search" 
              value={searchTerm}
              onChange={onChangeHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search a product" 
              required />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-300"><FaSearch /></div>
        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-black rounded-lg border border-gray-700 hover:gray-800 focus:ring-4 focus:outline-none focus:gray-300 dark:gray-600 dark:hover:gray-700 dark:focus:gray-800">
          <div className="inset-x-0 start-0 flex items-center pr-2"><FaSearch /></div>Search
        </button>
      </form>
  </div> 
  )
}

export default SearchForm;