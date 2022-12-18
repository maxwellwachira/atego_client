import { useEffect, useState } from 'react';
import { Badge, Box, Button, Center, Container, Grid, Group, Pagination, Paper, Stack, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import axios from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { urls } from '../../../../constants/urls';
import { colors } from '../../../../constants/colors';
import { PrintButton, ExcelButton, PdfButton, AddButton } from '../../../../features/lms';
import { useRefreshContext } from '../../../../features/lms/contexts/refreshDataContexProvider';
import LessonsTable from '../../../../features/lms/components/lessonsTable/lessonTable';
import { useAuthContext } from '../../../../features/authentication';

interface TopicData {
    totalTopics: number;
    totalPages: number;
    currentPage: number;
    topics: {
        id: string;
        topicName: string;
        CourseId: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

interface LessonData {
    totalLessons: number;
    totalPages: number;
    currentPage: number;
    lessons: {
        id: string;
        lessonTitle: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

interface TableData {
    id: string;
    count: number;
    lessonTitle: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const getAllCourseInfo = async (activePage: number) => {
        try {
            const response = await fetch(`${urls.baseUrl}/course?page=${activePage}&limit=1000`);
            const data = await response.json();
            //console.log(response)
            return data.courses
        } catch (error) {
            console.log("error", error)
        }
    }
    const getCourseInfo = async () => {
        const allCourses = await getAllCourseInfo(1);

        return allCourses.filter((course: any) => {
            return course.id == params?.id;
        });
    }

    const getTopicInfo = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/topic/single-topic/${params?.topicId}`);
            return data.topicName;
        } catch (error) {
            console.log(error);
        }
    }

    const courseContent = await getCourseInfo();
    const topicName = await getTopicInfo();

    return {
        props: {
            courseContent,
            topicName
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: { params: { id: string; topicId: string } }[] = [];
    let courseIds: Array<string> = [];

    const getAllCourseInfo = async (activePage: number) => {
        try {
            let status = 200;
            const response = await fetch(`${urls.baseUrl}/course?page=${activePage}&limit=10000`);
            const data = await response.json();
            if (status === 200) {
                data.courses.map((el: any) => {
                    let courseId = el.id;
                    courseIds.push(courseId);
                })
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const getCourseTopics = async (courseId: string) => {
        try {
            const response = await fetch(`${urls.baseUrl}/topic/${courseId}?page=1&limit=10000`);
            const data = response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    await getAllCourseInfo(1);

    const pathsData = async () => {
        await Promise.all(courseIds.map(async (id) => {
            const topicData: TopicData = await getCourseTopics(id);
            topicData.topics.map((el) => {
                paths.push({ params: { id, topicId: el.id } });
            });
        }));
    }

    await pathsData();

    return {
        paths,
        fallback: true
    }
}

const Lessons: NextPage = (props: any) => {
    const [activePage, setPage] = useState(1);
    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const { refreshData } = useRefreshContext();
    const router = useRouter();
    const { auth, userMe } = useAuthContext();
    const pathNameArr = router.asPath.split('/');
    const courseId = pathNameArr[2];
    const topicId = pathNameArr[pathNameArr.length - 1];
    const limit = 10;

    const embedUrl = (url: string) => {
        const splitUrl = url.split("=");
        return splitUrl[splitUrl.length - 1];
    }

    const getVideoUrl = (source: string, url: string) => {
        let videoUrl = url;
        switch (source) {
            case "youtube":
                videoUrl = embedUrl(videoUrl);
                break;

            default:
                break;
        }

        return videoUrl;
    }

    const getTopicLessons = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/lesson/topic/${topicId}?page=${activePage}&limit=${limit}`);
            setLessonData(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        lessonData?.lessons.map((el, index) => {
            let topicData = {
                id: el.id,
                count: (activePage - 1) * limit + ++index,
                lessonTitle: el.lessonTitle,
            }
            data.push(topicData);
        });

        return data;
    }

    useEffect(() => {
        // if(!auth || userMe.role !== "admin") router.push('/auth/logout');
        getTopicLessons();
    }, [activePage, refreshData]);

    // if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Lessons</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container mt={40}>
                <Grid>
                    <Grid.Col md={6}>
                        <Center>
                            <Button
                                component='a'
                                href={`/topics/${courseId}`}
                                mb="lg"
                                color="dark"
                                variant='outline'
                                leftIcon={<IconArrowLeft />}
                                radius="xl"
                                size="sm"
                            >
                                Go Back
                            </Button>
                        </Center>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Center>
                            <Group>
                                <Text>Total Lessons:</Text>
                                <Badge color="dark">{lessonData?.totalLessons} Lessons</Badge>
                            </Group>
                        </Center>
                    </Grid.Col>
                </Grid>
                <Text weight={600} size={28} my="lg" color={`${colors.primaryColor}`} align="center">    {props?.courseContent[0].courseTitle}</Text>
                <Grid gutter={50}>
                    <Grid.Col md={7}>
                        <Stack justify="center" align="center">
                            {props.courseContent[0].hasVideo ?
                                (
                                    <iframe
                                        src={`https://youtube.com/embed/${getVideoUrl(props.courseContent[0].videoSource, props.courseContent[0].videoUrl)}`}
                                        width="100%"
                                        height={400}
                                    >
                                    </iframe>
                                ) :
                                (
                                    <Image
                                        src={`${urls.baseUrl}/image?filePath=public${props?.courseContent[0]?.courseThumbnailUrl}`}
                                        width={600}
                                        height={400}
                                        alt="course thumbnail"
                                    />
                                )
                            }
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={5}>
                        <Text weight={600} size={25}>About Course</Text>
                        <Text component='h1' size={19}>{props.courseContent[0].courseDescriptionTitle}</Text>
                        <Text>{props.courseContent[0].courseDescriptionContent}</Text>
                    </Grid.Col>
                </Grid>
                <Text weight={600} size={28} my="xl" color={`${colors.primaryColor}`} align="center">TOPIC: {props.topicName}</Text>
                <Paper mt={20} p={10}>
                    <Grid>
                        <Grid.Col md={8}>
                            <Center>
                                <Group>
                                    <PrintButton />
                                    <ExcelButton />
                                    <PdfButton />
                                </Group>
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Center>
                                <AddButton id={Number(courseId)} type="Lesson" courseId={courseId} topicId={topicId} />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Paper mb={50}>
                    <LessonsTable data={tableData()} />
                    <Center mt="xl">
                        <Pagination total={lessonData ? lessonData.totalPages : 2} color='gray' page={activePage} onChange={setPage} />
                    </Center>
                </Paper>
            </Container>
        </>
    );
}

export default Lessons;