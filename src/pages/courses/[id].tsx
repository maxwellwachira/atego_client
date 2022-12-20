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
    const [paymentStatus, setPaymentStatus] = useState('');
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [topicData, setTopicData] = useState<TopicData | null>(null);
    const router = useRouter();
    const pathNameArr = router.asPath.split('/');
    const courseId = pathNameArr[pathNameArr.length - 1];

    const form = useForm({
        initialValues: {
            phoneNumber: ''
        },
        validate: {
            phoneNumber: (val) => {
                const length = val.length;
                const numArr = val.split('');
                if (length === 10) {
                    if (Number(numArr[0]) === 0 && (Number(numArr[1]) === 7 || Number(numArr[1]) === 1)) return null;
                    return 'Enter a valid Safaricom Number';
                }
                if (length === 12) {
                    if (
                        Number(numArr[0]) === 2 &&
                        Number(numArr[1]) === 5 &&
                        Number(numArr[2]) === 4 &&
                        (Number(numArr[3]) === 7 || Number(numArr[3]) === 1)
                    ) return null;
                    return 'Enter a valid Safaricom Number';
                }
                return 'Enter a valid Safaricom Number';
            }
        }
    });

    const onClose = () => {
        setOpen(false);
    }

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
        //check if user is authenticated
        if (!auth) return router.push('/auth/login');
        //Check if role is admin or tutor or course pricing is free
        if (userMe.role === "admin" || userMe.role === "tutor" || Number(props.courseContent[0].coursePricing) === 0) {
            const enrolment = await enroll(userMe.id, props.courseContent[0].id);
            if (enrolment?.message === "success") {
                setOpen(false);
                setPaymentStatus("success");
                setTimeout(() => {
                    router.push("/students/courses");
                }, 5000)
            }
        } else {
            setOpen(true);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const darajaData = {
                amount: Number(props.courseContent[0].coursePricing),
                phoneNumber: form.values.phoneNumber.length === 10 ? `254${form.values.phoneNumber.slice(1)}` : form.values.phoneNumber,
                accountNumber: `Payment for ${props.courseContent[0].courseTitle}`
            };
            const { data } = await axios.post(`${urls.baseUrl}/daraja/lipa-na-mpesa`, darajaData);
            if (data.transaction.ResponseCode == 0) {
                setCookie('checkoutRequestID', data.transaction.CheckoutRequestID);

                const paymentEvent = new EventSource(`${urls.baseUrl}/daraja/payment-event`);
                paymentEvent.addEventListener('open', () => {
                    console.log('SSE opened!');
                });

                paymentEvent.addEventListener('message', async (e) => {
                    //console.log(e.data);
                    const data = JSON.parse(e.data);
                    console.log(data)
                    if (data === "success") {
                        paymentEvent.close();
                        const query = await axios.post(`${urls.baseUrl}/daraja/lipa-na-mpesa-query`, { checkoutRequestID: getCookie('checkoutRequestID') });

                        if (Number(query.data.transaction.ResultCode) === 0) {
                            const enrolment = await enroll(userMe.id, props.courseContent[0].id);
                            if (enrolment?.message === "success") {
                                setLoading(false);
                                setOpen(false);
                                deleteCookie("checkoutRequestID");
                                setPaymentStatus("success");
                                setTimeout(() => {
                                    router.push("/students/courses");
                                }, 5000);
                            }
                        }
                    } else if (data === "failed") {
                        setOpen(false);
                        setLoading(false);
                        paymentEvent.close();
                        setPaymentStatus("failed");
                    }

                });

                paymentEvent.addEventListener('error', (e) => {
                    console.error('Error: ', e);
                });

            }
        } catch (error) {
            console.log(error)
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
                <meta name="description" content="Course Page" />
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
                        <Grid.Col md={6}>

                            {
                                paymentStatus === "failed" ?
                                    <Notification icon={<IconX size={18} />} color="red" title="Payment Error">
                                        Payment not successful. Refresh the page to try again
                                    </Notification>
                                    :
                                    paymentStatus === "success" ?
                                        <Notification icon={<IconCheck size={18} />} color="teal" title="Payment Successful">
                                            We have received your payment. Redirecting you to dashboard
                                        </Notification>
                                        : ""
                            }

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
                                            width={600}
                                            height={400}
                                            alt="course thumbnail"
                                        />
                                    )
                                }
                            </Center>
                            <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="lg">
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
                        <Grid.Col md={4}>
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
                                            >
                                                Enroll Course
                                            </Button>
                                        </>
                                }
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Modal
                    opened={open}
                    onClose={onClose}
                    size={500}
                    title={
                        <Text weight={600} color={`${colors.primaryColor}`} size={28}>Mpesa number to pay</Text>
                    }
                >
                    <Divider mb="xl" />
                    <Container>
                        <Center mb="xl">
                            <Image
                                src={LipaNaMpesa}
                                height={50}
                                width={200}
                                alt="Lipa na mpesa"
                            />
                        </Center>

                        <Text color="dimmed" size="sm"> Phone number format should be as shown: <br />Example 0702519598</Text>
                        <form onSubmit={form.onSubmit(() => handleSubmit())}>
                            <Stack>
                                <TextInput
                                    placeholder='Enter phonenumber'
                                    label='Phone Number '
                                    mb='xl'
                                    mt='lg'
                                    withAsterisk
                                    radius={15}
                                    value={form.values.phoneNumber}
                                    onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
                                    error={form.errors.phoneNumber}
                                />
                                <Button
                                    leftIcon={<IconCurrencyDollar />}
                                    color="dark"
                                    type='submit'
                                    loading={loading}
                                    loaderPosition="left"
                                    radius={15}
                                    mb="xl"
                                >
                                    Pay Now
                                </Button>
                            </Stack>
                        </form>
                    </Container>
                </Modal>
                <Box>
                    <FooterLinks data={footerData} />
                </Box>
            </MainLayout>
        </>
    );
}

export default SingleCourse;