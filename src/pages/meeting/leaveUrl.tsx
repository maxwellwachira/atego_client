import { Box, Container, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { colors } from '../../constants/colors';
import clapImage from '../../assets/claps.jpg';
import Image from 'next/image';
import { useAuthContext } from '../../features/authentication';

const About: NextPage = () => {
    const { userMe, auth } = useAuthContext();
    const { width } = useViewportSize();
  return (
    <>
      <Head>
        <title>Atego | Meeting End</title>
        <meta name="description" content="About Atego" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container mt="md">
            <Stack justify="center" align="center">
                {auth ? (
                    <Text weight={600} size={28} color={`${colors.primaryColor}`}>Dear {`${userMe.firstName} ${userMe.lastName}`},</Text>   
                    ) : ""}
                <Text> Thank you for joining the live session.</Text>
                <Text>I hope you enjoyed the lesson.</Text>
                <Image 
                    src={clapImage}
                    height={width > 768 ? 500 : 300}
                    width={width > 768 ? 500 : 300}
                    alt="end of live session"
                />
            </Stack>
                    
        </Container>
        <Box>
            <FooterLinks data={footerData}/>
        </Box>
      </MainLayout>
    </>
  );
}

export default About;