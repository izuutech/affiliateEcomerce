import { useRouter } from "next/router";
import AccountMenu from "../../components/account-menu";
import OrderHistoryItem from "../../components/account/order-history-item";
import Layout from "../../components/layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { fetchOrders } from "../../endpoints/orders";
import { useQuery } from "react-query";

function OrderHistory() {
  const router = useRouter();
  const { isUserAuthenticated, authState } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_orders`,
    async () => {
      return await fetchOrders();
    }
  );
  return (
    <div>
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Order History
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="order-history" />
          </div>
          <div className="col-lg-9">
            {data?.data?.data &&
              Array.isArray(data?.data?.data) &&
              data?.data?.data.map((order) => (
                <OrderHistoryItem
                  id={order._id.substring(5)}
                  cancel={order.status === "success" ? false : true}
                  order={order}
                />
              ))}

            {/* <nav className="float-end mt-3">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Prev
                  </a>
                </li>
               
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav> */}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

OrderHistory.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default OrderHistory;
