import { useCart } from "../context/CartContext";

function Cart() {
  const { items, subtotal, removeFromCart, clearCart } = useCart();

  const hasItems = items.length > 0;

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Sepetim</h2>
            <p className="text-secondary mb-0">
              Ürünleri düzenle ve siparişine hazırlan.
            </p>
          </div>
          {hasItems ? (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={clearCart}
            >
              Sepeti Temizle
            </button>
          ) : null}
        </div>

        {!hasItems ? (
          <div className="alert alert-info" role="alert">
            Sepetinde ürün bulunmuyor. Ürünleri incelemek için ürünler sayfasına
            göz at.
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <ul className="list-group shadow-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex align-items-center justify-content-between gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded object-fit-cover"
                        loading="lazy"
                      />
                      <div>
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="mb-0 text-secondary small">
                          Adet: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-semibold">
                        {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                      </p>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Çıkar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Sipariş Özeti</h5>
                  <div className="d-flex justify-content-between">
                    <span>Ürün Toplamı</span>
                    <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <div className="d-flex justify-content-between text-secondary small mt-2">
                    <span>Kargo</span>
                    <span>Ücretsiz</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Genel Toplam</span>
                    <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <button type="button" className="btn btn-primary w-100 mt-3">
                    Satın Al (Demo)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
