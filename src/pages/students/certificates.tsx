import { useEffect } from 'react';
import { Card, Center, Container, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { IconTrophy } from '@tabler/icons';
import { useAuthContext } from '../../features/authentication';


const Certificates: NextPage = () => {
    const { auth } = useAuthContext();
    const router = useRouter();
    
    useEffect(() => {
        if (!auth) router.push('/auth/logout');
    }, [])

    if (!auth) return <></>

    return (
        <>
            <Head>
                <title>Atego Student Dashboard</title>
                <meta name="description" content="Atego School" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Center mt="xl">
                        <Card withBorder px={30} radius={20} mt="xl" style={{maxWidth: 350}}>
                            <Stack align="center">
                                <IconTrophy color='green' size={45} />
                                <Text mt="lg">You have no Certificate</Text>
                                <Text mb="lg">Complete a course to get one</Text>
                            </Stack>
                        </Card>
                    </Center>
                </Container>
            </StudentLayout>
        </>
    )
}

export default Certificates;