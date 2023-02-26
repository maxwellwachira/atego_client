import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Anchor, Button, Checkbox, Container, createStyles, Notification, Divider, Grid, Group, Paper, PasswordInput, Stack, Text, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import { useRegisterUser } from '../../features/authentication';



const useStyles = createStyles((theme) => ({
    registerGradient: {
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

const Register: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();
    const { form, response, loading, handleSubmit, clearResponse } = useRegisterUser();

    return (
        <>
        <Head>
            <title>Atego | Register</title>
            <meta name="description" content="Sign up for Atego School's cutting-edge hardware and IoT courses. Our programs, taught by industry experts, will give you the skills and knowledge you need to succeed in the world of technology" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container mb={50}>
                <Text align="center" size={18} weight={600} color={`${colors.primaryColor}`} style={{display: width > 768 ? 'none' : ''}}>Sign Up</Text>
                <Paper withBorder radius={40} mt={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" className={classes.registerGradient}>  
                                <Image 
                                    src="/register.svg"
                                    height={300}
                                    width={300}
                                    alt="contact"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6} p={40}>
                            {response === 'success' ? (
                                <Notification icon={<IconCheck size={18} />} color="teal" title="Registration Successful" onClose={clearResponse}>
                                Check email to activate your account
                                </Notification>
                            ): response ? (
                                <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={clearResponse}>
                                    {response}
                                </Notification>
                            ): ''}
                            <Divider label="Register" labelPosition="center" my="lg" />
                            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                                <Stack mt={20}>
                                    <Grid>
                                        <Grid.Col md = {6}>
                                        <TextInput
                                            required
                                            label="First Name"
                                            placeholder="Your first name"
                                            radius={15}
                                            value={form.values.firstName}
                                            onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                        />
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                        <TextInput
                                            required
                                            label="Last Name"
                                            placeholder="Your last name"
                                            radius={15}
                                            value={form.values.lastName}
                                            onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                                        />
                                        </Grid.Col>
                                    </Grid>

                                    <TextInput
                                        required
                                        label="Email"
                                        placeholder="hello@gmail.com"
                                        radius={15}
                                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                        error={form.errors.email && 'Invalid email'}
                                    />

                                    <TextInput
                                        required
                                        label="Phone Number"
                                        placeholder="254703519593"
                                        radius={15}
                                        value={form.values.phoneNumber}
                                        onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
                                    />

                                    <PasswordInput
                                        required
                                        label="Password"
                                        placeholder="Your password"
                                        radius={15}
                                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                        error={form.errors.password && 'Password should include at least 6 characters'}
                                    />


                                    <Checkbox
                                        label="I accept terms and conditions"
                                        mt={15}
                                        checked={form.values.terms}
                                        onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                    />
                                </Stack>

                                <Group position="apart" mt="xl">
                                    <Anchor
                                        href='/auth/login'
                                        color="dimmed"
                                        size="xs"
                                    >        
                                        Already have an account? Login
                                    </Anchor>
                                    <Button type="submit" className={classes.submitButton} size="md" loading={loading}>Register</Button>
                                </Group>
                            </form>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </MainLayout>
        </>
    );
}

export default Register;