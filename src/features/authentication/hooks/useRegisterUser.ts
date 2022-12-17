import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";

export const useRegisterUser = () => {
    const [response, setResponse ] = useState('');
    const [loading, setLoading] = useState(false);
    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        terms: true,
      }

    const form = useForm({
        initialValues,
        validate: {
          email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
          password: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null ),
        },
        validateInputOnBlur: true,
    });


    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            try {
                const { data } = await axios.post(`${urls.baseUrl}/user`, form.values);
                if(data.message === 'success') {
                    form.setValues(initialValues);
                    setResponse(data.message);
                    setLoading(false);
                }
            } catch (error: any) {
                console.log(error);
                setLoading(false);
                setResponse(error.response.data.message);
               
            }
        }
    }

    const clearResponse = () => {
        setResponse('');
    }

    return {form, response,loading, handleSubmit, clearResponse};
}