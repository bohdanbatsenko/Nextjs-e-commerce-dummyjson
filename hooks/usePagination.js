// import { useState } from 'react';

// const usePagination = (data, itemsPerPage) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const pageCount = Math.ceil(data.length / itemsPerPage);

//   const changePage = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const nextPage = () => {
//     setCurrentPage((currentPage) => Math.min(currentPage + 1, pageCount));
//   };

//   const previousPage = () => {
//     setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const pageData = data.slice(startIndex, startIndex + itemsPerPage);

//   return { pageNumber: currentPage, pageCount, changePage, pageData, nextPage, previousPage };
// };



// function usePagination(items, pageLimit) {
// 	const [pageNumber, setPageNumber] = useState(0);
// 	const pageCount = Math.ceil(items.length / pageLimit);
//   const changePage = (pN) => {
// 		setPageNumber(pN);
// 	}
//   const pageData = () => {
// 		const s = pageNumber * pageLimit;
// 		const e = s + pageLimit;
// 		return items.slice(s, e);
// 	}
//   const nextPage = () => {
//     setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
//   };

//   const previousPage = () => {
//     setPageNumber(Math.max(pageNumber - 1, 0));
//   };

// 	return { 
//     pageNumber, 
//     pageCount, 
//     changePage, 
//     pageData,
//     nextPage,
//     previousPage
//   };
// }

export default usePagination;