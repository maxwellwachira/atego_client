import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  TextInput,
  Button,
  Anchor,
  Stack,
  createStyles,
  Container,
  Paper,
  Text,
  Divider,
  Grid,
  Notification
} from '@mantine/core';
import Image from 'next/image';
import { useViewportSize } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import { useForgetPassword } from '../../features/authentication';

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
    color: theme.colors.gray[0],
    fontWeight: 600,
    margin: '30px 0',
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
    '&:hover': {
      opacity: 0.7,
      backgroundColor: `${colors.primaryColor}`,
      textDecoration: 'none'

    }
  },
}));

const ForgotPass: NextPage = () => {
  const { classes } = useStyles();
  const { response, form, handleSubmit, clearResponse } = useForgetPassword();
  const { width } = useViewportSize();

  return (
    <>
      <Head>
        <title>Atego | Forgot Password</title>
        <meta name="description" content="Forgot your Atego School password? No problem. Our secure process will help you reset your password and get back to your hardware and IoT studies in no time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container mb={50}>
          <Text align="center" size={18} weight={600} color={`${colors.primaryColor}`} style={{display: width > 768 ? 'none' : ''}}>Forgot Password?</Text>
          <Paper withBorder radius={40} mt={30}>
            <Grid>
              <Grid.Col md={6}>
                <Stack align="center" justify="center" className={classes.loginGradient}>
                  <Image
                    src="/forgotpassword.svg"
                    height={300}
                    width={300}
                    alt="forgot password"
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col md={6} p={40}>
                {response === 'success' ? (
                  <Notification icon={<IconCheck size={18} />} color="teal" title="Password Reset Link" onClose={clearResponse} my="lg">
                    Check email to reset password
                  </Notification>
                ) : response ? (
                  <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={clearResponse} my="lg">
                    {response}
                  </Notification>
                ) : ''
                }
                <Divider label="Don't worry, you are not alone" labelPosition="center" my="lg" />
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
                    <Anchor
                      href='/auth/login'
                      color="dimmed"
                      size="xs"
                      mt={15}
                    >
                      Remembered password? Login
                    </Anchor>
                    <Button type="submit" className={classes.submitButton} size="md">Recover Password</Button>
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

export default ForgotPass;