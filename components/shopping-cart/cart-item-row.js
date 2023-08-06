import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function CartItemRow({ product }) {
  const [quantity, setQuantity] = useState(1);
  const getQtyInput = () => {
    return (
      <div className="input-group input-group-sm" style={{ width: 100 }}>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={
            quantity > 1 ? () => setQuantity((prev) => (prev -= 1)) : null
          }
        >
          <FontAwesomeIcon icon={["fas", "minus"]} />
        </button>
        <input
          type="text"
          className="form-control text-center border-primary"
          placeholder=""
          value={quantity}
          size="2"
          min={1}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => setQuantity((prev) => (prev += 1))}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
      </div>
    );
  };

  return (
    <tr>
      <td scope="row">
        <div className="hstack">
          <img
            className="rounded"
            src={`https://source.unsplash.com/random/100x100?random=${Math.floor(
              Math.random() * 50
            )}`}
            width={80}
            height={80}
            alt="Product image."
            style={{ objectFit: "cover" }}
          />
          <div className="ms-3">
            <span className="h5">
              <Link
                href="/product/1"
                className="link-dark text-decoration-none"
              >
                {/* <a className="link-dark text-decoration-none"> */}
                {product?.title}
                {/* </a> */}
              </Link>
            </span>
            {/* <small className="d-flex text-muted" style={{ fontSize: 12 }}>
              <span>Medium</span>
              ,&nbsp;
              <span>White</span>
            </small> */}
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0">&#8358;{product?.price?.toFixed(2)}</h6>
      </td>
      <td>
        <div className="d-flex">
          <div>{getQtyInput()}</div>
        </div>
      </td>
      <td>
        {/* <button className="btn btn-sm btn-danger" type="button">
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </button> */}
      </td>
    </tr>
  );
}

export default CartItemRow;
