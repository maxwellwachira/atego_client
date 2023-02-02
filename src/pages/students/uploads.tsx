import { useEffect, useState } from 'react';
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import { urls } from '../../constants/urls';
import UploadsTable from '../../features/uploads/components/uploadsTable/uploadsTable';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { StudentLayout } from '../../layouts/studentLayout/studentLayout';

interface UploadData {
    totalUploads: number;
    totalPages: number;
    currentPage: number;
    uploads: {
        id: string;
        fileName: string;
        fileExtension: string;
        CategoryId: string;
        fileType: string;
        fileSize: number;
        filePath: string;
        UserId: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

interface TableData {
    id: string;
    count: number;
    fileName: string;
    fileExtension: string;
    type: string;
    size: number;
    createdAt: string;
}

const Uploads: NextPage = () => {
    const [activePage, setPage] = useState(1);
    const [uploadData, setUploadData] = useState<UploadData | null>(null);
    const { refreshData } = useRefreshContext();
    const router = useRouter();

    const limit = 12;

    const { auth } = useAuthContext();

    const getAllUploads = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/upload`);
            setUploadData(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const tableData = () => {
        let data: TableData[] = [];
        uploadData?.uploads.map(async (el, index) => {
            let upload = {
                id: el.id,
                count: (activePage - 1) * limit + ++index,
                fileName: el.fileName,
                fileExtension: el.fileExtension,
                type: el.fileType,
                size: Number((el.fileSize / (10 ** 6)).toFixed(2)),
                createdAt: (new Date(el.createdAt)).toLocaleString()
            }
            data.push(upload);
        });

        return data;
    }

    useEffect(() => {
        if (!auth) router.push('/auth/logout');
        getAllUploads();
    }, [activePage, refreshData]);

    if (!auth) return <></>

    return (
        <>
            <Head>
                <title>Atego | Students Uploads</title>
                <meta name="description" content="Atego school" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Paper withBorder mt='xl' radius={40}>
                        <Grid>
                            <Grid.Col md={6}>
                                <Center>
                                    <Image
                                        src='/uploads.svg'
                                        height={350}
                                        width={400}
                                        alt="uploads icon"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Stack p='xl' style={{ minHeight: 350 }} justify="center" align="center">
                                    <Text size={28} color={`${colors.primaryColor}`} weight={600} mt="lg" >Uploads</Text>
                                    <Group position='apart'>
                                        <Text>Total Uploads:</Text>
                                        <Badge color="dark">{uploadData?.totalUploads} Uploads</Badge>
                                    </Group>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <UploadsTable data={tableData()} type="student" />
                    <Center mt="xl">
                        <Pagination total={uploadData ? uploadData.totalPages : 2} color='gray' page={activePage} onChange={setPage} />
                    </Center>
                </Container>
            </StudentLayout>
        </>
    )

}

export default Uploads;