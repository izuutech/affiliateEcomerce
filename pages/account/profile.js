import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountMenu from "../../components/account-menu";
import AddressView from "../../components/account/address-view";
import Layout from "../../components/layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const { isUserAuthenticated, authState } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated() ? null : router.push("/auth/login");
  }, []);
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
                  My Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="profile" />
          </div>

          <div className="col-lg-9">
            <div className="col-lg-9 card border-0 shadow-sm">
              <div className="p-3 d-flex border-bottom">
                <h5 className="my-auto fw-semibold">Wallet Balance</h5>
              </div>
              <div className="card-body">
                <div className="row row-cols-1 row-cols-lg-2 g-3">
                  <div className="col">
                    <h5 className="my-auto fw-semibold">
                      &#8358; {authState.user.balance.toFixed(2)}
                    </h5>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary">Fund With Card</button>
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary">Withdraw All</button>
                </div>
              </div>
            </div>
            <br />
            <div className="row g-3">
              <div className="col-lg-9">
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title fw-semibold mt-2 mb-3">
                      Profile
                    </h4>
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={`${authState.user.lastName} ${authState.user.firstName}`}
                        />
                      </div>

                      <div className="col-md-12 mt-0">
                        <label className="form-label">Phone</label>
                        <div className="input-group">
                          <input
                            type="tel"
                            className="form-control"
                            disabled
                            value={authState.user.phoneNumber}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          disabled
                          value={authState.user.email}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Shipping Address</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={authState.user.address}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={authState.user.state}
                        />
                      </div>
                      {/* <div className="col-md-12 mt-4">
                        <button className="btn btn-primary float-end">
                          Update
                        </button>
                      </div> */}
                    </form>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="p-3 d-flex border-bottom">
                    <h5 className="my-auto fw-semibold">Addresses</h5>
                    {/* <button className="btn btn-sm btn-secondary text-primary ms-auto">
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                      &nbsp;Add new
                    </button> */}
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-lg-2 g-3">
                      <div className="col">
                        <AddressView address={authState.user.address} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

Profile.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth={true}>
      {page}
    </Layout>
  );
};

export default Profile;
