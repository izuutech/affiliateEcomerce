import Link from "next/link";
import Layout from "../../components/layout";
import { useState } from "react";
import { toast } from "react-toastify";
import { signup } from "../../endpoints/user";
import { useRouter } from "next/router";

const states = ["Imo", "Abia", "Enugu"];

function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: states[0],
    password: "",
    confirmPassword: "",
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
    if (
      form.password &&
      form.confirmPassword &&
      form.confirmPassword === form.password
    ) {
      const [registered, registeredErr] = await signup(form);
      if (registered) {
        toast.success(registered.message);
        setTimeout(() => {
          router.push({ pathname: "/auth/login" });
        }, 2000);
      } else {
        toast.error(registeredErr);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };
  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>
              <form className="row g-3" method="post" onSubmit={submit}>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={onChange}
                    value={form.firstName}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={onChange}
                    value={form.lastName}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={onChange}
                    value={form.email}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    onChange={onChange}
                    value={form.phoneNumber}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <select
                    className="form-select"
                    name="state"
                    onChange={onChange}
                  >
                    {states.map((e, i) => {
                      return <option key={i}>{e}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={onChange}
                    value={form.password}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    onChange={onChange}
                    value={form.confirmPassword}
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary w-100">Register</button>
                </div>
                <div className="col-md-12">
                  <div className="text-muted bg-light rounded p-3 border small">
                    By clicking the &lsquo;Sign Up&lsquo; button, you confirm
                    that you accept our{" "}
                    <a href="#">Terms of use and Privacy Policy</a>.
                  </div>
                </div>
              </form>
              <hr className="text-muted" />
              <div className="text-center">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-decoration-none fw-medium"
                >
                  {/* <a className="text-decoration-none fw-medium"> */}
                  Login
                  {/* </a> */}
                </Link>
              </div>
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

SignUp.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default SignUp;
