import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { PaymentsTable, ExcelButton, PdfButton, PrintButton, SearchBar  } from '../../features/payments';
import { colors } from '../../constants/colors';
import moneyImage from '../../assets/money.jpg';
import { useAuthContext } from '../../features/authentication';

const data = [
    {
        firstName: 'John',
        lastName: 'Kamau',
        phoneNumber: '254703519593',
        amount: 5000
    },
    {
        firstName: 'Mary',
        lastName: 'Otieno',
        phoneNumber: '214703519593',
        amount: 6000
    },
    {
        firstName: 'Dennis',
        lastName: 'Okumu',
        phoneNumber: '224703519593',
        amount: 7000
    },
    {
        firstName: 'Martha',
        lastName: 'Wachira',
        phoneNumber: '244703519593',
        amount: 1000
    },
    {
        firstName: 'Teresa',
        lastName: 'Omiko',
        phoneNumber: '234703519593',
        amount: 3000
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
                    <Paper withBorder mt="lg" p="md">
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image 
                                        src={moneyImage}
                                        height={350}
                                        width={400}
                                        alt="payments"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Text mt={60} size={28} color={`${colors.secondaryColor}`} weight={600}>Atego Payments</Text>
                                <Group mt="lg">
                                    <Text>Total Payments</Text>
                                    <Badge color='dark'>210,000 KES</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>This Month payment</Text>
                                    <Badge color='dark'>20,000 KES</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Comparison with previous month</Text>
                                    <Badge color='red'>10 % fall</Badge>
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <Paper mt={40}  p={10}>
                        <Grid>
                            <Grid.Col md={8}>
                                <Group>
                                    <PrintButton />
                                    <ExcelButton />
                                    <PdfButton />
                                </Group>
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <Center>
                                    <SearchBar />
                                </Center>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <PaymentsTable data={data} />
                    <Center mt="xl"> 
                        <Pagination total={4} color='gray' page={activePage} onChange={setPage}/>
                    </Center>
                </Container>
            </AdminLayout>
        </>
    );
}

export default Payments;