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

export const useAddCourse = () => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

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
        file: null,
        hasVideo: "false",
        videoSource: '',
        videoUrl: '',
        grannysId: '59260'
    };

    const form = useForm({
        initialValues,
        validate: {
            courseName: (value) => (!value ? 'Course Name cannot be empty' : null),
            CategoryId: (value) => (!value ? 'Category cannot be empty' : null),
            descriptionTitle: (value) => (!value? 'Description Title cannot be empty' : null),
            descriptionContent:  (value) => (!value? 'Description Content cannot be empty' : null),
        }
    });

    const getAllCategories = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category?page=${1}&limit=${1000}`);
            setCategoryData(data);
            //console.log(data);
        } catch (error: any) {
            console.log(error);
        }
    }

    const categorySelectData = () => {
        let data: SelectData[] = [];
        categoryData?.categories.map((el, index) => {
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
        console.log(active)
    }

    const handleSubmit = async (file: File | null) => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            form.setFieldValue('grannysId', '59260');
            if(form.values.pricing === 'free') form.setFieldValue('amount', 0);
            const courseData = { ...form.values, file };
            //console.log(courseData);
            try {
                const { data } = await axios.post(`${urls.baseUrl}/course`, courseData, {headers: {
                    'Content-Type': 'multipart/form-data'
                  }});
                setResponse(data.message);
                toggleRefreshData();
                setLoading(false);
                setTimeout(() => {
                    setResponse('');
                    setActive(0);
                }, 6000);
                form.setValues(initialValues);
                //console.log(data);
            } catch (error: any) {
                console.log(error);
                setLoading(false);
                setResponse(error.response.data.message);
            }
            
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return { active, form, nextText, response, loading, nextClick, handleSubmit, prevStep, setActive, categorySelectData };
}