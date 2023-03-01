import { useEffect, useState } from 'react';
import { Button, Card, Center, Container, createStyles, Grid, RingProgress, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import axios from 'axios';
import { urls } from '../../constants/urls';
import { useAuthContext } from '../../features/authentication';
import { IconArrowRight } from '@tabler/icons';


interface Enrolments {
    totalEnrolments: number;
    totalPages: number;
    currentPage: number,
    enrolments: {
        id: string;
        UserId: string;
        CourseId: string;
        progress: number;
        createdAt: string;
        updatedAt: string;
    }[];
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
};

interface CompleteData extends CourseData {
    progress: number;
}

const useStyles = createStyles((theme) => ({
    cardHeight: {
        height: 240
    },
    button: {
        background: `${colors.primaryLight}`,
        color: theme.colors.dark[7],
        borderRadius: 15,
        padding: '5px 10px',
        '&:hover': {
            background: `${colors.primaryLight}`,
            opacity: 0.7
        }
    },
    loaderHeight: {
        height: 'calc(100vh - 150px)'
    }
}));


const Certificates: NextPage = () => {
    const { classes } = useStyles();
    const [buttonLoading, setButtonLoading] = useState(0);
    const [enrolments, setEnrolments] = useState<CompleteData[] | null>(null);
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const router = useRouter();
    const { auth, userMe } = useAuthContext();
    let token = getCookie('accessToken');

    const onClick = (id: number) => {
        setButtonLoading(id);
    }

    const getEnrolmentAndCourseData = async (enrols: Enrolments) => {
        let data: CompleteData[] = [];
        enrols.enrolments.map(async (el) => {
            const courseInfo: CourseData = await getCourseById(el.CourseId);
            const completeData = { ...courseInfo, ...{ progress: el.progress } };
            data.push(completeData);
        })
        return data;
    }

    const getEnrolments = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/me`, { headers: { Authorization: `Bear ${token}` } });
            const enrolmentData = await getEnrolmentAndCourseData(data);
            setEnrolments(enrolmentData);
        } catch (error) {
            console.log(error);
        }
    }

    const getCourseById = async (courseId: string) => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/course/${courseId}`);
            setCourseData(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const item = enrolments?.map((element: CompleteData) => (
        <Grid.Col sm={6} md={4} key={element.id}>
            <Center>
                <Card shadow="md" p="lg" radius="lg" withBorder style={{ maxWidth: 300 }}>
                    <Card.Section>
                        <Center>
                            <Image
                                src={`${urls.baseUrl}/image?filePath=public${element?.courseThumbnailUrl}`}
                                width="400"
                                height="250"
                                alt="course thumbnail"
                            />
                        </Center>
                    </Card.Section>

                    <Stack justify="space-between" className={classes.cardHeight} align="center">
                        <Text mt="md">
                            {element.courseTitle}
                        </Text>
                        <RingProgress
                            sections={[{ value: Number(`${element.progress}`), color: 'green' }]}
                            label={
                                <Text color="green" weight={700} align="center" size="xl">
                                    {element.progress}%
                                </Text>
                            }
                        />

                        <Button
                            variant="light"
                            fullWidth
                            radius="md"
                            className={classes.button}
                            component='a'
                            href={`/learn/${element.id}`}
                            onClick={() => onClick(Number(element.id))}
                            loading={buttonLoading === Number(element.id) ? true : false}
                        >
                            {element.progress === 0 ? "Start" : "continue"} Learning
                        </Button>
                    </Stack>
                </Card>
            </Center>
        </Grid.Col>
    ));

    useEffect(() => {
        if (!auth) router.push('/auth/logout');
        getEnrolments();
    }, [])

    if (!auth) return <></>


    return (
        <>
            <Head>
                <title>Atego Skills For Life</title>
                <meta name="description" content="Atego School" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Text
                        my="xl"
                        weight={600}
                        size={25}
                        color={`${colors.primaryColor}`}
                    >
                        My Courses
                    </Text>
                    {
                       enrolments && enrolments.length > 0 ? 
                    <Grid>
                        {item}
                    </Grid> :
                    <Card withBorder style={{maxWidth:300}} radius={20}>
                        <Card.Section>
                            <Image
                                src="/nodata.svg"
                                height={300}
                                width={300}
                                alt="No course found" 
                            />
                        </Card.Section>
                        <Stack justify='center' align='center'>

                        <Text >Oops! No course Found</Text>
                        <Button
                            rightIcon={<IconArrowRight />}
                            radius={15}
                            color='dark'
                            variant='outline'
                            component='a'
                            href='/courses'
                        >
                            Go to Courses
                        </Button>
                        </Stack>
                    </Card>
                    }
                </Container>
            </StudentLayout>
        </>
    )
}

export default Certificates;