function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center small">
        <p className="mb-1 fw-semibold">My Store</p>
        <p className="mb-0 text-secondary">
          © {new Date().getFullYear()} My Store. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
