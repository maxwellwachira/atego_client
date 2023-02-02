import { Button, Container, createStyles, Paper, Stack, Text } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { useViewportSize } from '@mantine/hooks';

import { colors } from '../constants/colors';

const useStyles = createStyles((theme) => ({
  button: {
    background: `${colors.primaryColor}`,
    maxWidth: 400,
    '&:hover': {
      background: `${colors.primaryColor}`,
      opacity: 0.7
    }
  }
}));

const Custom404 = () => {
  const { classes } = useStyles();
  const { width } = useViewportSize();
  return (
    <>
      <Head>
        <title>Atego | 404</title>
        <meta name="description" content="Page not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container mt={40}>
        <Stack justify="center" align="center" style={{ height: "80vh" }}>
          <Paper radius={20} withBorder={width > 768 ? true : false} >
            <Stack justify="center" align="center" mb={30} px="xl" >
              <Text weight={600} mt={40} fz={20}>404 Error - Page Not Found</Text>
              <Button
                component='a'
                href='/'
                className={classes.button}
                radius={15}
                size='md'
                my="lg"
              >
                Go Back to Home
              </Button>
              <Image
                src="/404.svg"
                height={width > 768 ? 400 : 300}
                width={width > 768 ? 400 : 300}
                alt="Page not found"
              />

            </Stack>
          </Paper>
        </Stack>
      </Container>
    </>
  );

}

export default Custom404;