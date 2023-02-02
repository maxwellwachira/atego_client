import { useEffect, useState } from 'react';
import { Badge, Button, Card, Center, Container, createStyles, Grid, Group, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { colors } from '../../constants/colors';
import tutorImage from '../../assets/tutor.jpg';
import { useAuthContext } from '../../features/authentication/context/authContextProvider';
import { urls } from '../../constants/urls';


const useStyles = createStyles((theme) => ({
    cardShadow: {
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },

    themeButton: {
        background: `${colors.primaryLight}`,
        borderRadius: 15,
        padding: '5px 10px',
        '&:hover': {
            background: `${colors.primaryLight}`,
            opacity:0.7 
        }
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontweight: 600
    }
}))

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

interface CourseData {
    totalCourses: number;
    totalPages: number;
    currentPage: number;
    courses: {
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
    }[]
};

interface StudentData {
    totalStudents: number;
    totalPages: number;
    currentPage: number;
    students: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        role: string;
        active: boolean;
        disabled: boolean;
        createdAt: string;
        updatedAt: string;
    }[]
};

interface TutorData {
    totalTutors: number;
    totalPages: number;
    currentPage: number;
    tutors: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        role: string;
        active: boolean;
        disabled: boolean;
        createdAt: string;
        updatedAt: string;
    }[]
};


const Dashboard: NextPage = () => { 
    const { classes } = useStyles();
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [tutorData, setTutorData] = useState<TutorData | null>(null);
    const router = useRouter();
    const { auth, userMe } = useAuthContext();

    const getGreetings = () => {
        const date = new Date();
        const hourString = date.getHours();
        let greetings = '';

        if (hourString <  12) greetings = "Good Morning";
        if (hourString >=  12 && hourString < 17) greetings = "Good Afternoon";
        if (hourString >=  17 && hourString <= 24) greetings = "Good Evening";

        return greetings;
    }

    const getAllCourses = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/course?page=${1}&limit=${1000}`);
            setCourseData(data);
            console.log(data);
        } catch (error) {
            
        }
    }

    const getAllCategories = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category?page=${1}&limit=${1000}`);
            setCategoryData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllStudents = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/students?page=${1}&limit=${1000}`);
            setStudentData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllTutors = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/tutors?page=${1}&limit=${1000}`);
            setTutorData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
            getAllCourses();
            getAllCategories();
            getAllStudents();
            getAllTutors();
        }
    }, [userMe]);

    if (!auth || userMe.role !== "admin") return <></>
    return (
        <>
            <Head>
                <title>Atego | Admin Dashboard</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
               <Container>
                <Center>
                    <Text my="xl" size={25}  weight={600} color="dark">{getGreetings()} <span style={{color: colors.primaryColor}}>{userMe.firstName} {userMe.lastName}</span>, Welcome to Admin's Dashboard</Text>
                </Center>
                <Grid gutter="xl" mb="xl">
                    <Grid.Col md={6}>
                        <Card p="xl" radius={40} className={classes.cardShadow}>
                            <Center>
                                <Text weight={600} color={`${colors.primaryColor}`} size={23}>Atego Students Summary</Text>
                            </Center>
                            <Card.Section>
                               <Center>
                                    <Image 
                                        src='/student.svg'
                                        height={200}
                                        width={300}
                                        alt="students"
                                    />
                               </Center>
                            </Card.Section>
                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>Total Students</Text>
                                <Badge color="dark" variant="light">
                                    {studentData?.totalStudents} students
                                </Badge>
                                <Button variant="light"className={classes.themeButton} fullWidth mt="md" radius="md" onClick={() => router.push('/admin/students')}>
                                    <span className={classes.buttonText}>See More</span>
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Card p="xl" radius={40} className={classes.cardShadow}>
                            <Center>
                                <Text weight={600} color={`${colors.primaryColor}`} size={23}>Atego Courses Summary</Text>
                            </Center>
                            <Card.Section>
                               <Center>
                                    <Image 
                                        src='/courses.svg'
                                        height={200}
                                        width={300}
                                        alt="courses"
                                    />
                               </Center>
                            </Card.Section>
                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>Total Courses</Text>
                                <Badge color="dark" variant="light">
                                    {courseData?.totalCourses} courses
                                </Badge>
                                <Button variant="light"className={classes.themeButton} fullWidth mt="md" radius="md" onClick={() => router.push('/admin/courses')}>
                                    <span className={classes.buttonText}>See More</span>
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Card p="xl" radius={40} className={classes.cardShadow}>
                            <Center>
                                <Text weight={600} color={`${colors.primaryColor}`} size={23}>Atego Categories Summary</Text>
                            </Center>
                            <Card.Section>
                               <Center>
                                    <Image 
                                        src='/categories.svg'
                                        height={200}
                                        width={300}
                                        alt="categories"
                                    />
                               </Center>
                            </Card.Section>
                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>Total Categories</Text>
                                <Badge color="dark" variant="light">
                                   {categoryData?.totalCategories} Categories
                                </Badge>
                                <Button variant="light"className={classes.themeButton} fullWidth mt="md" radius="md" onClick={() => router.push('/admin/categories')}>
                                    <span className={classes.buttonText}>See More</span>
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Card p="xl" radius={40} className={classes.cardShadow}>
                            <Center>
                                <Text weight={600} color={`${colors.primaryColor}`} size={23}>Atego Tutors Summary</Text>
                            </Center>
                            <Card.Section>
                               <Center>
                                    <Image 
                                        src={tutorImage}
                                        height={200}
                                        width={300}
                                        alt="tutors"
                                    />
                               </Center>
                            </Card.Section>
                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>Total Tutors</Text>
                                <Badge color="dark" variant="light">
                                   {tutorData?.totalTutors} tutors
                                </Badge>
                                <Button variant="light"className={classes.themeButton} fullWidth mt="md" radius="md" onClick={() => router.push('/admin/tutors')}>
                                    <span className={classes.buttonText}>See More</span>
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                    
                </Grid>
               </Container>
            </AdminLayout>
        </>
    );
}

export default Dashboard;