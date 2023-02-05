import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {  Alert,  Center, Container,Paper, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconCheck } from '@tabler/icons';

import MainLayout from '../layouts/mainLayout/mainLayout';


const PaymentNotification: NextPage = () => {
   
    const router = useRouter();

    useEffect (() => {
        setTimeout(() => {
            router.push('/courses').then(() => router.reload());
        }, 5000);
    }, []);
    return (
        <>
        <Head>
            <title>Atego | Payment Cancellation</title>
            <meta name="description" content="Payment Cancellation Page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container>
                <Stack justify="center" align="center" mt={30}>
                    <Paper radius={40} withBorder style={{maxWidth: 400}}>
                      <Center>
                            <Alert icon={<IconCheck size={16} />} title="Payment status" color="red" radius={40} style={{maxWidth: 400}}>
                                You have cancelled Payment
                            </Alert>                   
                      </Center>
                    </Paper>
                </Stack>
            </Container>
        </MainLayout>
        </>
    );
}

export default PaymentNotification;