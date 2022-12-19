import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

import { urls } from "../../../constants/urls";

export const useLoginUser = () => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [userMeData, setUserMeData] = useState({
        role: '',
        firstName: '',
        lastName:''
    });
    const router = useRouter();

    const initialValues =  {
        email: '',
        password: ''
    }

    const form = useForm({
        initialValues,
        validate: {
            email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null ),
        },
    });

    const userMe = async (token: string) => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/me`, {headers: {Authorization: `Bear ${token}`}});
            setUserMeData(data);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const isEnrolled = async (token: string) => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/me`, { headers: { Authorization: `Bear ${token}` } });
            if (data.exists) {
                setEnrolled(true);
                return true;
            } else {
                setEnrolled(false);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            try {
                const { data } = await axios.post(`${urls.baseUrl}/auth/sign-in`, form.values);
                if(data.message === 'success') {
                    form.setValues(initialValues);
                    setResponse(data.message);
                    setCookie('accessToken', data.accessToken);
                    setCookie('refreshToken', data.refreshToken);
                    userMe(data.accessToken);
                    setLoading(false);
                    //console.log(userMeData)

                }
                if (data.message === "success") {
                    const userMeData = await userMe(data.accessToken);
                    console.log(userMeData);
                    switch (userMeData?.role) {
                      case 'student':
                        isEnrolled(data.accessToken).then((res) => {
                            if (res) return router.push('/students').then(() => router.reload());
                            router.push('/courses').then(() => router.reload());
                        });               
                        break;
                      case 'admin':
                        router.push('/admin').then(() => router.reload());
                        break;
                      case 'tutor':
                        router.push('/tutor/uploads').then(() => router.reload());
                        break;
                      default:
                        break;
                    }
                }
            } catch (error: any) {
                console.log(error);
                setResponse(error.response.data.message);
                setLoading(false);
               
            }
        }
    }

    const clearResponse = () => {
        setResponse('');
    }

    return { response, userMeData,form, loading, handleSubmit, userMe, clearResponse }
}