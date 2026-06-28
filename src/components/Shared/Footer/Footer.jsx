import { Link } from "react-router";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaStripe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8 md:py-12">
      <Container>
        <div className="footer sm:footer-horizontal text-white">
          <aside>
            <Logo logoFooter={true} />
            <p>Book bus, train, launch & flight tickets easily</p>
          </aside>
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <Link
              className="hover:underline duration-300 transition-all ease-in-out"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:underline duration-300 transition-all ease-in-out"
              to="/"
            >
              All Tickets
            </Link>
            <Link
              className="hover:underline duration-300 transition-all ease-in-out"
              to="/"
            >
              Contact Us
            </Link>
            <Link
              className="hover:underline duration-300 transition-all ease-in-out"
              to="/"
            >
              About
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title"> Contact Info</h6>
            <a href="mailto:ticketbari@gmail.com" className="link link-hover">
              ticketbari@gmail.com
            </a>
            <a href="tel:+0080123456789" className="link link-hover">
              +008 0123456789
            </a>
            <div>
              <Link to="https://www.facebook.com/" className="">
                {/* <FaFacebookSquare className="w-6 h-6" /> */}
                <FaFacebookF className="w-6 h-6 p-1 bg-white text-blue-600 rounded-md" />
              </Link>
            </div>
          </nav>
          <nav>
            <h6 className="footer-title">Payment Methods</h6>
            <Link className="">
              <FaStripe className="w-10 h-auto bg-[#635bff] text-white px-1 rounded-md" />
            </Link>
          </nav>
        </div>
        <div className="text-white text-center mt-8">
          <p className="text-sm">
            © 2025{" "}
            <Link to="/" className="link link-hover">
              TicketGhor
            </Link>
            . All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
