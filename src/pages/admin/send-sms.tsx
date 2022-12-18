import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Badge, Button, Center, Container, createStyles, Grid, Group, Paper, Radio, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';

import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';


const useStyles = createStyles((theme) => ({
    button: {
        background: `${colors.secondaryColor}`,

        '&:hover': {
            background: `${colors.secondaryColor}`,
            opacity: 0.7
        }
    },

}));

const Tutors: NextPage = () => {
    const { classes } = useStyles();
    const { auth, userMe } = useAuthContext();
    const router = useRouter();
    const { width } = useViewportSize();
    const form = useForm({
        initialValues: {
            recipients: '',
            topic: '',
            message: '',
        }
    });

    useEffect(() => {
        // if(!auth || userMe.role !== "admin") router.push('/auth/logout');
    }, []);

    // if (!auth || userMe.role !== "admin") return <></>

    return (
        <>
            <Head>
                <title>Atego | Send SMS</title>
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
                                        src='/sms.svg'
                                        height={width > 768 ? 600 : 300}
                                        width={width > 768 ? 500 : 300}
                                        alt="sms"
                                    />
                                </Center>
                            </Grid.Col>
                            <Grid.Col md={6} p="xl">
                                <Group mt="lg" position="apart">
                                    <Text size={28} color={`${colors.primaryColor}`} weight={600}>Send SMS</Text>
                                    <Text>Airtime Balance</Text>
                                    <Badge color='green' size='lg'>452.00 KES</Badge>
                                </Group>
                                <Radio.Group
                                    name="recipients"
                                    orientation="vertical"
                                    label="Recipient(s)"
                                    description="SMS recipients"
                                    withAsterisk
                                    mt="xl"
                                >
                                    <Radio value="allStudents" label="All Students" color='dark' />
                                    <Radio value="allTutors" label="All Tutors" color='dark' />
                                    <Radio value="selectRecipients" label="Select Recipients" color='dark' />
                                    <Radio value="enterNumber" label="Enter Number" color='dark' />
                                </Radio.Group>

                                <form onSubmit={form.onSubmit(() => { })}>
                                    <Stack>
                                        <TextInput
                                            required
                                            label="Subject"
                                            placeholder="SMS Subject"
                                            mt="xl"
                                            radius={15}
                                            value={form.values.topic}
                                            onChange={(event) => form.setFieldValue('topic', event.currentTarget.value)}
                                        />
                                        <Textarea
                                            placeholder="Type Message"
                                            label={(<Group position="apart"><Text>Message</Text> <Badge color="dark" size='sm'>Word Count: {form.values.message.length}</Badge></Group>)}
                                            mt="xl"
                                            radius={15}
                                            value={form.values.message}
                                            onChange={(event) => form.setFieldValue('message', event.currentTarget.value)}
                                        />
                                      
                                        <Button type="submit" mt="xl" color='dark' radius={15}>Send</Button>
                            
                                    </Stack>

                                </form>

                            </Grid.Col>
                        </Grid>
                    </Paper>

                </Container>
            </AdminLayout>
        </>
    );
}

export default Tutors;