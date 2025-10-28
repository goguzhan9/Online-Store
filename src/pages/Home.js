import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold">
              Favori ürünlerini keşfet, My Store ile alışverişe başla.
            </h1>
            <p className="lead text-secondary mt-3">
              Modern teknolojik ürünleri uygun fiyatlarla sunan mağazamızda,
              sepete ekle ve kolayca yönet.
            </p>
            <div className="d-flex gap-3 mt-4">
              <Link to="/products" className="btn btn-primary btn-lg">
                Ürünlere Git
              </Link>
              <Link to="/signup" className="btn btn-outline-primary btn-lg">
                Hemen Kaydol
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img
              src="https://picsum.photos/seed/storefront/640/420"
              alt="Mağaza vitrin görseli"
              className="img-fluid rounded shadow"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
