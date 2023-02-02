import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { MessagingTable  } from '../../features/messaging';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import sentSms from '../../assets/sentsms.jpg'

const data = [
    {
        topic: 'Assignment Reminder',
        recipient: '254703519593',
        message: "Dear John, Kindly finish your assignment..."
    },
    {
        topic: 'Payment Reminder',
        recipient: '214703519593',
        message: "Dear John, Kindly finish your assignment..."
    },
    {
        topic: 'Assignment Reminder',
        recipient: '224703519593',
        message: "Dear John, Kindly finish your assignment..."
    },
    {
        topic: 'Payment Reminder',
        recipient: '244703519593',
        message: "Dear John, Kindly finish your assignment..."
    },
    {
        topic: 'Assignment Reminder',
        recipient: '234703519593',
        message: "Dear John, Kindly finish your assignment..."
    }

];


const Payments: NextPage = () => { 
    const [activePage, setPage] = useState(1);
    const router = useRouter();
    const { auth, userMe } = useAuthContext();

    useEffect(() =>{
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
        }
    }, [userMe]);

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
                    <Paper withBorder mt="lg" p="md" radius={40}>
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image 
                                        src={sentSms}
                                        height={350}
                                        width={400}
                                        alt="sent sms"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Text mt={60} size={28} color={`${colors.primaryColor}`} weight={600}>Sent SMS</Text>
                                <Group mt="lg">
                                    <Text>Total SMS</Text>
                                    <Badge color='dark'>100,000 SMS</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>SMS sent this month</Text>
                                    <Badge color='dark'>20,000 SMS</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Total Cost incurred</Text>
                                    <Badge color='dark'>2000 KES</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Total Cost incurred this month</Text>
                                    <Badge color='dark'>1000 KES</Badge>
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <MessagingTable data={data} />
                    <Center mt="xl"> 
                        <Pagination total={4} color='gray' page={activePage} onChange={setPage}/>
                    </Center>
                </Container>
            </AdminLayout>
        </>
    );
}

export default Payments;