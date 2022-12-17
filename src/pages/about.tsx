import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Center, Container, Grid, Text } from '@mantine/core';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';
import Subscribe from '../components/subscribe/subscribe';

const About: NextPage = () => {

    return (
        <>
            <Head>
                <title>Atego | About</title>
                <meta name="description" content="Atego About Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container>
                    <Text align="center" size={28} weight={600} color={`${colors.primaryColor}`} mb="lg">About Atego</Text>
                    <Text>At Atego, we are reimagining STEM education and training to ensure every student is equipped with the technical skills necessary for the future of work.</Text>
                    <Text>we offer learning pathways and programs for individuals at every stage of their STEM journey, including: young students and educators, community college and university students and faculty, and members of the workforce.</Text>
                    <Text size={20} weight={5500} color={`${colors.primaryColor}`}>Explore Learn Innovate</Text>

                    <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Vision</Text>
                    <Grid>
                        <Grid.Col md={6}>
                            <Center>
                                <Image
                                    src="/vision.svg"
                                    height={280}
                                    width={300}
                                    alt="vision"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={6} mt={20}>
                            <Text>
                                Our vision is one that strives to connect our African people to the future they envision for themselves.  This is the goal in-front of us and it keeps us striving for more. Simply put…we will know we are succeeding when people working in tech in Africa have the same earning potential as their global counterparts possessing the same aptitude and mindset.
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Mission</Text>
                    <Grid>
                        <Grid.Col md={6}>
                            <Center>
                                <Image
                                    src='/mission.svg'
                                    height={280}
                                    width={300}
                                    alt="mission"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={6} mt={20}>
                            <Text mt={20}>
                                Atego School is a multi-disciplinary learning-accelerator committed to closing the skills-gap in Africa's Computer Programming while delivering transformative tech-based learning to high-potential Tech-preneurs and jobseekers
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Subscribe />
                <FooterLinks data={footerData} />
            </MainLayout>
        </>
    );
}

export default About;