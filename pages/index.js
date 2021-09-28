import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductSimpleCard from "../components/product/product-simple-card";

export default function Home() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <div className="container py-3">
        <div className="row mb-4">
          <div className="col-12">
            <div
              id="bannerIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  className="active"
                  aria-current="true"
                  data-bs-slide-to="0"
                  data-bs-target="#bannerIndicators"
                ></button>
                <button
                  data-bs-target="#bannerIndicators"
                  data-bs-slide-to="1"
                ></button>
                <button
                  data-bs-target="#bannerIndicators"
                  data-bs-slide-to="2"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="ratio ratio-21x9">
                    <img
                      src="/images/online-shopping.jpg"
                      alt="Cover image"
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="ratio ratio-21x9">
                    <img
                      src="/images/online-shopping.jpg"
                      alt="Cover image"
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="ratio ratio-21x9">
                    <img
                      src="/images/online-shopping.jpg"
                      alt="Cover image"
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "money-bill-alt"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Reasonable Price</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "headset"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Customer Support 24/7</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "truck"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Fast Delivery</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <h4 className="mb-3 fw-semibold">New products</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
          {list.map((e, i) => {
            return (
              <div className="col" key={i}>
                <ProductSimpleCard id={i} title={`Product ${i}`} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="d-flex flex-column align-items-center bg-primary py-5">
        <span className="mb-4 text-light text-opacity-75">
          Subscribe for promotions and wonderful events
        </span>
        <form className="d-flex">
          <div className="me-2">
            <input
              type="email"
              className="form-control"
              placeholder="Your email"
              size="24"
            />
          </div>
          <button className="btn btn-warning">
            <FontAwesomeIcon icon={["fas", "envelope"]} className="me-2" />
            Subscribe
          </button>
        </form>
      </div> */}
    </div>
  );
}
