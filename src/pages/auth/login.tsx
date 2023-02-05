import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Anchor, Button, Container, createStyles, Divider, Grid, Group, Notification, Paper, PasswordInput, Stack, Text, TextInput, } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconX } from '@tabler/icons';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import { useLoginUser } from '../../features/authentication';


const useStyles = createStyles((theme) => ({
    loginGradient: {
        background: `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`,
        borderRadius: '40px 0px 0px 40px',
        position: 'relative',
        height: '100%',
        [theme.fn.smallerThan("md")]: {
            borderRadius: '40px 40px 0px 0px',
        },
    },

    submitButton: {
        backgroundColor: `${colors.primaryColor}`,
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "10px 20px",
        textAlign: "center",
        color:  theme.colors.gray[0],
        fontWeight: 600,
        margin: '20px 0',
        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
        '&:hover': {
           opacity: 0.7,
           backgroundColor: `${colors.primaryColor}`,
           textDecoration: 'none'
            
        }
      },
}));

const Login: NextPage = () => {
    const { classes } = useStyles();
    const router = useRouter()
    const { form, handleSubmit, clearResponse, response, userMeData, loading } = useLoginUser();

    
    return (
        <>
        <Head>
            <title>Atego | Login</title>
            <meta name="description" content="Access your Atego School account and continue your journey in the exciting field of hardware and IoT. Stay connected with your classmates and instructors and keep track of your course progress." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container mb={50}>
                <Text align="center" size={28} weight={600} color={`${colors.primaryColor}`}>Login</Text>
                <Paper withBorder radius={40} mt={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" className={classes.loginGradient}>  
                                <Image 
                                    src="/login.svg"
                                    height={300}
                                    width={300}
                                    alt="login"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6} p={40}>
                        {response === "success" ? "" : response ? (
                            <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={clearResponse}>
                                {response}
                            </Notification>
                        ): ""}  
                            <Divider label="Welcome back" labelPosition="center" my="lg" />
                            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                                <Stack mt={30}>  
                                    <TextInput
                                        required
                                        label="Email"
                                        placeholder="hello@gmail.com"
                                        radius={15}
                                        mt={15}
                                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                        error={form.errors.email && 'Invalid email'}
                                    />

                                    <PasswordInput
                                        required
                                        label="Password"
                                        placeholder="Your password"
                                        radius={15}
                                        mt={15}
                                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                        error={form.errors.password && 'Password should include at least 6 characters'}
                                    />
                                    <Anchor
                                        href='/auth/forgot-password'
                                        color="dimmed"
                                        size="xs"
                                    >
                                        Forgot Password?
                                    </Anchor>    

                                    <Group position="apart" mt="sm">
                                    <Anchor
                                        href='/auth/register'
                                        color="dimmed"
                                        size="xs"
                                    >
                                        Don't have an account? Register
                                    </Anchor>
                                    <Button type="submit" className={classes.submitButton} size="md" loading={loading}>Login</Button>
                                    </Group>
                                </Stack>

                                
                            </form>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </MainLayout>
        </>
    );
}

export default Login;