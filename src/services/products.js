import products from "../assets/products.json";

export function getProducts() {
  return Promise.resolve(products);
}
