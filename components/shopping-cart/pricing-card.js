import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function PricingCard({
  product,
  quantity,
  data,
  pricingOnly,
  children,
  affiliate,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>&#8358;{product?.price?.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount:</span>
            <span className="text-danger">-</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery charge:</span>
            <span className="text-success">&#8358;{0}</span>
          </div>

          <hr className="text-muted" />

          <div className="d-flex justify-content-between">
            <span className="h5">Total:</span>
            <span className="fw-bold h5 mb-0">
              &#8358;{product?.price?.toFixed(2)}
            </span>
          </div>

          {!pricingOnly && (
            <div className="d-grid gap-2 mt-2">
              <Link
                href={`/checkout/delivery-info?product=${product?._id}&ref=${affiliate}&qty=${quantity}`}
                className="btn btn-primary"
              >
                {/* <a className="btn btn-primary"> */}
                Checkout
                {/* </a> */}
              </Link>
              {/* <Link href="/" className="btn btn-outline-primary"> */}
              {/* <a className="btn btn-outline-primary"> */}
              {/* Continue Shopping */}
              {/* </a> */}
              {/* </Link> */}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
