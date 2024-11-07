import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = ({ children }) => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }, [pathname]);

    return children; // Render children
};

export default ScrollTop;
