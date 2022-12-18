import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

interface CategoryData {
    id: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
};

export const useEditCategory = (id: string, type: string) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

    const { toggleRefreshData } = useRefreshContext();
    
    const form = useForm({
        initialValues: {
            categoryName: ''
        },
        validate: {
            categoryName: (value) => (!value ? 'Category Name cannot be empty' : null)
        }
    });

    const getInitialValues = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category/${id}`);
            setCategoryData(data);
            form.setFieldValue('categoryName', data.categoryName);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            try {
                const { data } = await axios.put(`${urls.baseUrl}/category/${id}`, form.values);
                if(data.message === 'success') {
                    if(categoryData) form.setFieldValue('categoryName', categoryData?.categoryName);
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
    

    useEffect(() => {
        if (type === "category") getInitialValues(); 
    }, [response]);

    return { form, loading, response, setResponse, handleSubmit };
}

