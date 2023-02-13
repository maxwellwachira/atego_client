import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Accordion, Center, Container, Grid, Text } from '@mantine/core';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';
import Subscribe from '../components/subscribe/subscribe';
import axios from 'axios';
import { urls } from '../constants/urls';
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons';

interface FaqData {
    totalFaqs: number;
    totalPages: number;
    currentPage: number;
    faqs: {
        id: string;
        count: number;
        question: string;
        answer: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

const Faq: NextPage = () => {
    const [faqData, setFaqData] = useState<FaqData | null>(null);

    const getAllFAQ = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/faq?limit=100`);
            setFaqData(data);
        } catch (error) {
            console.log(error);
        }
    }


    const faqsAccordion = () => {
        return faqData?.faqs.map((el) => (
            <Accordion.Item value={el.question}>
                <Accordion.Control style={{ color: `${colors.primaryColor}` }}>{el.question}</Accordion.Control>
                <Accordion.Panel><div dangerouslySetInnerHTML={{__html: el.answer}} /></Accordion.Panel>
            </Accordion.Item>
        ));
    }

    useEffect(() => {
        getAllFAQ();
    }, []);

    return (
        <>
            <Head>
                <title>Atego | FAQ</title>
                <meta name="description" content="Get to know Atego School, a leading provider of hardware and IoT education. Our expert instructors and innovative curriculum are dedicated to helping you achieve your goals in the world of technology." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container mb={40}>
                    <Center>
                        <Image
                            src="/faq.svg"
                            alt="FAQ"
                            height={320}
                            width={320}
                        />
                    </Center>
                    <Text align="center" size={24} my="lg" color={colors.primaryColor} weight={600}>Frequently Asked Questions</Text>
                    <Accordion
                        chevron={<IconPlus size={16} />}
                        styles={{
                            chevron: {
                                '&[data-rotate]': {
                                    transform: 'rotate(45deg)',
                                },
                            },
                        }}
                    >
                        {faqsAccordion()}
                    </Accordion>
                </Container>
                {/* <Subscribe /> */}
                <FooterLinks data={footerData} />
            </MainLayout>
        </>
    );
}

export default Faq;