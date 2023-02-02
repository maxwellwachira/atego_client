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
                <meta name="description" content="Join the future of technology with our online IoT and Hardware Academy. Learn from experts and gain hands-on experience with the latest hardware and software technologies. Enroll now and take your career to the next level! Best IoT school in 2023" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container>
                    <Text align="center" size={28} weight={600} color={`${colors.primaryColor}`} mb="lg">About Atego</Text>
                    At Atego, we are reimagining STEM education and training to ensure every student has the technical skills necessary for future personal development in the workplace. We offer to learn pathways and programs for individuals at every stage of their STEM journey; young students, educators, university students, members of the workforce to the general public at large.
                    Explore Learn Innovate
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
                            Our vision strives to connect our African people to the future they envision for themselves. Our vision will be realized when people working in tech in Africa have the same earning potential as their global counterparts possessing the same aptitude and mindset.
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
                            Atego School is a multi-disciplinary learning accelerator school committed to closing the skills gap in Africa's Hardware and IoT space.  We aim to deliver transformative tech-based learning to high-potential techpreneurs and job seekers.
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