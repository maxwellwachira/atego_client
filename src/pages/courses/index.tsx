import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { Badge, Box, Button, Card, Center, Container, createStyles, Grid, Group, Loader, Pagination, Stack, Text,  } from '@mantine/core';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { colors } from '../../constants/colors';
import { urls } from '../../constants/urls';
import Subscribe from '../../components/subscribe/subscribe';

const useStyles = createStyles((theme) => ({
    cardHeight: {
        height: 165
    },
    button: {
        background: `${colors.primaryLight}`,
        color: theme.colors.dark[9],
        '&:hover': {
            background: `${colors.primaryLight}`,
            opacity: 0.7
        }
    },
    loaderHeight: {
        height: 'calc(100vh - 150px)'
    }
}));


const Courses: NextPage = () => {
 const [courseData, setCourseData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [activePage, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [courses, setCourses] = useState(1);
 const [buttonLoading, setButtonLoading] = useState(0);
 const { classes } = useStyles();


  const getCourses = async () => {
    setLoading(true);
    try {
        const { data, status } = await axios.get(`${urls.baseUrl}/course?page=${activePage}`);
        //console.log(data)
        if (status === 200){
            setCourseData(data.courses);
            setTotalPages(data.totalPages);
            setCourses(data.totalCourses);
            setLoading(false);
        }
    } catch (error) {
        console.log(error)
    }  
  }

  const onClick = (id: number) => {
    setButtonLoading(id);

  }

  useEffect(() => {
    getCourses();
  }, [activePage]);
  
  const item = courseData.map((element: any) => (
  
        <Grid.Col sm={6} md={4} key={element.id}>
            <Center>
                <Card p="lg" radius="lg" style={{maxWidth: 300, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <Card.Section>
                    <Center>
                            <Image 
                                src={`${urls.baseUrl}/image?filePath=public${element?.courseThumbnailUrl}`}
                                width="300"
                                height="250"
                                alt="course thumbnail"
                            />
                    </Center>
                    </Card.Section>

                    <Stack justify="space-between" className={classes.cardHeight}>
                        <Group position="apart" mt="sm" >
                            <Text weight={500}>{element.courseTitle}</Text>
                            <Badge color="dark" variant="light">
                                Price: {element.coursePricing == 0 ? "FREE" : `${element.coursePricing} KES`} 
                            </Badge>
                        </Group>

                        <Button 
                            variant="light" 
                            fullWidth  
                            radius={15}
                            className={classes.button}
                            component='a'
                            href={`/courses/${element.id}`}
                            onClick ={() => onClick(element.id)}
                            loading = {buttonLoading === element.id ? true : false}
                        >
                            See more
                        </Button>
                    </Stack>
                </Card>
            </Center>
        </Grid.Col>
    
  ))

  

  return (
    <>
      <Head>
        <title>Atego | Courses</title>
        <meta name="description" content="Explore a wide range of hardware and IoT courses at Atego School. From beginners to advanced students, our curriculum covers the latest technologies and techniques in the field. Find the perfect course for you today." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container mt="md">
            
           {loading ? (
            <Stack justify="center" className={classes.loaderHeight} align="center">
                <Loader variant="oval" color="dark" size="lg"/>
            </Stack>
           ): (
            <Box>
                <Group mb="xl" position="apart">
                    <Badge color='dark' variant='outline'>{courses} Total Courses</Badge>
                    <Pagination page={activePage} onChange={setPage} total={totalPages} color='green'/>
                </Group>
                <Grid>
                    {item}
                </Grid>
            </Box>
           )}
           <Center mt="md">
            <Pagination page={activePage} onChange={setPage} total={totalPages} color='green' mb="xl" />
           </Center>    
        </Container>
        {/* <Subscribe /> */}
        <Box>
            <FooterLinks data={footerData} />
        </Box>
      </MainLayout>
    </>
  );
}

export default Courses;