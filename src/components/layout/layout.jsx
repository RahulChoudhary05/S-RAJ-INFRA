import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className="main-content min-h-screen pt-10"> {/* Adjust padding to avoid overlap */}
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
