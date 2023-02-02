import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Center, Container, Divider, FileInput, Grid, Group, Modal, Pagination, Paper, Select, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { IconAlertCircle, IconCheck, IconUpload } from '@tabler/icons';

import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import { urls } from '../../constants/urls';
import UploadsTable from '../../features/uploads/components/uploadsTable/uploadsTable';
import { useRefreshContext } from '../../features/lms/contexts/refreshDataContexProvider';
import { AdminLayout } from '../../layouts/adminLayout/adminLayout';

interface CategoryData {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    categories: {
        id: string;
        categoryName: string;
        createdAt: string;
        updatedAt: string;
    }[]
};

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

interface SelectData {
    value: string;
    label: string;
};

const Uploads: NextPage = () => {
    const [activePage, setPage] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [uploadData, setUploadData] = useState<UploadData | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const { refreshData, toggleRefreshData } = useRefreshContext();
    const router = useRouter();

    const limit = 12;

    const { auth, userMe } = useAuthContext();

    const form = useForm({
        initialValues: {
            file: null,
            CategoryId: '',
            UserId: ''
        }
    });

    const onClose = () => {
        setOpen(false);
    }

    const getAllCategories = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/category?page=${1}&limit=${1000}`);
            setCategoryData(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllUploads = async() => {
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
                size: Number((el.fileSize / (10**6)).toFixed(2)),
                createdAt: (new Date(el.createdAt)).toLocaleString()
            }
            data.push(upload);
        });
        
        return data;
    }

    const categorySelectData = () => {
        let data: SelectData[] = [];
        categoryData?.categories.map((el, index) => {
            let selectData = {
                value: el.id,
                label: el.categoryName,
            }
            data.push(selectData);
        });

        return data;
    }

    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            setLoading(true);
            const uploadData  = { ...form.values, file};
            try {
                const { data } = await axios.post(`${urls.baseUrl}/upload`, uploadData, {headers: {
                    'Content-Type': 'multipart/form-data'
                  }});
                //console.log(data);
                toggleRefreshData();
                setLoading(false);
                setResponse(data.message);
                setTimeout(() => {setResponse('')}, 5000);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if(!auth) router.push('/auth/logout');
        if(userMe.role){
            if(userMe.role !== "admin") router.push('/403');
            getAllCategories();
            getAllUploads();
            form.setFieldValue('UserId', userMe.id);
        }
    }, [activePage, refreshData, userMe]);

    if (!auth) return <></>

    return (
        <>
         <Head>
            <title>Atego | Admin Uploads</title>
            <meta name="description" content="Live session" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminLayout>
            <Container>
                <Paper withBorder  mt='xl' radius={40}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Center>
                                <Image 
                                    src='/uploads.svg'
                                    height={350}
                                    width={400}
                                    alt="uploads"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Stack p='xl'>
                            <Text size={28} color={`${colors.primaryColor}`} weight={600} mt="lg" >Uploads</Text>
                                <Group position='apart'>
                                    <Text>Total Uploads:</Text>
                                    <Badge color="dark">{uploadData?.totalUploads} Uploads</Badge>
                                </Group>
                                <Button
                                    mt="xl"
                                    radius="xl"
                                    size='md'
                                    variant='outline'
                                    color='green'
                                    leftIcon={<IconUpload />}
                                    onClick={() => setOpen(true)}
                                >
                                    Click to Upload File
                                </Button>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <UploadsTable data={tableData()} type="admin"/>
                <Center mt="xl"> 
                    <Pagination total={uploadData ? uploadData.totalPages : 2} color='gray' page={activePage} onChange={setPage}/>
                </Center>
            </Container>
        </AdminLayout>
        <Modal
            opened={open}
            onClose={onClose}
            title={<Text size={25} color={`${colors.primaryColor}`} weight={600} ><IconUpload /> Upload File</Text>}
            size="600px"
        >
            <Divider />
            <Container>
                {response === 'success' ? (   
                    <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                        File added Successfully
                    </Alert>           
                ): response ? (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                        Reason: {response} <br />
                    </Alert>
                ): ''}
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                    <Stack>
                        <FileInput 
                            withAsterisk
                            label="Upload File" 
                            placeholder="Click to select file" 
                            icon={<IconUpload size={14} />}
                            mt="lg"
                            radius={15}
                            value={file}
                            onChange={setFile}  
                        />
                        <Select 
                            label="Category"
                            placeholder='Select Course Category'
                            withAsterisk
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps('CategoryId', { type: 'input' })}
                            data={categorySelectData()}
                            mt="md"
                            radius={15}
                            error={form.errors.CategoryId}
                        />
                        <Button 
                            rightIcon={<IconCheck />}
                            color="green"
                            my="xl"
                            type='submit'
                            loading={loading}
                            loaderPosition="left"
                            px="xl"
                            radius={15}
                        >
                            Upload 
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Modal>
        </>
    )

}

export default Uploads;