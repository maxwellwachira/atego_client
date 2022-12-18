import { useEffect, useState } from 'react';
import { Badge, Box, Button, Center, Container, Grid, Group, Pagination, Paper, Stack, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import axios from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { colors } from '../../../constants/colors';
import { urls } from '../../../constants/urls';
import { PrintButton, ExcelButton, PdfButton, AddButton } from '../../../features/lms';
import TopicsTable from '../../../features/lms/components/topicsTable/topicsTable';
import { useRefreshContext } from '../../../features/lms/contexts/refreshDataContexProvider';
import { useAuthContext } from '../../../features/authentication';

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

interface TableData {
    id: string;
    count: number;
    topicName: string;
    courseId: string;
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

    const courseContent = await getCourseInfo();
    console.log(courseContent)
    return {
        props: {
            courseContent
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    let courseIds: Array<string> = [];

    const getAllCourseInfo = async (activePage: number) => {
        try {
            let status = 200;
            const response = await fetch(`${urls.baseUrl}/course?page=${activePage}&limit=1000`);
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

    await getAllCourseInfo(1);

    const paths = courseIds.map((id) => ({ params: { id } }));
    return {
        paths,
        fallback: true
    }
}

const Topics: NextPage = (props: any) => {
    const [activePage, setPage] = useState(1);
    const [topicData, setTopicData] = useState<TopicData | null>(null);
    const { refreshData } = useRefreshContext();
    const router = useRouter();
    const { auth, userMe } = useAuthContext();
    const pathNameArr = router.asPath.split('/');
    const courseId = pathNameArr[pathNameArr.length - 1];
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

    const getCourseTopics = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/topic/${courseId}?page=${activePage}&limit=${limit}`);
            setTopicData(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        topicData?.topics.map((el, index) => {
            let topicData = {
                id: el.id,
                count: (activePage - 1) * limit + ++index,
                topicName: el.topicName,
                courseId
            }
            data.push(topicData);
        });

        return data;
    }


    useEffect(() => {
        // if(!auth || userMe.role !== "admin") router.push('/auth/logout');
        getCourseTopics();
    }, [activePage, refreshData]);

    // if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Topics</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container mt={40}>
                <Grid>
                    <Grid.Col md={6}>
                        <Center>
                            <Button
                                component='a'
                                href='/admin/courses'
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
                                <Text>Total Topics:</Text>
                                <Badge color="dark">{topicData?.totalTopics} topics</Badge>
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
                <Text weight={600} size={28} my="xl" color={`${colors.primaryColor}`} align="center">Course Topics</Text>
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
                                <AddButton id={Number(courseId)} type="Topic" />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Paper mb={50}>
                    <TopicsTable data={tableData()} />
                    <Center mt="xl">
                        <Pagination total={topicData ? topicData.totalPages : 2} color='gray' page={activePage} onChange={setPage} />
                    </Center>
                </Paper>
            </Container>
        </>
    );
}

export default Topics;