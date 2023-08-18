import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ProductRating from "../../components/product-rating";
import ProductSimpleHorizontal from "../../components/product/product-simple-horizontal";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchProducts, fetchSingleProduct } from "../../endpoints/products";
import { frontendbaseUrl } from "../../utils/constants.utils";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";

function ProductDetail() {
  const images = [2, 4, 6, 8, 1];
  const router = useRouter();
  const { id, ref } = router.query;
  const { isUserAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_product_${id}`,
    async () => {
      return await fetchSingleProduct(id);
    }
  );

  const { data: related } = useQuery(`fetch_products`, async () => {
    return await fetchProducts({ page: 1, limit: 5 });
  });
  const product = data?.data?.data;

  useEffect(() => {
    localStorage.setItem("cartProduct", id);
  }, [id]);
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
                <li className="breadcrumb-item">
                  <a href="#">Electronics</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product?.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-white mb-4">
        <div className="container py-4">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="ratio ratio-1x1">
                    <img
                      className="rounded"
                      src={product?.image}
                      // src={`https://source.unsplash.com/random/300x300?random=${Math.floor(
                      //   Math.random() * 50
                      // )}`}
                      width={300}
                      height={300}
                      alt="Product image."
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3 d-none d-lg-block">
                <div className="col-12 d-flex justify-content-center">
                  {images.map((e) => {
                    return (
                      <div
                        key={e}
                        style={{ width: 60 }}
                        className="me-2 ratio ratio-1x1"
                      >
                        <img
                          className="rounded"
                          src={`https://source.unsplash.com/random/80x80?random=${Math.floor(
                            Math.random() * 50
                          )}`}
                          width={60}
                          height={60}
                          alt="Product image."
                          key={e}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="d-flex">
                <div className="d-inline h2 mb-0 fw-semibold me-3">
                  {product?.title}
                </div>
                <div className="ms-auto">
                  <button
                    className="btn btn-outline-secondary text-primary border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add to wish list"
                  >
                    <FontAwesomeIcon icon={["far", "heart"]} size="lg" />
                  </button>
                </div>
              </div>

              <div className="vstack">
                <div className="d-flex mb-3 gap-2">
                  <ProductRating />
                  <span className="text-muted small">150 orders</span>
                  <span className="text-success small">
                    <FontAwesomeIcon icon={["fas", "check-circle"]} />
                    &nbsp;In Stock
                  </span>
                </div>
                <h4 className="fw-semibold">
                  &#8358;{product?.price?.toFixed(2)}
                </h4>
                <p className="fw-light">{product?.summary}</p>
                <dl className="row mb-0">
                  <dt className="col-sm-3 fw-semibold">Code#</dt>
                  <dd className="col-sm-9">10001</dd>
                  <dt className="col-sm-3 fw-semibold">Category</dt>
                  <dd className="col-sm-9">Electronics</dd>
                  <dt className="col-sm-3 fw-semibold">Location</dt>
                  <dd className="col-sm-9">Yangon, Mandalay</dd>
                </dl>
                <hr className="text-muted" />

                <div className="d-flex">
                  <Link
                    href={`/shopping-cart?product=${id}&ref=${ref}`}
                    className="btn btn-primary px-md-4 col col-md-auto me-2"
                  >
                    Buy now
                  </Link>
                  <CopyToClipboard
                    text={`${frontendbaseUrl}product/${id}?ref=${user?._id}`}
                    onCopy={() => {
                      toast.success("Link copied");
                    }}
                  >
                    <button className="btn btn-outline-primary col col-md-auto">
                      <FontAwesomeIcon icon={["fas", "share"]} />
                      &nbsp;Copy Affiliate Link
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div
                className="px-3 d-flex border-bottom overflow-auto"
                style={{ height: 70 }}
              >
                <ul className="nav nav-pills my-auto flex-nowrap">
                  <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="true">
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Specifications
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <p>{product?.description}</p>
              </div>
              <div className="card-footer py-3">
                <small>
                  <FontAwesomeIcon
                    icon={["fas", "truck"]}
                    className="text-success me-2"
                  />
                  Delivery within 1-2 weeks
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="px-3 d-flex border-bottom" style={{ height: 70 }}>
                <h5 className="my-auto fw-semibold">Related products</h5>
              </div>
              <div className="card-body">
                {related?.data?.data &&
                  related?.data?.data?.docs &&
                  Array.isArray(related?.data?.data?.docs) &&
                  related?.data?.data?.docs?.map((product) => (
                    <ProductSimpleHorizontal
                      id={product._id}
                      key={product._id}
                      product={product}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductDetail;
