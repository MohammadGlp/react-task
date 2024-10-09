import { useEffect, useState } from "react";
import { GetAllProductsApi } from "./core/api/get-all-products-api";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "./components/pagination";

const App = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterValue, setFilterValue] = useState({});

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["all-products", filterValue?.id ? filterValue?.id : 100],
    queryFn: async (context) => {
      const response = await GetAllProductsApi(
        `products${filterValue?.path ? filterValue.path : ""}?limit=10&skip=${filterValue?.page ? `${filterValue?.page}` : "0"}&select=description,price,thumbnail,title`,
      );
      return response.data;
    },
    refetchInterval: 1200000,
  });

  const { data: categories, isLoading: filterLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const response = await GetAllProductsApi("products/categories");

      return response.data;
    },
    refetchInterval: 1200000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProducts(data.products);
      setTotalCount(Math.ceil(data.total / 10));
    }
  }, [isLoading, data]);

  return (
    <div className={"flex flex-col justify-between gap-y-3 m-3"}>
      <Header
        preProducts={data ? data?.products : []}
        products={products}
        setProducts={setProducts}
        categories={categories}
        loading={isLoading}
        filterLoading={filterLoading}
        setFilterValue={setFilterValue}
      />
      <div
        className={
          isLoading || isPending || (products && products.length < 2)
            ? "flex justify-center items-center h-[850px] w-full"
            : ""
        }
      >
        {isLoading || isPending ? (
          <p className="">Loading...</p>
        ) : products && products.length > 0 ? (
          <>
            <Content products={products} />
          </>
        ) : (
          <p className="">There is nothing to show.</p>
        )}
      </div>
      <Pagination
        totalCount={totalCount}
        setFilterValue={setFilterValue}
        filterData={filterValue}
      />
    </div>
  );
};

export default App;
