import { useState, useEffect } from 'react';
import { Badge, Box, Button, Card, Center, Container, Accordion, Grid, Group, Text, Tabs, Modal, TextInput, Stack, Divider, Notification } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';
import { useForm } from '@mantine/form';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { colors } from '../../constants/colors';
import { urls } from '../../constants/urls';
import { IconArrowLeft, IconBook, IconCheck, IconClipboard, IconCurrencyDollar, IconPlus, IconX } from '@tabler/icons';
import { useAuthContext } from '../../features/authentication';
import LipaNaMpesa from '../../assets/lipanampesa.png';
import { useViewportSize } from '@mantine/hooks';

interface TopicData {
    totalTopics: number;
    totalPages: number;
    currentPage: number;
    topics: {
        id: string;
        topicName: string;
        createdAt: string;
        updatedAt: string;
    }[]
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


const SingleCourse: NextPage = (props: any) => {
    const { auth, userMe } = useAuthContext();
    const [response, setResponse] = useState('');
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [topicData, setTopicData] = useState<TopicData | null>(null);
    const router = useRouter();
    const pathNameArr = router.asPath.split('/');
    const courseId = pathNameArr[pathNameArr.length - 1];
    const { width } = useViewportSize();


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

    const enroll = async (UserId: string, CourseId: string) => {
        try {
            const { status } = await axios.post(`${urls.baseUrl}/enrolment`, { UserId, CourseId });
            if (status === 201) {
                setResponse("success");
                return {
                    message: "success"
                };
            }
        } catch (error) {
            console.log(error);
            setResponse("error");
            return {
                message: "error"
            };
        }
    }

    const isEnrolled = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/course/${props.courseContent[0].id}/user/${userMe.id}`);
            if (data.exists) {
                setEnrolled(true);
            } else {
                setEnrolled(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClick = async () => {
        if(!auth) router.push('/auth/login').then(() => router.reload());
        //Check if role is admin or tutor or course pricing is free
        setLoading(true);
        if (userMe.role === "admin" || userMe.role === "tutor") {
            const enrolment = await enroll(userMe.id, props.courseContent[0].id);
            if (enrolment?.message === "success") {
                router.push("/students/courses");
            }
        } else {
            try {
                const pesapalData = {
                    amount: Number(props.courseContent[0].coursePricing),
                    email: userMe.email,
                    firstName: userMe.firstName,
                    lastName: userMe.lastName
                };
                const { data } = await axios.post(`${urls.baseUrl}/pesapal/iframe`, pesapalData);
                if (Number(data.status) === 200) {
                    setCookie('order_tracking_id', data.order_tracking_id);
                    setCookie('course_id', props.courseContent[0].id);
                    router.push(data.redirect_url);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const getCourseTopics = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/topic/${courseId}?page=1&limit=1000`);
            setTopicData(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const capitalizeFirsLetter = (sentence: string) => {
        const words = sentence.split(" ");
        return words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(" ");
    }

    useEffect(() => {
        isEnrolled();
        getCourseTopics();
    }, []);

    return (
        <>
            <Head>
                <title>Atego | {props?.courseContent[0].courseTitle}</title>
                <meta name="description" content="Learn the basics of Hardware & IoT with Atego's comprehensive IoT course. Taught by industry experts, this hands-on program will equip you with the skills and knowledge you need to succeed in the world of IoT." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container mt="md">
                    <Grid>
                        <Grid.Col md={6}>
                            <Button
                                component='a'
                                href='/courses'
                                size='xs'
                                mb="lg"
                                color="dark"
                                variant='outline'
                                leftIcon={<IconArrowLeft />}
                                radius="xl"
                            >
                                Go Back
                            </Button>
                        </Grid.Col>
                    </Grid>
                    <Grid gutter="xl">
                        <Grid.Col md={8}>
                            <Text weight={600} size={28} mb="lg" color={`${colors.primaryColor}`}>    {props?.courseContent[0].courseTitle}
                            </Text>
                            <Center>
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
                                            width={width > 768 ? 600 : 310}
                                            height={width > 768 ? 400 : 310}
                                            alt="course thumbnail"
                                        />
                                    )
                                }
                            </Center>
                            <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="md">
                                <Tabs.List>
                                    <Tabs.Tab value="courseInfo" icon={<IconBook size={14} />}>Course Info</Tabs.Tab>
                                    <Tabs.Tab value="curriculum" icon={<IconClipboard size={14} />}>Curriculum</Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="courseInfo" pt="xs">
                                    <Text weight={600} size={25} mt="md">About Course</Text>
                                    <Text component='h1' size={19}>{props.courseContent[0].courseDescriptionTitle}</Text>
                                    <Text>{props.courseContent[0].courseDescriptionContent}</Text>
                                </Tabs.Panel>
                                <Tabs.Panel value="curriculum" pt="xs">
                                    <Text weight={600} size={25} mt="md">Curriculum</Text>
                                    <Accordion
                                        chevron={<IconPlus size={16} />}
                                        styles={{
                                            chevron: {
                                                '&[data-rotate]': {
                                                    transform: 'rotate(45deg)',
                                                },
                                            },
                                        }}
                                    >
                                        {topicData?.topics.map((element: any) => (
                                            <Accordion.Item value={element.id} key={element.id}>
                                                <Accordion.Control>
                                                    {capitalizeFirsLetter(element.topicName)}
                                                </Accordion.Control>
                                            </Accordion.Item>
                                        ))}

                                    </Accordion>
                                </Tabs.Panel>
                            </Tabs>

                        </Grid.Col>
                        <Grid.Col md={4} mb="xl">
                            <Card withBorder mt={60} radius="lg" p={25}>

                                {
                                    enrolled ?
                                        <Button
                                            fullWidth
                                            my="lg"
                                            color="dark"
                                            variant='outline'
                                            radius="xl"
                                            onClick={onClick}
                                        >
                                            Continue Learning
                                        </Button>
                                        :
                                        <>
                                            <Group mt="lg">
                                                <Text size="lg">Price:</Text>
                                                <Badge color="green" variant='outline' size='lg'>{props.courseContent[0].coursePricing == 0 ? 'FREE' : `${props.courseContent[0].coursePricing} KES`}</Badge>
                                            </Group>
                                            <Text my="sm">Don't be left out, enrol today</Text>
                                            <Text my="sm" weight={600} color={colors.primaryColor}>Hardware is hard, but not with Atego</Text>
                                            <Button
                                                fullWidth
                                                my="lg"
                                                color="dark"
                                                variant='outline'
                                                radius="xl"
                                                onClick={onClick}
                                                loading={loading}
                                            >
                                                Enroll Course
                                            </Button>
                                        </>
                                }
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Box>
                    <FooterLinks data={footerData} />
                </Box>
            </MainLayout>
        </>
    );
}

export default SingleCourse;