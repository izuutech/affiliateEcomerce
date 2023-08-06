import Link from "next/link";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import PricingCard from "../../components/shopping-cart/pricing-card";
import Layout from "../../components/layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useRouter } from "next/router";
import { fetchSingleProduct } from "../../endpoints/products";
import { useQuery } from "react-query";

function DeliveryInfo() {
  const router = useRouter();
  const { ref, qty, product } = router.query;
  const { isUserAuthenticated, authState } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_product_${product}`,
    async () => {
      return await fetchSingleProduct(product);
    }
  );
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <CheckoutStepper />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <form className="row g-3">
                <h4 className="fw-semibold mb-0">Contact Info</h4>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={authState.user.firstName}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={authState.user.lastName}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    <input
                      type="tel"
                      className="form-control"
                      disabled
                      value={authState.user.phoneNumber}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@domain.com"
                    disabled
                    value={authState.user.email}
                  />
                </div>

                <div className="col-md-12">
                  <hr className="text-muted mb-0" />
                </div>

                <h4 className="fw-semibold mb-0">Shipping Info</h4>
                <div className="col-md-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={authState.user.address}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={authState.user.state}
                  />
                </div>

                {/* <div className="col-md-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">
                      Save this address
                    </label>
                  </div>
                </div> */}

                <div className="col-md-12 mt-4">
                  <div className="d-grid gap-2 d-flex justify-content-end">
                    <Link href="/" className="btn btn-outline-primary">
                      {/* <a className="btn btn-outline-primary"> */}
                      Cancel
                      {/* </a> */}
                    </Link>
                    <Link
                      href={`/checkout/payment-info?product=${product}&ref=${ref}&qty=${qty}`}
                      className="btn btn-primary"
                    >
                      {/* <a className="btn btn-primary"> */}
                      Continue
                      {/* </a> */}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <PricingCard pricingOnly product={data?.data?.data} />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

DeliveryInfo.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default DeliveryInfo;
