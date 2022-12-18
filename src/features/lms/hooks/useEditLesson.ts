import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

interface LessonData {
    id: string;
    lessonTitle: string;
    lessonContent: string;
    CourseId: string;
    TopicId: string;
    createdAt: string;
    updatedAt: string;
};

export const useEditLesson = (id: string, type: string) => {
    const [lessonActive, setLessonActive] = useState(0);
    const [lessonloading, setLessonLoading] = useState(false);
    const [lessonData, setLessonData] = useState<LessonData>({
        id: '',
        lessonTitle: '',
        lessonContent: 'loading..',
        CourseId: '',
        TopicId: '',
        createdAt: '',
        updatedAt: '',
    });
    const [lessonresponse, setLessonResponse] = useState('');
    const [convertedContent, setConvertedContent] = useState('');

    const blocks = htmlToDraft(lessonData.lessonContent);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap))
    );
    const { toggleRefreshData } = useRefreshContext();

    const lessonNext = lessonActive >= 2 ? "Submit" : "Next";
    const lessonNextStep = () => setLessonActive((current) => (current < 3 ? current + 1 : current));
    const lessonPrevStep = () => setLessonActive((current) => (current > 0 ? current - 1 : current));
        
    const handleEditorChange = (state: any) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(currentContentAsHTML);
    }
    
    const initialValues = {
        lessonTitle: '',         
    };

    const lessonForm = useForm({
        initialValues,
        validate: {
            lessonTitle: (value) => (!value ? 'Lesson Title cannot be empty' : null)
        }
    });

    const getLessonData = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/lesson/single-lesson/${id}?page=${1}&limit=${1000}`);
            setLessonData(data);
            lessonForm.setFieldValue("lessonTitle", data.lessonTitle);
            const htmlBlocks = htmlToDraft(data.lessonContent);
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlBlocks.contentBlocks, htmlBlocks.entityMap)));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const lessonHandleSubmit = async () => {
        if(JSON.stringify(lessonForm.errors) === "{}"){
            setLessonLoading(true);
            const lessonData = {
                lessonTitle: lessonForm.values.lessonTitle,
                lessonContent: convertedContent,
            };
            try {
                const { data } = await axios.put(`${urls.baseUrl}/lesson/${id}`, lessonData);
                setLessonResponse(data.message);
                toggleRefreshData();
                setLessonLoading(false);
                setTimeout(() => {
                    setLessonResponse('');
                    setLessonActive(0);
                }, 6000);
                lessonForm.setFieldValue('lessonTitle', '');
            } catch (error: any) {
                console.log(error);
                setLessonLoading(false);
                setLessonResponse(error.response.data.message);
            }
            
        }
    }

    useEffect(() => {
        getLessonData();
    }, []);

    return { editorState, lessonActive, lessonForm, lessonNext, lessonloading, lessonresponse, handleEditorChange, lessonNextStep, lessonHandleSubmit, lessonPrevStep, setLessonActive };
}