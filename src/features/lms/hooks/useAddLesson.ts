import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

interface LessonData {
    totalLessons: number;
    totalPages: number;
    currentPage: number;
    lessons: {
        id: string;
        lessonTitle: string;
        lessonContent: string;
        CourseId: string;
        TopicId: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

export const useAddLesson = () => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const { toggleRefreshData } = useRefreshContext();

    const nextText = active >= 2 ? "Submit" : "Next";
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const initialValues = {
        lessonTitle: '',         
    };

    const form = useForm({
        initialValues,
        validate: {
            lessonTitle: (value) => (!value ? 'Lesson Title cannot be empty' : null)
        }
    });

    const handleSubmit = async (editorState: any, courseId: string, topicId: string) => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            const lessonData = {
                lessonTitle: form.values.lessonTitle,
                lessonContent: editorState,
                courseId,
                topicId
            };
            try {
                const { data } = await axios.post(`${urls.baseUrl}/lesson`, lessonData);
                setResponse(data.message);
                toggleRefreshData();
                setLoading(false);
                setTimeout(() => {
                    setResponse('');
                    setActive(0);
                }, 6000);
                form.setFieldValue('lessonTitle', '');
            } catch (error: any) {
                console.log(error);
                setLoading(false);
                setResponse(error.response.data.message);
            }
            
        }
    }

    return { active, form, nextText, loading, response, nextStep, handleSubmit, prevStep, setActive };
}