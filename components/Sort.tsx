'use client';

import { useFilterContext } from "@/context/filter_context";
import { FaBars } from "react-icons/fa";
import { FaGripVertical } from "react-icons/fa";
import Button from "./Button";

const Sort = () => {
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
    updateSort,
    sort,
  } = useFilterContext();

  return (
    <div className="flex justify-between items-center gap-1 mb-2 md:mb-6">
      <div className='flex items-center justify-center gap-0.5'>
        <Button
          onClick={setGridView}
        >
         <FaGripVertical/>
        </Button>
        <Button
          onClick={setListView}
        >
          <FaBars/>
        </Button>
        <p className='sort__items ml-1.5 md:ml-4'>
        <span>{products.length}</span> items found
      </p>
      </div>

      <form className='sort__form'>
        <label htmlFor='sort'>sort by :</label>
        <select
          name='sort'
          id='sort'
          className='sort__input'
          value={sort}
          onChange={updateSort}
        >
          <option value='price-lowest'>price (lowest)</option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>name (a-z)</option>
          <option value='name-z'>name (z-a)</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;