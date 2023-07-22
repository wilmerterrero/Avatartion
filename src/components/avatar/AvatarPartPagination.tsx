type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export const AvatarPartPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const getPaginationRange = () => {
    const totalPagesDisplay = totalPages;
    const half = Math.floor(totalPagesDisplay / 2);
    let start = currentPage - half + 1 - (totalPagesDisplay % 2);
    let end = currentPage + half;

    if (start <= 0) {
      start = 1;
      end = totalPagesDisplay;
    } else if (end > totalPages) {
      start = totalPages - totalPagesDisplay + 1;
      end = totalPages;
    }
    return { start, end };
  };

  const { start, end } = getPaginationRange();

  const pages = [...Array(end - start + 1)].map((_, index) => start + index);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav
      className="text-sm font-medium text-gray-700"
      aria-label="Page navigation"
    >
      <ul className="inline-flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`${
                currentPage === page
                  ? 'text-white bg-black border border-r-0 border-black rounded-full focus:shadow-outline'
                  : 'text-black transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-100'
              } w-10 h-10`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
