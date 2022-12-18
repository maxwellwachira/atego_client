import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

interface TopicData {
    id: string;
    topicName: string;
    createdAt: string;
    updatedAt: string;
};

export const useEditTopic = (id: string, type: string) => {
    const [topicLoading, setTopicLoading] = useState(false);
    const [topicResponse, setTopicResponse] = useState('');
    const [topicData, setTopicData] = useState<TopicData | null>(null);

    const { toggleRefreshData } = useRefreshContext();
    
    const topicForm = useForm({
        initialValues: {
            topicName: ''
        },
        validate: {
            topicName: (value) => (!value ? 'Topic Title cannot be empty' : null)
        }
    });

    const getInitialValues = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/topic/single-topic/${id}`);
            console.log(data);
            setTopicData(data);
            topicForm.setFieldValue('topicName', data.topicName);
        } catch (error) {
            console.log(error);
        }
    }


    const topicHandleSubmit = async() => {
        if(JSON.stringify(topicForm.errors) === "{}"){
            setTopicLoading(true);
            try {
                const { data } = await axios.put(`${urls.baseUrl}/topic/${id}`, topicForm.values);
                if(data.message === 'success') {
                    if(topicData) topicForm.setFieldValue('topicName', topicData?.topicName);
                    setTopicResponse(data.message);
                    toggleRefreshData();
                    setTopicLoading(false);
                    setTimeout(() => {setTopicResponse('')}, 5000);
                }
            } catch (error: any) {
                console.log(error);
                setTopicResponse(error.response.data.message);
                setTopicLoading(false);
            }
        }
    }
    

    useEffect(() => {
        if (type === "topic") getInitialValues(); 
    }, [topicResponse]);

    return { topicForm, topicLoading, topicResponse, topicHandleSubmit };
}

