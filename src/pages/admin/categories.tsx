import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { AddButton, CategoriesTable, ExcelButton, PdfButton, PrintButton } from '../../features/lms';
import { colors } from '../../constants/colors';
import { urls } from '../../constants/urls';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { useAuthContext } from '../../features/authentication';

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
    categoryName: string;
    numberOfCourses: number | string;
};


const Tutors: NextPage = () => {
    const [activePage, setPage] = useState(1);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [courseCountArr, setCourseCountArr] = useState<Array<number> | null>(null);
    const { refreshData } = useRefreshContext();
    const { auth, userMe } = useAuthContext();
    const router = useRouter();
    const limit = 5;


    const getCourseCount = async (categoryId: string) => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/course/category/${categoryId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const getCourseCountArr = async (data: CategoryData) => {
        let courseCountArr: Array<number> = [];
        if (data) {
            await Promise.all(data?.categories.map(async (el, index) => {
                const courseData = await getCourseCount(el.id);
                if (courseData) courseCountArr.push(courseData.totalCourses);
            }))
        }
        setCourseCountArr(courseCountArr);
    }


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category?page=${activePage}&limit=${limit}`);
            setCategoryData(data);
            await getCourseCountArr(data);
        } catch (error) {
            console.log(error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        categoryData?.categories.map((el, index) => {
            let categoryData = {
                id: el.id,
                numberOfCourses: courseCountArr && courseCountArr.length > 0 ? courseCountArr[index] : 'Loading...',
                count: (activePage - 1) * limit + ++index,
                categoryName: el.categoryName,
            }
            data.push(categoryData);
        });

        return data;
    }


    useEffect(() => {
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
            getAllCategories();
        }
    }, [activePage, refreshData, userMe]);

    if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Categories</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
                <Container>
                    <Paper withBorder mt="lg" p="md" radius={40}>
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image
                                        src='/categories.svg'
                                        height={350}
                                        width={400}
                                        alt="categories"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6} p="xl">
                                <Text size={28} color={`${colors.primaryColor}`} weight={600} mt="lg" >Atego Courses Categories</Text>
                                <Group position="apart" mt="lg">
                                    <Text>Total Categories</Text>
                                    <Badge color='dark' size='lg'>{categoryData?.totalCategories} categories</Badge>
                                </Group>
                                <Group position="apart" mt="lg">
                                    <Text>Categories Added this month</Text>
                                    <Badge color='dark' size='lg'>Loading ...</Badge>
                                </Group>
                                <Group position="apart" mt="lg">
                                    <Text>Category with highest enrollment</Text>
                                    <Badge color='dark' size='lg'>Loading ...</Badge>
                                </Group>

                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <Paper mt={40} p={10}>
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
                                    <AddButton id={1} type="Category" />
                                </Center>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    <Paper>
                        <CategoriesTable data={tableData()} />
                        <Center mt="xl">
                            <Pagination total={categoryData ? categoryData.totalPages : 2} color='gray' page={activePage} onChange={setPage} />
                        </Center>
                    </Paper>

                </Container>
            </AdminLayout>
        </>
    );
}

export default Tutors;