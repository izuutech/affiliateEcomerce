import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewCartItem from "../checkout/review-cart-item";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { changeOrderStatus } from "../../endpoints/orders";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CurrentOrderCard({ order, id }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const changeStatus = async (status) => {
    const [changed, changedErr] = await changeOrderStatus(order?._id, status);
    if (changed) {
      toast.success(changed.message);
      setTimeout(() => {
        router.reload();
      }, 2000);
    } else {
      toast.error(changedErr);
    }
  };
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header py-3 bg-white">
        <div className="row">
          <div className="col d-flex">
            <span className="fw-semibold h5 my-auto">Order ID: {id}</span>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => changeStatus("success")}
            >
              Mark as delivered
            </button>
          </div>
          {/* <div className="col-auto">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => changeStatus("failed")}
            >
              Cancel order
            </button>
          </div> */}
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
              <span className="fw-bold">
                <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
              </span>
              <span className="ms-2 small">XXXX-XXXX-XXXX-2345</span>
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
                order.status === "pending"
                  ? "text-warning"
                  : order.status === "success"
                  ? "text-success"
                  : "text-danger"
              }
            >
              <span className="fw-semibold">
                {order.status === "pending"
                  ? "PROCESSING"
                  : order.status === "success"
                  ? "Delivered"
                  : "Failed"}
              </span>
            </div>
          </div>
        </div>

        <hr className="text-muted" />

        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <ReviewCartItem product={order?.product} />
          </div>
          {/* <div className="col">
            <ReviewCartItem />
          </div>
          <div className="col">
            <ReviewCartItem />
          </div> */}
        </div>
      </div>
      <div className="card-footer small border-0 py-3 text-muted">
        Order Date: {new Date(order?.createdAt).toDateString()}
      </div>
    </div>
  );
}

export default CurrentOrderCard;
