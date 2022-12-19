import { useEffect, useState } from 'react';
import { Card, Center, Container, Grid, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router'

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import { IconBook, IconSchool, IconTrophy } from '@tabler/icons';
import { useAuthContext } from '../../features/authentication';
import { urls } from '../../constants/urls';

interface EnrolmentData {
    totalEnrolments: number;
    totalPages: number;
    currentPage: number;
    enrolments: {
        id: string;
        CourseId: string;
        progress: string;
    }[]
};

const StudentDashboard: NextPage = () => {
    const [enrolmentData, setEnrolmentData] = useState<EnrolmentData | null>(null);
    const { auth, userMe } = useAuthContext();
    const router = useRouter();
    let token = getCookie('accessToken');

    const getGreetings = () => {
        const date = new Date();
        const hourString = date.getHours();
        let greetings = '';

        if (hourString < 12) greetings = "Good Morning";
        if (hourString >= 12 && hourString < 17) greetings = "Good Afternoon";
        if (hourString >= 17 && hourString <= 24) greetings = "Good Evening";

        return greetings;
    }

    const getEnrolments = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/me`, { headers: { Authorization: `Bear ${token}` } });
            setEnrolmentData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const completedCourses = () => {
        return enrolmentData?.enrolments.filter((el) => Number(el.progress) === 100);
    }

    useEffect(() => {
        // if (!auth) router.push('/auth/logout');
        getEnrolments();
    }, [])

    // if (!auth) return <></>

    return (
        <>
            <Head>
                <title>Atego Student Dashboard</title>
                <meta name="description" content="Atego School" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Center>
                        <Text mt="xl" weight={600} size={25} color={`${colors.primaryColor}`}>{`${getGreetings()} ${userMe.firstName} ${userMe.lastName}`}</Text>
                    </Center>
                    <Grid mt="xl">
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconBook color='green' size={45} />
                                    <Text size={20}>Enrolled Courses</Text>
                                    <Text size={23}>{enrolmentData?.totalEnrolments}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconSchool color='green' size={45} />
                                    <Text size={20}>Active Courses</Text>
                                    <Text size={23}>{Number(enrolmentData?.totalEnrolments) - (completedCourses() ? completedCourses.length : 0)}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconTrophy color='green' size={45} />
                                    <Text size={20}>Courses Completed</Text>
                                    <Text size={23}>{completedCourses()?.length}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>

                    </Grid>
                </Container>
            </StudentLayout>
        </>
    )
}

export default StudentDashboard;