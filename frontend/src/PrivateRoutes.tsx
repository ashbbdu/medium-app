import { Navigate } from 'react-router-dom';
import Appbar from './components/Appbar';

const PrivateRoutes = ({children} : any) => {
    const token = localStorage.getItem("token");
    if(token !== null) {
        return <>
            <Appbar/>
            {children}
        </>
    } else {
        return <Navigate to="/" />
    }
}

export default PrivateRoutes