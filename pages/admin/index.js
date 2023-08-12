import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth-context";
import { createProduct } from "../../endpoints/admin";

function UploadProduct() {
  const router = useRouter();
  const { isUserAnAdmin, authState } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    price: 0,
    referrerPercent: 0,
    summary: "",
    description: "",
    image: "https://sjs",
  });
  useEffect(() => {
    isUserAnAdmin() ? null : router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      form.title &&
      form.price &&
      form.referrerPercent &&
      form.summary &&
      form.description
    ) {
      const [created, createdErr] = await createProduct(form);
      if (created) {
        toast.success(created.message);
      } else {
        toast.error(createdErr);
      }
    } else {
      toast.error("All fields are required");
    }
  };
  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Create Product</h4>
              <form className="row g-2" onSubmit={submit} method="post">
                <div className="col-md-12">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nike Shoe"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={form.price}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Affiliate Percent</label>
                  <input
                    type="number"
                    className="form-control"
                    name="referrerPercent"
                    value={form.referrerPercent}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="summary"
                    value={form.summary}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Create
                  </button>
                </div>
              </form>
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

UploadProduct.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default UploadProduct;
