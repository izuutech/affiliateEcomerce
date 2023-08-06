import Link from "next/link";

function ReviewCartItem({ product, id }) {
  return (
    <div className="d-flex">
      <div className="flex-shink-0">
        <img
          className="rounded"
          src={`https://source.unsplash.com/random/80x80?random=${Math.floor(
            Math.random() * 50
          )}`}
          width={80}
          height={80}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-grow-1 ms-3 h-100">
        <div className="vstack">
          <Link href="/product/1" className="text-dark text-decoration-none">
            {/* <a className="text-dark text-decoration-none">  */}
            {product?.title}
            {/* </a> */}
          </Link>
          <small className="text-muted mb-2" style={{ fontSize: 12 }}>
            <span>Qty</span>
            :&nbsp;
            <span>1</span>
          </small>
          <h6 className="mb-0">&#8358;{product?.price?.toFixed(2)}</h6>
        </div>
      </div>
    </div>
  );
}

export default ReviewCartItem;
