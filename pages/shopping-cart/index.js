import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItemRow from "../../components/shopping-cart/cart-item-row";
import PricingCard from "../../components/shopping-cart/pricing-card";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { fetchSingleProduct } from "../../endpoints/products";
import { useQuery } from "react-query";

function ShoppingCart() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(1);
  const { ref, product } = router.query;

  const { isUserAuthenticated, authState } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
    if (!product) {
      const theProductId = localStorage.getItem("cartProduct");
      if (theProductId) {
        setProductId(theProductId);
      }
    } else {
      setProductId(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_product_${productId}`,
    async () => {
      return await fetchSingleProduct(productId);
    }
  );

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="my-2">Shopping Cart</h5>
            </div>
            <div className="card-body p-2">
              {/* <CartItem />
              <hr className="text-muted my-1" />
              <CartItem />
              <hr className="text-muted my-1" />
              <CartItem /> */}
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  {/* <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col"></th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {data?.data?.data ? (
                      <CartItemRow
                        product={data?.data?.data}
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    ) : (
                      <div className="h5 px-3">No Item in cart</div>
                    )}
                    {/* <CartItemRow />
                    <CartItemRow /> */}
                  </tbody>
                </table>
              </div>
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
          {/* <div className="card mb-3 border-0 shadow-sm">
            <div className="card-body">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Coupon code here"
                />
                <button type="button" className="btn btn-primary">
                  Apply
                </button>
              </div>
            </div>
          </div> */}
          <PricingCard
            product={data?.data?.data}
            affiliate={ref}
            quantity={quantity}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default ShoppingCart;
