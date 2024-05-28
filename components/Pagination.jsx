import { usePagination, DOTS } from '@/hooks/usePagination';
import Button from './Button';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className="mt-6 flex gap-x-2"
    >
      <Button disabled={currentPage === 1} onClick={onPrevious}>{"<"}</Button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={Math.random()} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            key={Math.random()}
            className='cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            style={pageNumber === currentPage ? { backgroundColor: 'black', color: 'white' } : {}}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <Button disabled={currentPage === lastPage} onClick={onNext}>{">"}</Button>
    </ul>
  );
};

export default Pagination;