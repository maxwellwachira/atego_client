import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";

export const useForgetPassword = () => {
    const [response, setResponse] = useState('');

    const initialValues =  {
        email: '',
    }

    const form = useForm({
        initialValues,
        validate: {
            email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            try {
                const { data } = await axios.post(`${urls.baseUrl}/auth/forgot-password`, form.values);
                if(data.message === "success"){
                    setResponse(data.message);
                    form.setValues(initialValues);
                }
            } catch (error: any) {
                console.log(error);
                setResponse(error.response.data.message);
            }
        }
    }


    const clearResponse = () => {
        setResponse('');
    }

    return { response, form, handleSubmit, clearResponse };

}