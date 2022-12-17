import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { urls } from "../../../constants/urls";

export const useActivateUser = () => {
    const [response, setResponse] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const router = useRouter();
    const { id, token } = router.query;
    const tokenData = {
        token,
        UserId: id
    };

    const activate = async() => {
        try {
            const { data } = await axios.post(`${urls.baseUrl}/auth/activate`, tokenData);
            if(data.message === 'success') {
                setResponse(data.message);
                setTimeout (() => {
                    router.push('/auth/login');
                }, 5500);
            }
        } catch (error: any) {
            console.log(error)
            setResponse(error.response?.data?.message);
        }
    }

    const resendActivation = async() => {
        try {
            const { data } = await axios.post(`${urls.baseUrl}/auth/resend-activation-token`, tokenData);
            if(data.message === 'success') {
                setResponse(data.message);
            }
        } catch (error: any) {
            console.log(error)
            setResponse(error.response?.data?.message);
        }
    }

    const onClick = () => {
        resendActivation();
        setButtonClicked(true);
    }
    
    useEffect(() => {
        setTimeout(() => {}, 3000);
        activate();
    }, []);

    return { buttonClicked, response, onClick };
}