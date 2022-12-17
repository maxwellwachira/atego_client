import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/router";

import { urls } from "../../../constants/urls";

export const usePasswordReset = () => {

    const [response, setResponse] = useState('');
    const router = useRouter();
   
    const { id, token } = router.query;

    const initialValues =  {
        password: '',
        confirmPassword: ''
    };

    const form = useForm({
        initialValues,
        validate: {
            password: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null ),
            confirmPassword: (value, values) => ( value === values.password ? null : 'Passwords did not match'),
        },
    });


    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){

            const resetData = {
                token,
                UserId: Number(id),
                password: form.values.password
            };

            console.log(resetData);

            try {
                const { data } = await axios.post(`${urls.baseUrl}/auth/password-reset`, resetData);
                if(data.message === "success"){
                    form.setValues(initialValues);
                    setResponse(data.message);
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
