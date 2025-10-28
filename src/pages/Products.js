import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getProducts()
      .then((items) => {
        if (mounted) {
          setProducts(items);
        }
      })
      .catch((error) => {
        console.error("Products load error", error);
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Ürün Listesi</h2>
            <p className="text-secondary mb-0">
              En popüler ürünlerimizi keşfedin ve sepete ekleyin.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
