import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout";
import { useState } from "react";
import { signin } from "../../endpoints/user";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.password && form.email) {
      const [loggedin, loggedinErr] = await signin(form);
      if (loggedin) {
        toast.success(loggedin.message);
        localStorage.setItem("token", loggedin.data.userToken);
        setTimeout(() => {
          router.push({ pathname: "/account/profile" });
        }, 2000);
      } else {
        toast.error(loggedinErr);
      }
    } else {
      toast.error("Email and password is required");
    }
  };
  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>
              <form className="row g-2" onSubmit={submit} method="post">
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@domain.com"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <Link
                    href="/auth/forgot-password"
                    className="text-decoration-none"
                  >
                    {/* <a className="text-decoration-none"> */}
                    Forgot password?
                    {/* </a> */}
                  </Link>
                </div>
                <div className="col-md-12 mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </div>
                {/* <div className="col-md-12">
                  <div className="row g-2">
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                    <div className="col-auto align-self-center text-muted">
                      or continue with
                    </div>
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-md-12">
                  <div className="hstack gap-2 justify-content-center">
                    <button className="btn-facebook rounded-circle">
                      <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </button>
                    <button className="btn-google rounded-circle">
                      <FontAwesomeIcon icon={["fab", "google"]} />
                    </button>
                    <button className="btn-apple rounded-circle">
                      <FontAwesomeIcon icon={["fab", "apple"]} />
                    </button>
                  </div>
                </div> */}
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              Don&lsquo;t hanve an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-decoration-none fw-medium"
              >
                {/* <a className="text-decoration-none fw-medium"> */}
                Register
                {/* </a> */}
              </Link>
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

Login.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default Login;
