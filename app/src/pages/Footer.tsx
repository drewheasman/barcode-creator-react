import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Navbar className="bg-success py-3 text-center" fixed="bottom">
      <div className="mx-auto">
        <Navbar.Text>
          &copy; {new Date().getFullYear()} Create Barcodes. All rights
          reserved.
          <br />
          <Nav.Link href="/privacy-policy">Privacy Policy</Nav.Link>
        </Navbar.Text>
      </div>
    </Navbar>
  );
}
