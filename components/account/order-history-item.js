import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

function OrderHistoryItem({ order, id, cancel }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header py-3 bg-white">
        <div className="row">
          <div className="col d-flex">
            <span className="fw-semibold h5 my-auto">Order ID: {id}</span>
          </div>
          <div className="col-auto">
            {/* <button className="btn btn-sm btn-outline-primary">
              View Detail
            </button> */}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row gx-2 gy-3">
          <div className="col-md-5">
            <h6 className="fw-bold">Shipping Address</h6>
            <div className="vstack text-dark small">
              <span>{`${user.lastName} ${user.firstName}`}</span>
              <span>{user.address}</span>
              <span>{user.state}</span>
              <span>Tel: {user.phoneNumber}</span>
              <span>Email: {user.email}</span>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Payment Method</h6>
            <div className="text-success">
              {cancel ? (
                <>
                  <span className="fw-bold">
                    <FontAwesomeIcon
                      icon={["fas", "money-bill-wave"]}
                      size="lg"
                    />
                  </span>
                  <span className="ms-2 small">Cash on delivery</span>
                </>
              ) : (
                <>
                  <span className="fw-bold">
                    <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
                  </span>
                  <span className="ms-2 small">XXXX-XXXX-XXXX-2345</span>
                </>
              )}
            </div>
            <div>Subtotal: &#8358;{order.product.price.toFixed(2)}</div>
            <div>Delivery fee: &#8358;0</div>
            <div className="fw-semibold">
              Total: &#8358;{order.product.price.toFixed(2)}
            </div>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Status</h6>
            <div
              className={
                order.status === "failed"
                  ? "text-danger"
                  : order?.status === "success"
                  ? "text-success"
                  : "text-warning"
              }
            >
              <span className="fw-semibold">
                {order.status === "failed"
                  ? "CANCELLED"
                  : order?.status === "success"
                  ? "DELIVERED"
                  : "PENDING"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer small border-0 py-3 text-muted">
        Order Date: {new Date().toDateString()}
      </div>
    </div>
  );
}

export default OrderHistoryItem;
