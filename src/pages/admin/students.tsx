import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Text } from '@mantine/core';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { StudentsTable, ExcelButton, PdfButton, PrintButton, SearchBar  } from '../../features/students';
import { colors } from '../../constants/colors';
import axios from 'axios';
import { urls } from '../../constants/urls';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { useAuthContext } from '../../features/authentication';


interface StudentData {
    totalStudents: number;
    totalPages: number;
    currentPage: number;
    students: {
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


const Students: NextPage = () => { 
    const [activePage, setPage] = useState(1);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const { refreshData } = useRefreshContext();
    const router = useRouter();
    const { auth, userMe } = useAuthContext();

    const limit = 10;
    const getAllStudents = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/students?page=${activePage}&limit=${limit}`);
            setStudentData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        studentData?.students.map(async (el, index) => {
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
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
            getAllStudents();
        }
    }, [activePage, refreshData, userMe]);

    if (!auth) return <></>
 
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
                                        src='/student.svg'
                                        height={350}
                                        width={400}
                                        alt="student icon"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Text mt={60} size={28} color={`${colors.primaryColor}`} weight={600}>Atego Students</Text>
                                <Group mt="lg">
                                    <Text>Total Students</Text>
                                    <Badge color='dark'>{studentData?.totalStudents} students</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Students who Enrolled this month</Text>
                                    <Badge color='dark'>Loading ...</Badge>
                                </Group>
                                <Group mt="lg">
                                    <Text>Comparison with previous month</Text>
                                    <Badge color='green'>loading ...</Badge>
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
                    <StudentsTable data={tableData()} type="student"/>
                    <Center mt="xl"> 
                        <Pagination total={studentData ? studentData.totalPages : 1} color='gray' page={activePage} onChange={setPage}/>
                    </Center>
                </Container>
            </AdminLayout>
        </>
    );
}

export default Students;