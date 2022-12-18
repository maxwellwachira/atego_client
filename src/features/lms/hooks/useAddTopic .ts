import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

export const useAddTopic = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const { toggleRefreshData } = useRefreshContext();
    
    const form = useForm({
        initialValues: {
            topicName: ''
        },
        validate: {
            topicName: (value) => (!value ? 'Topic title cannot be empty' : null)
        }
    });

    const handleSubmit = async(courseId: number) => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);

            const formData = {
                topicName: form.values.topicName,
                courseId: Number(courseId)
            };

            try {
                const { data } = await axios.post(`${urls.baseUrl}/topic`, formData);
                if(data.message === 'success') {
                    form.setFieldValue('topicName', '');
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

