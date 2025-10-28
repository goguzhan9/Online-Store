import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

test("renders navbar brand link", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
  const brandLink = screen.getByRole("link", { name: /my store/i });
  expect(brandLink).toBeInTheDocument();
});
