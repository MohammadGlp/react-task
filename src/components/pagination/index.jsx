import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Pagination = ({ totalCount, filterData, setFilterValue }) => {
  const [paginationArray, setPaginationArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { path } = filterData;

  useEffect(() => {
    setPaginationArray(
      totalCount < 1
        ? [1]
        : Array.from({ length: totalCount }, (_, i) => i + 1),
    );
  }, [totalCount]);

  useEffect(() => {
    if (filterData.type) {
      setCurrentPage(1);
    }
  }, [filterData]);

  const handleNextStep = () => {
    if (currentPage < totalCount) {
      setCurrentPage((old) => old + 1);
      setFilterValue({
        id: filterData?.type ? filterData?.id * 20 : currentPage * 100,
        page: currentPage * 10,
        ...(path ? { path } : {}),
      });
    }
  };

  const handlePrevStep = () => {
    if (currentPage > 1) {
      setCurrentPage((old) => old - 1);
      setFilterValue({
        id: filterData?.type ? filterData?.id * 20 : currentPage * 100,
        page: (currentPage - 2) * 10,
        ...(path ? { path } : {}),
      });
    }
  };

  const handleStepWithClick = (num) => {
    setCurrentPage(num);

    setFilterValue({
      id: filterData?.type ? filterData?.id * 20 : num * 100,
      page: (num - 1) * 10,
      ...(path ? { path } : {}),
    });
  };

  const mutateArrayForPagination = () => {
    const newPaginationArray = [];

    newPaginationArray.push(1, 2, 3);

    if (currentPage > 5) {
      newPaginationArray.push("...");
    }

    if (currentPage < 4 && currentPage > 3) {
      newPaginationArray.pop();
    }

    if (currentPage >= 3 && currentPage <= totalCount - 2) {
      if (currentPage - 1 > 3) newPaginationArray.push(currentPage - 1);

      if (currentPage > 3 && currentPage < totalCount - 2)
        newPaginationArray.push(currentPage);

      if (currentPage + 1 < totalCount - 2)
        newPaginationArray.push(currentPage + 1);
    }

    if (currentPage < totalCount - 4) {
      newPaginationArray.push("...");
    }
    newPaginationArray.push(totalCount - 2, totalCount - 1, totalCount);

    setPaginationArray(newPaginationArray);
  };

  useEffect(() => {
    if (totalCount > 8) {
      mutateArrayForPagination();
    }
  }, [totalCount, currentPage]);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePrevStep()}
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handleNextStep()}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePrevStep()}
            >
              <span className="sr-only">Previous</span>
              <BsChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            {paginationArray?.map((item, idx) => {
              return (
                <button
                  key={idx}
                  type="button"
                  aria-current="page"
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === item ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"} focus:z-20`}
                  onClick={() => handleStepWithClick(item)}
                  disabled={
                    item === "..." ||
                    paginationArray.length < 2 ||
                    item === currentPage
                  }
                >
                  {item}
                </button>
              );
            })}
            <button
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handleNextStep()}
            >
              <span className="sr-only">Next</span>
              <BsChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
