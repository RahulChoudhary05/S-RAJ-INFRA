import AnimatedFooter from "../common/Footer";
import NavBar from "../common/NavBar";

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className="main-content min-h-screen pt-20"> {/* Adjust padding to avoid overlap */}
                {children}
            </div>
            <AnimatedFooter />
        </div>
    );
}

export default Layout;
