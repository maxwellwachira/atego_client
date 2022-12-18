import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";

import { urls } from "../../../constants/urls";
import { useRefreshContext } from "../contexts/refreshDataContexProvider";

interface CategoryData {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    categories: {
        id: string;
        categoryName: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

interface SelectData {
    value: string;
    label: string;
};

interface CourseData {
    id: string;
    courseTitle: string;
    CategoryId: string;
    coursePricing: string;
    courseDescriptionTitle: string;
    courseDescriptionContent: string;
    courseThumbnailUrl: string;
    hasVideo: boolean;
    videoSource: string;
    videoUrl: string;
    grannysId: string;
    createdAt: string;
    updatedAt: string;
}

export const useEditCourse = (id: string, type: string) => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [courseResponse, setResponse] = useState('');
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [courseData, setCourseData] = useState<CourseData | null>(null);

    const { toggleRefreshData } = useRefreshContext();

    const nextText = active >= 3 ? "Submit" : "Next";
    const nextStep = () => setActive((current) => (current <= 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current >=3 ? current - 2 : current > 0 ? current - 1 : current));

    const initialValues = {
        courseName: '',
        CategoryId: '',
        pricing: 'free',
        amount: 0,
        descriptionTitle: '',
        descriptionContent: '',
        editThumbnail: 'doNotEdit',
        file: null,
        hasVideo: "false",
        videoSource: '',
        videoUrl: '',
        grannysId: '59260'
    };

    const courseForm = useForm({
        initialValues,
        validate: {
            courseName: (value) => (!value ? 'Course Name cannot be empty' : null),
            CategoryId: (value) => (!value ? 'Category cannot be empty' : null),
            descriptionTitle: (value) => (!value? 'Description Title cannot be empty' : null),
            descriptionContent:  (value) => (!value? 'Description Content cannot be empty' : null),
        }
    });

    const getCourseData = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/course/${id}`);
            setCourseData(data);
            courseForm.setFieldValue('courseName', data.courseTitle);
            courseForm.setFieldValue('CategoryId', data.CategoryId);
            courseForm.setFieldValue('amount', Number(data.coursePricing));
            Number(data.coursePricing) === 0 ? courseForm.setFieldValue('pricing', 'free') : courseForm.setFieldValue('pricing', 'paid');
            courseForm.setFieldValue('descriptionTitle', data.courseDescriptionTitle);
            courseForm.setFieldValue('descriptionContent', data.courseDescriptionContent);
            courseForm.setFieldValue('hasVideo', `${data.hasVideo}`);
            courseForm.setFieldValue('videoSource', data.videoSource);
            courseForm.setFieldValue('videoUrl', data.videoUrl);
        } catch (error) {
            console.log(error);
        }
    }
   

    const getAllCategories = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category?page=${1}&limit=${1000}`);
            setCategoryData(data);
            //console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const categorySelectData = () => {
        let data: SelectData[] = [];
        categoryData?.categories.map((el) => {
            let selectData = {
                value: el.id,
                label: el.categoryName,
            }
            data.push(selectData);
        });

        return data;
    }

    const nextClick = async() => {
       
        if(active <= 4){
            nextStep();
        }
        //console.log(active)
    }

    const handleCourseSubmit = async (file: File | null) => {
        let courseData;
        if(JSON.stringify(courseForm.errors) === "{}"){
            setLoading(true);
            courseForm.setFieldValue('grannysId', '59260');
            if(courseForm.values.pricing === 'free') courseForm.setFieldValue('amount', 0);
            file ? courseData = { ...courseForm.values, file } : courseData = courseForm.values;
            //console.log(courseData);
            try {
                const { data } = await axios.put(`${urls.baseUrl}/course/${id}`, courseData, {headers: {
                    'Content-Type': 'multipart/form-data'
                  }});
                //console.log(data);
                setResponse(data.message);
                toggleRefreshData();
                setTimeout(() => {setResponse('')}, 5000);
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    useEffect(() => {
        getAllCategories();
        getCourseData();
    }, [courseResponse]);

    return { active, courseForm, nextText, courseResponse, nextClick, handleCourseSubmit, prevStep, setActive, categorySelectData };
}