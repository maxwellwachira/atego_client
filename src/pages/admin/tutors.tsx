import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { StudentsTable, ExcelButton, PdfButton, PrintButton, SearchBar  } from '../../features/students';
import { colors } from '../../constants/colors';
import tutorImage from '../../assets/tutor.jpg';
import axios from 'axios';
import { urls } from '../../constants/urls';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { useAuthContext } from '../../features/authentication';

interface TutorData {
    totalTutors: number;
    totalPages: number;
    currentPage: number;
    tutors: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        role: string;
        active: boolean;
        disabled: boolean;
        createdAt: string;
        updatedAt: string;
    }[]
};

interface TableData {
    id: string;
    count: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
};

const Tutors: NextPage = () => { 
    const [activePage, setPage] = useState(1);
    const [tutorData, setTutorData] = useState<TutorData | null>(null);
    const { refreshData } = useRefreshContext();
    const router = useRouter();
    const { auth, userMe } = useAuthContext();

    const limit = 10;
    const getAllTutors = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/tutors?page=${activePage}&limit=${limit}`);
            setTutorData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        tutorData?.tutors.map(async (el, index) => {
            let studentData = {
              id: el.id,
              count: (activePage - 1) * limit + ++index,
              firstName: el.firstName,
              lastName: el.lastName,
              phoneNumber: el.phoneNumber,
              email: el.email
            }
            data.push(studentData);
        });
        
        return data;
    }

    useEffect(() => {
        // if(!auth || userMe.role !== "admin") router.push('/auth/logout');
        getAllTutors();
    }, [activePage, refreshData]);

    // if (!auth || userMe.role !== "admin") return <></>
 
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
                                        src={tutorImage}
                                        height={300}
                                        width={380}
                                        alt="tutors"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Text mt={60} size={28} color={`${colors.primaryColor}`} weight={600}>Atego Tutors</Text>
                                <Group mt="lg">
                                    <Text>Total Tutors</Text>
                                    <Badge color='dark'>{tutorData?.totalTutors} Tutors</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Tutors who Enrolled this month</Text>
                                    <Badge color='dark'>Loading ...</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Comparison with previous month</Text>
                                    <Badge color='green'>Loading ...</Badge>
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
                    <StudentsTable data={tableData()} type="tutor"/>
                    <Center mt="xl"> 
                        <Pagination total={tutorData ? tutorData.totalPages : 1} color='gray' page={activePage} onChange={setPage}/>
                    </Center>
                </Container>
            </AdminLayout>
        </>
    );
}

export default Tutors;