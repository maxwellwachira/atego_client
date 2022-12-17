import { useEffect } from "react";
import { useAuthContext } from "../../features/authentication";

const Logout = () => {
    const { logout } = useAuthContext();

    useEffect(() => {
        logout();
    }, []);

    return (
        <>
        </>
    );
}

export default Logout;