import { useRouter } from "next/router";
import AccountMenu from "../../components/account-menu";
import CurrentOrderCard from "../../components/account/current-order-card";
import Layout from "../../components/layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { fetchOrders } from "../../endpoints/orders";
import { useQuery } from "react-query";

function CurrentOrders() {
  const router = useRouter();
  const { isUserAuthenticated, authState } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
  }, []);

  const { isLoading, data, refetch, isRefetching, isFetching } = useQuery(
    `fetch_orders`,
    async () => {
      return await fetchOrders(current);
    }
  );

  console.log(data?.data?.data);
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
                  Current Orders
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="current-orders" />
          </div>
          <div className="col-lg-9">
            {data?.data?.data &&
              Array.isArray(data?.data?.data) &&
              data?.data?.data.map((order) => (
                <CurrentOrderCard id={order._id.substring(5)} order={order} />
              ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

CurrentOrders.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth={true}>
      {page}
    </Layout>
  );
};

export default CurrentOrders;
