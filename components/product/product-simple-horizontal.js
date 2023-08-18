import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

function ProductSimpleHorizontal({ product, id }) {
  const router = useRouter();
  return (
    <div className="d-flex py-2">
      <div className="flex-shink-0" style={{ height: 80 }}>
        <img
          className="rounded"
          src={product?.image}
          // src={`https://source.unsplash.com/random/100x100?random=${Math.floor(
          //   Math.random() * 50
          // )}`}
          width={80}
          height={80}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-column flex-grow-1 ms-3">
        <Link href="/product/1" className="text-dark text-decoration-none">
          {/* <a className="text-dark text-decoration-none"> */}
          {product?.title}
          {/* </a> */}
        </Link>
        <h6 className="mb-0 fw-semibold">
          &#8358;{product?.price?.toFixed(2)}
        </h6>
        <div className="mt-auto">
          <button
            className="btn btn-sm btn-secondary text-primary rounded-3"
            onClick={() => router.push(`/product/${product?._id}`)}
          >
            <FontAwesomeIcon icon={("fas", "cart-plus")} />
            &nbsp;Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSimpleHorizontal;
