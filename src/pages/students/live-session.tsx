import { useEffect } from 'react';
import { Button, Center, Container, Grid, Paper, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useViewportSize } from '@mantine/hooks';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import livesession from '../../assets/livesession.jpg';

const LiveSession: NextPage = () => {
    const { auth, userMe } = useAuthContext();
    const router = useRouter();
    const { width } = useViewportSize();

    const getGreetings = () => {
        const date = new Date();
        const hourString = date.getHours();
        let greetings = '';

        if (hourString < 12) greetings = "Good Morning";
        if (hourString >= 12 && hourString < 17) greetings = "Good Afternoon";
        if (hourString >= 17 && hourString <= 24) greetings = "Good Evening";

        return greetings;
    }

    useEffect(() => {
        if (!auth) router.push('/auth/logout');
    }, [])

    if (!auth) return <></>

    return (
        <>
            <Head>
                <title>Atego Student Live Session</title>
                <meta name="description" content="Atego School" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Center>
                        <Text mt="xl" weight={600} size={25} color={`${colors.primaryColor}`}>{`${getGreetings()} ${userMe.firstName} ${userMe.lastName}`}</Text>
                    </Center>
                    <Paper withBorder p="xl" radius={40} mt={25}>
                    <Grid gutter={40}>
                        <Grid.Col md={7}>
                            <Center>
                                <Image 
                                    src={livesession}
                                    height={width > 768 ? 280 : 250}
                                    width={width > 768 ? 400 : 300}
                                    alt="live session"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={5}>
                            <Stack justify="center" p="xl" style={{minHeight: width > 768 ? 280 : 0}}>    
                                <Text mt={40}>Click the button to start a live session</Text>
                                <Button
                                    component='a'
                                    href='/meeting/live-session'
                                    variant='outline'
                                    color='green'
                                    mt="xl"
                                    radius="xl"
                                    fullWidth

                                >
                                    Start Live Session
                                </Button>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Paper>
                </Container>
            </StudentLayout>
        </>
    )
}

export default LiveSession;