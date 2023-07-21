const Pagination = ({
  meta = {},
  currentPage = 1,
  limit = 10,
  totalPage = 1,
  setLimit = () => {},
  setPage = () => {},
}) => {
  console.log(totalPage);

  let middlePagination;

  if (totalPage <= 5) {
    middlePagination = [...Array(totalPage)].map((_, index) => (
      <button
        className="bg-primary/10 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
        onClick={() => setPage(index + 1)}
        key={index + 1}
        disabled={currentPage === index + 1}
      >
        {index + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((currentPage - 1) / 5) * 5;
    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => (
          <button
            className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
            key={startValue + index + 1}
            onClick={() => setPage(startValue + index + 1)}
            disabled={currentPage === startValue + index + 1}
          >
            {startValue + (index + 1)}
          </button>
        ))}
        <button>...</button>
        <button
          className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
          onClick={() => setPage(totalPage)}
        >
          {totalPage}
        </button>
      </>
    );
    if (currentPage > 5) {
      if (totalPage - currentPage >= 5) {
        middlePagination = (
          <>
            <button
              className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button>...</button>
            <button
              className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
              onClick={() => setPage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(5)].map((_, index) => (
              <button
                className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
                key={startValue + index + 1}
                disabled={currentPage === startValue + index + 1}
                onClick={() => setPage(startValue + index + 1)}
              >
                {startValue + index + 1}
              </button>
            ))}
            <button>...</button>
            <button
              className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
              onClick={() => setPage(totalPage)}
            >
              {totalPage}
            </button>
          </>
        );
      } else {
        let amountLeft = totalPage - currentPage + 5;

        middlePagination = (
          <>
            <button
              className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button>...</button>
            {[...Array(amountLeft)].map((_, index) => (
              <button
                className="bg-blue-100 text-secondary text-xs h-8 w-8 rounded-full disabled:bg-secondary disabled:text-white"
                key={startValue + index + 1}
                disabled={currentPage === startValue + index + 1}
                style={
                  totalPage < startValue + index + 1
                    ? { display: "none" }
                    : null
                }
                onClick={() => setPage(startValue + index + 1)}
              >
                {startValue + index + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }
  return (
    <div className="my-4 flex justify-end">
      <div className="flex items-center space-x-2">
        <select
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="px-3 py-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button
          className="text-xs px-4 py-2 rounded-full bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {middlePagination}
        <button
          className="text-xs px-4 py-2 rounded-full bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
