import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm product-card">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top object-fit-cover"
        height={220}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{product.name}</h5>
        <p className="card-text text-secondary flex-grow-1">
          {product.description}
        </p>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <span className="price-tag fw-bold">{product.price.toLocaleString("tr-TR")} ₺</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
