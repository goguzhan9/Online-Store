import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname ?? "/products";

  const validate = () => {
    const validationErrors = {};

    if (!form.email.trim()) {
      validationErrors.email = "E-posta zorunludur.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      validationErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!form.password.trim()) {
      validationErrors.password = "Şifre zorunludur.";
    } else if (form.password.length < 6) {
      validationErrors.password = "Şifre en az 6 karakter olmalıdır.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await loginRequest(form);
      login(response.token);
      setFeedback("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => navigate(from, { replace: true }), 600);
    } catch (error) {
      console.error("Login error", error);
      setFeedback("Giriş başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-3 text-center">Giriş Yap</h2>
                <p className="text-secondary text-center mb-4">
                  Hesabına giriş yap ve sepetini yönet.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="ornek@mail.com"
                      value={form.email}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                    />
                    {errors.email ? (
                      <div className="invalid-feedback">{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="********"
                      value={form.password}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                    />
                    {errors.password ? (
                      <div className="invalid-feedback">{errors.password}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Giriş Yap"}
                  </button>
                </form>

                {feedback ? (
                  <div className="alert alert-info mt-4 mb-0" role="alert">
                    {feedback}
                  </div>
                ) : null}

                <p className="text-center mt-4 mb-0">
                  Hesabın yok mu?{" "}
                  <Link to="/signup" className="link-primary">
                    Hemen kaydol.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
