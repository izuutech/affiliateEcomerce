import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductGridCard from "../../components/product/product-grid-card";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { fetchProducts } from "../../endpoints/products";
import { useQuery } from "react-query";

function ExploreProducts() {
  const router = useRouter();
  const { isUserAuthenticated, authState } = useContext(AuthContext);

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

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
  }, []);

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
                {/* <li className="breadcrumb-item">
                  <a href="#">Electronics</a>
                </li> 
                <li className="breadcrumb-item active" aria-current="page">
                  Phones & Tablets
                </li> */}
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          {/* <div className="col-lg-3">
            <div className="accordion shadow-sm rounded">
              <div className="accordion-item border-bottom">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                  >
                    Categories
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body pt-2">
                    <div className="vstack gap-2">
                      <a
                        href="#"
                        className="fw-medium link-dark text-decoration-none"
                      >
                        Phones & Tablets
                      </a>
                      <a
                        href="#"
                        className="fw-medium link-dark text-decoration-none"
                      >
                        Laptops & PC
                      </a>
                      <a
                        href="#"
                        className="fw-medium link-dark text-decoration-none"
                      >
                        Monitors
                      </a>
                      <a
                        href="#"
                        className="fw-medium link-dark text-decoration-none"
                      >
                        Game Controllers
                      </a>
                      <a
                        href="#"
                        className="fw-medium link-dark text-decoration-none"
                      >
                        Cables & Chargers
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-bottom">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                  >
                    Brands
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body pt-2">
                    <div className="vstack gap-2">
                      <div className="d-flex gap-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="fw-medium flex-grow-1">Apple</label>
                        <span className="badge bg-default rounded-pill my-auto mb-0 text-dark">
                          50
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="fw-medium flex-grow-1">Samsung</label>
                        <span className="badge bg-default rounded-pill my-auto mb-0 text-dark">
                          100
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="fw-medium flex-grow-1">Sony</label>
                        <span className="badge bg-default rounded-pill my-auto mb-0 text-dark">
                          30
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="fw-medium flex-grow-1">AOC</label>
                        <span className="badge bg-default rounded-pill my-auto mb-0 text-dark">
                          60
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="true"
                  >
                    Price Range
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body pt-0">
                    <form className="row g-3">
                      <div className="col-6">
                        <label className="form-label">Min</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Max</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100">Apply</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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
                <div className="col">
                  <ProductGridCard product={product} />
                </div>
              ))}
              {/* <div className="col">
                <ProductGridCard off={10} />
              </div>
              <div className="col">
                <ProductGridCard />
              </div>
              <div className="col">
                <ProductGridCard />
              </div>
              <div className="col">
                <ProductGridCard />
              </div>
              <div className="col">
                <ProductGridCard off={25} />
              </div>
              <div className="col">
                <ProductGridCard />
              </div> */}
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

export default ExploreProducts;
