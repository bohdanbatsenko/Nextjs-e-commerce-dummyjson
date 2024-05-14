//import { useEffect } from 'react';
// import usePagination from '../hooks/usePagination';
// import Button from './Button';

// const Pagination = ({ pageCount, pageNumber, changePage, nextPage, previousPage }) => {
//   const pageNumbers = [...Array(pageCount).keys()].map(num => num + 1);
//   return (
//     <nav>
//       <Button onClick={previousPage} disabled={pageNumber === 1}>Previous</Button>
//       {pageNumbers.map(number => (
//         <Button key={number} onClick={() => changePage(number)}>{number}</Button>
//       ))}
//       <Button onClick={nextPage} disabled={pageNumber === pageCount}>Next</Button>
//     </nav>
//   );
// };

// const Pagination = (props) => {
//   const { pageNumber, changePage, pageData, nextPage, previousPage} = usePagination(props.items, props.pageLimit)
//   useEffect(() => {
//     props.setPageItems(pageData);
//   }, [pageNumber]);

//   return (
//     <nav>
//        <Button onClick={previousPage}>Prev</Button>
//       <ul className='pagination'>
//         <li>
//         <input
//         value={pageNumber}
//         onChange={(e) => {
//           changePage(e.target.valueAsNumber);
//         }}
//         type="number"
//       />
//         </li>
//       </ul>
//       <Button onClick={nextPage}>Next</Button>
//     </nav>
//   );
// };

//export default Pagination;