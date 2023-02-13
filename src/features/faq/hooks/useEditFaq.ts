import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useLocalStorage } from '@mantine/hooks';
import { useEditor } from '@tiptap/react';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import axios from "axios";
import { getCookie } from "cookies-next";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../../lms/contexts/refreshDataContexProvider";

interface FaqData {
    id: string;
    question: string;
    answer: string;
}

export const useEditFaq = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [editorState, setEditorState] = useState('');
    const [editorValue, setEditorValue] = useLocalStorage({ key: 'editorState', defaultValue: ''});
    const [faqData, setFaqData] = useState<FaqData | null>(null);

    let token = getCookie('accessToken');

    const { toggleRefreshData } = useRefreshContext();

    const initialValues = {
        question: '',
    };

    const form = useForm({
        initialValues,
        validate: {
            question: (value) => (!value ? 'Question cannot be empty' : null)
        }
    });

    const getInitialValues = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/faq/${id}`, { headers: { Authorization: `Bear ${token}` } });
            setFaqData(data);
            form.setFieldValue('question', data.question);
            if(data.answer) setEditorState(data.answer)
        } catch (error) {
            console.log(error);
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: editorState,
        onUpdate: function ({ editor }) {
            setEditorState(editor.getHTML());
        }
    });

    


    const handleSubmit = async () => {
        if (JSON.stringify(form.errors) === "{}") {
            setLoading(true);
            const reqData = {
                answer: editorValue,
                question: form.values.question
            };
            console.log(reqData)
            try {
                const { data } = await axios.put(`${urls.baseUrl}/faq`, reqData, { headers: { Authorization: `Bear ${token}` } });
                if (data.message === 'success') {
                    form.setValues(initialValues);
                    setResponse(data.message);
                    toggleRefreshData();
                    setLoading(false);
                    setTimeout(() => { setResponse('') }, 6000);
                }
            } catch (error: any) {
                console.log(error);
                setResponse(error.response.data.message);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getInitialValues();
        if(editorState.length > 0){
            setEditorValue(editorState);
        }
    }, [editorState])

    return { editor, form, loading, response, setResponse, handleSubmit };
}