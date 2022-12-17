import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Button,
  Notification,
  Stack,
  createStyles,
  Container,
  Paper,
  Text,
  Divider,
  Grid,
  PasswordInput,
} from '@mantine/core';
import Image from 'next/image';
import { IconCheck, IconX } from '@tabler/icons';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import { usePasswordReset } from '../../features/authentication';

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
    margin: '30px 0',
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
    '&:hover': {
       opacity: 0.7,
       backgroundColor: `${colors.primaryColor}`,
       textDecoration: 'none'
        
    }
  },
}));

const ResetPage: NextPage = () => {
  const { classes } = useStyles();
  const { response, form, handleSubmit, clearResponse  } = usePasswordReset();
  
  return (
    <>
      <Head>
        <title>Atego | Reset Password</title>
        <meta name="description" content="Reset password Atego" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
      <Container mb={50}>
          <Text align="center" size={28} weight={600} color={`${colors.primaryColor}`}>Reset Password</Text>
          <Paper withBorder radius={40} mt={30}>
            <Grid>
                <Grid.Col md={6}>
                    <Stack align="center" justify="center" className={classes.loginGradient}>  
                        <Image 
                            src="/resetpassword.svg"
                            height={300}
                            width={300}
                            alt="reset password"
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col md={6} p={40}>
                    {response === 'success' ? (
                      <Notification icon={<IconCheck size={18} />} color="teal" title="Password Reset Successful" onClose={clearResponse} my="lg">
                      You can now log in with your new password
                      </Notification>
                    ): response ? (
                      <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={clearResponse} my="lg">
                        {response}
                      </Notification>
                      ): ''
                    }
                    <Divider label="Reset your password" labelPosition="center" my="lg" />
                    <form onSubmit={form.onSubmit(() => handleSubmit())}>
                        <Stack mt={30}>  
                          <PasswordInput
                            required
                            label="New Password"
                            placeholder="Your password"
                            radius={15}
                            mt={15}
                            {...form.getInputProps('password')}
                          />

                          <PasswordInput
                            required
                            label="Confirm New Password"
                            placeholder="Confirm password"
                            radius={15}
                            mt={15}
                            {...form.getInputProps('confirmPassword')} 
                          />                            
                          <Button type="submit" className={classes.submitButton} size="md">Reset Password</Button>
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

export default ResetPage;