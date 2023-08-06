import { useRouter } from "next/router";
import Link from "next/link";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import ReviewCartItem from "../../components/checkout/review-cart-item";
import Layout from "../../components/layout";
import PricingCard from "../../components/shopping-cart/pricing-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { fetchSingleProduct, purchaseProduct } from "../../endpoints/products";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

function ConfirmCheckout() {
  const router = useRouter();
  const { ref, qty, product } = router.query;
  const { isUserAuthenticated, authState } = useContext(AuthContext);
  const user = authState?.user;
  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_product_${product}`,
    async () => {
      return await fetchSingleProduct(product);
    }
  );

  const purchase_product = async () => {
    console.log(product, ref);
    const [purchased, purchasedErr] = await purchaseProduct(product, ref, qty);
    if (purchased) {
      toast.success(purchased.message);
      router.push({
        pathname: `/checkout/checkout-success?product=${product}&ref=${ref}`,
      });
    } else {
      toast.error(purchasedErr);
    }
  };
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <CheckoutStepper step={3} />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">Items in cart</h4>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                <div className="col">
                  <ReviewCartItem product={data?.data?.data} />
                </div>
                {/* <div className="col">
                  <ReviewCartItem />
                </div>
                <div className="col">
                  <ReviewCartItem />
                </div> */}
              </div>
              <hr className="text-muted" />
              <div className="row g-3">
                <div className="col-md-6">
                  <h4 className="fw-semibold">Shipping Address</h4>
                  <div className="vstack text-dark small">
                    <span>{`${user.lastName} ${user.firstName}`}</span>
                    <span>{user.address}</span>
                    <span>{user.state}</span>
                    <span>Tel: {user.phoneNumber}</span>
                    <span>Email: {user.email}</span>
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <h4 className="fw-semibold">Payment Method</h4>
                  <div className="d-flex gap-3 text-success">
                    <span className="fw-bold">
                      <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
                    </span>
                    <div className="vstack small text-muted">
                      <span>XXXX-XXXX-XXXX-2345</span>
                      <span>Exp: 03/25</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <PricingCard pricingOnly product={data?.data?.data}>
            <div className="mt-3 d-grid gap-2">
              <button className="btn btn-primary" onClick={purchase_product}>
                Confirm
              </button>
              <Link
                href={`/checkout/payment-info?product=${product}&ref=${ref}&qty=${qty}`}
                className="btn btn-outline-primary"
              >
                {/* <a className="btn btn-outline-primary"> */}
                Return
                {/* </a> */}
              </Link>
            </div>
          </PricingCard>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

ConfirmCheckout.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default ConfirmCheckout;
