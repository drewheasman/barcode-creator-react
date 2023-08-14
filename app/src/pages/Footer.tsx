import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>
          &copy; {new Date().getFullYear()} Create Barcodes. All rights
          reserved.
        </p>
        <p>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
