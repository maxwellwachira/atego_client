import { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { AddButton, CourseTable, ExcelButton, PdfButton, PrintButton } from '../../features/lms';
import { colors } from '../../constants/colors';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { urls } from '../../constants/urls';
import { useAuthContext } from '../../features/authentication';
import { useRouter } from 'next/router';


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

interface TableData {
    id: string;
    count: number;
    courseTitle: string;
    categoryName: string;
    pricing: string;
};


const Tutors: NextPage = () => { 
    const [activePage, setPage] = useState(1);
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const { refreshData } = useRefreshContext();
    const { auth, userMe } = useAuthContext();
    const router = useRouter();
    const limit = 5;

    const getAllCourses = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/course?page=${activePage}&limit=${limit}`);
            setCourseData(data);
            //console.log(data);
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

    const tableData = () => {
        let data: TableData[] = [];
        courseData?.courses.map(async (el, index) => {
            let courseData = {
                id: el.id,
                count: (activePage - 1) * limit + ++index,
                courseTitle: el.courseTitle,
                categoryName: categoryData ? categoryData.categories.filter((element) => element.id === el.CategoryId)[0].categoryName : "",
                pricing: el.coursePricing
            }
            data.push(courseData);
        });
        
        return data;
    }

    useEffect(() => {
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
            getAllCategories();
            getAllCourses();
        }
       
    }, [activePage, refreshData, userMe]);

    if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Courses</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
                <Container>
                    <Paper withBorder mt="lg" p="md">
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image 
                                        src='/courses.svg'
                                        height={350}
                                        width={400}
                                        alt="courses"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6} p="xl">
                                <Text size={28} color={`${colors.primaryColor}`} weight={600} mt="lg" >Atego Courses</Text>
                                <Group position="apart" mt="lg"> 
                                    <Text>Total Courses</Text>
                                    <Badge color='dark' size='lg'>{courseData?.totalCourses} Courses</Badge>
                                </Group>
                                <Group position="apart" mt="lg"> 
                                    <Text>Courses Added this month</Text>
                                    <Badge color='dark' size='lg'>Loading ...</Badge>
                                </Group>
                                <Group position="apart" mt="lg"> 
                                    <Text>Course with highest enrollment</Text>
                                    <Badge color='dark' size='lg'>Loading ...</Badge>
                                </Group>
                               
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <Paper mt={40}  p={10}>
                        <Grid>
                            <Grid.Col md={8}>
                                <Group>
                                    <PrintButton />
                                    <ExcelButton />
                                    <PdfButton />
                                </Group>
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <Center>
                                    <AddButton id={1} type="Course"/>
                                </Center>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    <Paper>
                        <CourseTable data={tableData()} />
                        <Center mt="xl"> 
                            <Pagination total={courseData ? courseData.totalPages : 2} color='gray' page={activePage} onChange={setPage}/>
                        </Center>
                    </Paper>

                </Container>
            </AdminLayout>
        </>
    );
}

export default Tutors;