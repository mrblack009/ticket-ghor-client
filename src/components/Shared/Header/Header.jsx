import { motion, AnimatePresence } from "framer-motion";
import useSticky from "../../../hooks/useSticky";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const isSticky = useSticky(80);
  return (
    <>
      <header className="bg-base-200">
        <Container>
          <Navbar isSticky={false} />
        </Container>
      </header>

      <AnimatePresence>
        {isSticky && (
          <motion.nav
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.5, ease: "linear" }, //
            }}
            className="fixed top-0 left-0 w-full h-fit bg-white/80 backdrop-blur-md shadow-sm z-50"
          >
            <div className="w-full">
              <Container>
                <Navbar isSticky={true} />
              </Container>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
