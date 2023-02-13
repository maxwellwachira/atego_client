import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Stack, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import { AddFaqButton, FaqTable } from '../../features/faq';
import axios from 'axios';
import { urls } from '../../constants/urls';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';


interface TableData {
    id: string;
    count: number;
    question: number;
    answer: string;
};

interface FaqData {
    totalFaqs: number;
    totalPages: number;
    currentPage: number;
    faqs: {
        id: string;
        count: number;
        question: number;
        answer: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

const Payments: NextPage = () => {
    const [activePage, setPage] = useState(1);
    const [faqData, setFaqData] = useState<FaqData | null>(null);
    const router = useRouter();
    const { auth, userMe } = useAuthContext();
    const { refreshData } = useRefreshContext();
    const limit = 10;

    const tableData = () => {
        let data: TableData[] = [];
        faqData?.faqs.map((el, index) => {
            let faqData = {
                id: el.id,
                count: (activePage - 1) * limit + ++index,
                question: el.question,
                answer: el.answer
            }
            data.push(faqData);
        });

        return data;
    }

    const getAllFaqs = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/faq?page=${activePage}&limit=${limit}`);
            setFaqData(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (!auth) router.push('/auth/logout');
        if (userMe.role) {
            if (userMe.role !== "admin") router.push('/403');
            getAllFaqs();
        }
    }, [activePage, refreshData, userMe]);

    if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Students</title>
                <meta name="description" content="Admin Atego" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
                <Container>
                    {/* <Paper withBorder mt="lg" p="md" radius={40}>
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image
                                        src="/faq.svg"
                                        height={300}
                                        width={300}
                                        alt="payments"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Stack align='center' justify='center' style={{ height: '100%' }}>
                                    <Text size={28} color={`${colors.primaryColor}`} weight={600}>Atego FAQs</Text>
                                    <Group mt="md">
                                        <Text>Total FAQs:</Text>
                                        <Badge color='dark' size='lg'>10 Q&A</Badge>
                                    </Group>
                                    {/* <Group mt="sm">
                                        <Text>Published FAQs:</Text>
                                        <Badge color='dark' size='lg'>8 Q&A</Badge>
                                    </Group>
                                    <Group mt="sm">
                                        <Text>Draft FAQs:</Text>
                                        <Badge color='dark' size='lg'>2 Q&A</Badge>
                                    </Group> 
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Paper> */}
                    <Paper mt={40} p={10} withBorder radius={15}>
                        <Grid mt="lg">
                            <Grid.Col md={8}>
                                <Text mx="xl" color={colors.primaryColor} fz={20} weight={600}>FAQs Table</Text>
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <Center>
                                   <AddFaqButton />
                                </Center>
                            </Grid.Col>
                        </Grid>
                        <FaqTable data={tableData()}/>
                        <Center mt="xl">
                            <Pagination total={1} color='gray' page={activePage} onChange={setPage} my="lg" />
                        </Center>
                    </Paper>
                </Container>
            </AdminLayout>
        </>
    );
}

export default Payments;