import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

export const useAddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const { toggleRefreshData } = useRefreshContext();
    
    const form = useForm({
        initialValues: {
            categoryName: ''
        },
        validate: {
            categoryName: (value) => (!value ? 'Category Name cannot be empty' : null)
        }
    });


    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            try {
                const { data } = await axios.post(`${urls.baseUrl}/category`, form.values);
                if(data.message === 'success') {
                    form.setFieldValue('categoryName', '');
                    setResponse(data.message);
                    toggleRefreshData();
                    setLoading(false);
                    setTimeout(() => {setResponse('')}, 5000);
                }
            } catch (error: any) {
                console.log(error);
                setResponse(error.response.data.message);
                setLoading(false);
            }
        }
    }

    return { form, loading, response, setResponse, handleSubmit };
}

