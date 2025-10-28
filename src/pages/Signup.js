import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup as signupRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = "Ad soyad zorunludur.";
    }

    if (!form.email.trim()) {
      validationErrors.email = "E-posta zorunludur.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      validationErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!form.password.trim()) {
      validationErrors.password = "Şifre zorunludur.";
    } else if (form.password.length < 8) {
      validationErrors.password = "Şifre en az 8 karakter olmalıdır.";
    }

    if (form.confirmPassword !== form.password) {
      validationErrors.confirmPassword = "Şifreler eşleşmiyor.";
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
      const response = await signupRequest({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      login(response.token);
      setFeedback("Kayıt başarılı! Giriş yapıldı, ürünlere yönlendiriliyorsunuz.");
      setTimeout(() => navigate("/products", { replace: true }), 600);
    } catch (error) {
      console.error("Signup error", error);
      setFeedback("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
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
                <h2 className="fw-bold mb-3 text-center">Hesap Oluştur</h2>
                <p className="text-secondary text-center mb-4">
                  Yeni hesabını oluştur ve mağazamıza katıl.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Örnek Kullanıcı"
                      value={form.name}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                    {errors.name ? (
                      <div className="invalid-feedback">{errors.name}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
                    <label htmlFor="signup-password" className="form-label">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="signup-password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
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

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Şifre (Tekrar)
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="********"
                      value={form.confirmPassword}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          confirmPassword: event.target.value,
                        }))
                      }
                    />
                    {errors.confirmPassword ? (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Kaydol"}
                  </button>
                </form>

                {feedback ? (
                  <div className="alert alert-info mt-4 mb-0" role="alert">
                    {feedback}
                  </div>
                ) : null}

                <p className="text-center mt-4 mb-0">
                  Zaten hesabın var mı?{" "}
                  <Link to="/login" className="link-primary">
                    Hemen giriş yap.
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

export default Signup;
