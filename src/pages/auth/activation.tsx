import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Alert, Button, Center, Container, Grid, Paper, Stack } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { useActivateUser } from '../../features/authentication/hooks/useActivateUser';
import successImage  from '../../assets/success.jpg';

const ForgotPass: NextPage = () => {
    const { buttonClicked, response, onClick } = useActivateUser();
  return (
    <>
      <Head>
        <title>Atego | Account Activation</title>
        <meta name="description" content="Account Activation Atego" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container>
            {response === 'success' ? (
              <Grid>
                <Grid.Col md={6}>
                  <Stack justify="center" align="center" mt={30}>
                    <Paper radius={40} withBorder style={{maxWidth: 400}}>
                      <Center>
                        <Alert icon={<IconCheck size={16} />} title="Success" color="green" radius={40} style={{maxWidth: 400}}>
                          {buttonClicked ? 'Activation Link has been sent. Check Email' : 'Account Activation was successful. Redirecting you to Sign'}
                        </Alert> 
                      </Center>
                    </Paper>
                  </Stack>
                </Grid.Col>
                <Grid.Col md={6}>
                  <Center>
                        {buttonClicked ? '' : (
                            <Image 
                                src={successImage}
                                height={300}
                                width={300}
                                alt="trophy"
                            />
                        )}
                  </Center>
                </Grid.Col>                
              </Grid>
            ): response ? (
              <Stack justify="center" align="center" mt={30}>
                <Paper radius={40} withBorder style={{maxWidth: 400}}>
                  <Center>
                    <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red" radius={40} style={{maxWidth: 400}}>
                        Account Activation Failed. <br /> Reason: {response} <br />
                        <Button color="red" onClick={onClick} loading={ !response? true : false } radius={15} my="lg">Resend Activation Link</Button>
                    </Alert>
                  </Center>
                </Paper>
              </Stack>
            ): ''}
        </Container>
      </MainLayout>
    </>
  );
}

export default ForgotPass;