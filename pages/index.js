import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductGridCard from "../components/product/product-grid-card";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { fetchProducts } from "../endpoints/products";
import { useQuery } from "react-query";

function Home() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6 });

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_orders_${pagination.page}`,
    async () => {
      return await fetchProducts(pagination);
    }
  );

  useEffect(() => {
    if (data?.data?.data && Array.isArray(data?.data?.data?.docs)) {
      setProducts([...data?.data?.data?.docs]);
    }
  }, [data?.data, data?.data?.data]);

  const changePage = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="vstack">
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">All Categories</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-12">
            <div className="hstack justify-content-between mb-3">
              <span className="text-dark">
                {data?.data?.data?.totalDocs} Items found
              </span>
              <div className="btn-group" role="group">
                <button className="btn btn-outline-dark">
                  <FontAwesomeIcon icon={["fas", "sort-amount-up"]} />
                </button>
                <button className="btn btn-outline-dark">
                  <FontAwesomeIcon icon={["fas", "th-list"]} />
                </button>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {products.map((product) => (
                <div className="col" key={product?._id}>
                  <ProductGridCard product={product} />
                </div>
              ))}
            </div>

            <nav className="float-end mt-3">
              <ul className="pagination">
                {/* {data?.data?.data?.hasPrevPage && ( */}
                <li className="page-item">
                  <button
                    className={`page-link ${
                      data?.data?.data?.hasPrevPage ? "" : "text-dark"
                    }`}
                    onClick={
                      data?.data?.data?.hasPrevPage
                        ? () => {
                            const newPage = (pagination.page -= 1);
                            changePage(newPage);
                          }
                        : null
                    }
                  >
                    Prev
                  </button>
                </li>
                {/* )} */}

                <li className="page-item">
                  <button
                    className={`page-link ${
                      data?.data?.data?.hasNextPage ? "" : "text-dark"
                    }`}
                    onClick={
                      data?.data?.data?.hasNextPage
                        ? () => {
                            const newPage = (pagination.page += 1);
                            changePage(newPage);
                          }
                        : null
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
