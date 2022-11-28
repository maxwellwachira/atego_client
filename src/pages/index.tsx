import { useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Box, Button, Card, Center, Container, createStyles, Grid, Stack, Text, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import hero from '../assets/hero.png';
import accelerated from '../assets/accelerated.jpg';
import design from '../assets/design.jpg';
import iot from '../assets/iot.jpg';
import man from '../assets/man.png';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';

const useStyles = createStyles((theme) => ({
  cardWidth: {
    maxWidth: 300
  },

  exploreButton: {
    backgroundColor: `${colors.primaryColor}`,
    border: `2px solid ${colors.primaryColor}`,
    borderRadius: "10px",
    display: "inline-block",
    padding: "5px 12px",
    textAlign: "center",
    color:  theme.colors.gray[0],
    fontWeight: 'bold',
    margin: '30px 0',
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
    '&:hover': {
       opacity: 0.7,
       backgroundColor: `${colors.primaryColor}`,
       textDecoration: 'none'
        
    }
  },

  heading: {
    fontSize: '35px',
    fontWeight: 550,
  },

  headingTwo: {
    fontSize: '25px',
    fontWeight: 600
  },

  primaryLightBackground: {
    background: `${colors.primaryLight}`,
  },

  primaryText : {
    color : `${colors.primaryColor}`
  },

  secondaryText: {
    color: `${colors.secondaryColor}`
  },

  whiteText: {
    color: theme.colors.gray[0]
  }
 
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  const { width } = useViewportSize();
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <>
      <Head>
        <title>Atego</title>
        <meta name="description" content="RentLord" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container mt="xl">
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Stack>
                <Text className={`${classes.heading} ${classes.primaryText}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum efficitur arcu, eget gravida dui lobortis non. Integer hendrerit enim vitae metus consectetur egestas. Donec sit amet aliquam sem, et volutpat nisi. Maecenas augue elit, fringilla vel risus at, egestas pharetra erat. Nam in dolor ante. Aenean tincidunt iaculis felis. Nam dignissim dignissim sem vitae sagittis.</Text>
              </Stack>
              <Button
                component='a'
                href='#'
                className={classes.exploreButton}
              >
                See Available Courses
              </Button>
            </Grid.Col>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src={hero}
                  height={width >= 768 ? 430 : 350}
                  width={width >= 768 ? 430 : 310}
                  alt="Hero image"
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
        <Box className={classes.primaryLightBackground}>
          <Container mt="xl" py="xl">
            <Stack>
              <Center>
                <Text className={`${classes.headingTwo} ${classes.primaryText}`} mt="xl">Who We are</Text>
              </Center>
              <Text>
                Atego school is shaping the future of gaining after sort skills in IoT, embedded systems and hardware design.
                The not taught in class professional skills is what our goal is as we blend in with what you have already been taught to prepare you for the job market. 
              </Text>
              <Grid my="xl" gutter="xl">
                <Grid.Col md={4}>
                <Stack align="center">
                  <Card shadow="sm" p="lg" radius="lg" withBorder className={classes.cardWidth}>
                        <Card.Section>
                          <Image
                            src="/pcb.svg"
                            height={250}
                            width={300}
                            alt="market aligned "
                          />
                        </Card.Section>        
                        <Text align='center'>Market-aligned Programs</Text>
                    </Card> 
                  </Stack>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Stack align="center">
                    <Card shadow="sm" p="lg" radius="lg" withBorder className={classes.cardWidth} mt={width <= 992 ? 0 : 30}>
                      <Card.Section>
                        <Image
                          src={accelerated}
                          height={280}
                          width={300}
                          alt="Accelerated Learning"
                        />
                      </Card.Section>        
                      <Text align='center'>Accelerated Learning</Text>
                    </Card>
                </Stack>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Stack align="center">
                    <Card shadow="sm" p="lg" radius="lg" withBorder className={classes.cardWidth}>
                      <Card.Section>
                        <Image
                          src="/community.svg"
                          height={250}
                          width={300}
                          alt="Community Access"
                        />
                      </Card.Section>        
                      <Text align='center'>Community Access</Text>
                    </Card>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Box>
        <Container>
          <Center mt={40}>
            <Text className={`${classes.headingTwo} ${classes.primaryText}`} mt="xl">What We Do</Text>
          </Center>
          <Text my="xl">
          At Atego we focus on filling in the gaps in technical education across the world market. Our key programs are tailored to not only give what is needed in the actual field but also give a practical approach through client-project based problems as we derive the technical solutions in the courses.
          In our diverse knowledge acquired from the current world needs from previous work and problems solved forms the core basis to give you a front row sit on these solutions and how to handle them professionally
          </Text>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={20}>Electronics & PCB Design</Text>
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src={design}
                  height={350}
                  width={400}
                  alt="Hardware"
                />
              </Center>
            </Grid.Col>
            <Grid.Col md={6}>
              <Text mt="sm">
              Learn what each device on a mother board does, you will be able to use your skills to form concepts, design, fabricate and test high quality printed circuit boards for your clients and end users. All smart devices will need a PCB and hence this is a major skill in the world of IoT and smart devices.
             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Courses
             </Button>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={20}>Firmware Development</Text>
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Text mt="sm">
              Are you passionate about writing codes but for hardware devices, you love taking to the hardware this course is for you, it takes you from the most basic microcontrollers to most after sort on most smart devices.
              The course equips you with a cutting edge in demand skill in any IoT firm all over the world and more so unlocks your knowledge on various microcontrollers.
             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Courses
             </Button>
            </Grid.Col>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src="/firmware.svg"
                  height={350}
                  width={400}
                  alt="Firmware"
                />
              </Center>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={20}>Internet of Things</Text>
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src={iot}
                  height={350}
                  width={400}
                  alt="IoT"
                />
              </Center>
            </Grid.Col>
            <Grid.Col md={6}>
              <Text mt="sm">
              Is asset tracking, smart farming, automotive, remote sensing, remote data monitoring & smart wearables your interest – this course is tailed for you.
              IoT is currently the biggest trend in the world of connected devices, this course aims at giving you a deep understanding on all the available communication protocols to connect and communicate among devices. This skill will make you an after-sort engineer in the world on smart devices, wearables, automotive, asset tracking

             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Courses
             </Button>
            </Grid.Col>
          </Grid>
        </Container>
        <Box className={classes.primaryLightBackground} pb="xl">
          <Container pb="xl">
            <Center mt="xl" py="xl">
              <Text className={`${classes.headingTwo} ${classes.primaryText}`} mt="xl">What Our Students Say ABout Us</Text>
            </Center>
            <Carousel
              mx="auto"
              sx={{ maxWidth: 700 }}
              withIndicators
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              slideGap="md"
            >
              <Carousel.Slide>
                <Center>
                  <Card shadow="sm" p="xl" radius="md" withBorder>
                    <Grid>
                      <Grid.Col md={4}>
                        <Card.Section>
                          <Center>
                            <Image 
                              src={man}
                              height={300}
                              alt="Man testimonial"
                            />
                          </Center>
                        </Card.Section>
                      </Grid.Col>
                      <Grid.Col md={8}>
                        <Stack justify="space-between">
                            <Text className={classes.primaryText} size="sm">
                              "Atego  In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur"
                            </Text>
                            <Text size="sm" color="dimmed">
                              John Doe
                            </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Center>
              </Carousel.Slide>
              <Carousel.Slide>
                <Center>
                  <Card shadow="sm" p="xl" radius="md" withBorder>
                    <Grid>
                      <Grid.Col md={4}>
                        <Card.Section>
                          <Center>
                            <Image 
                              src={man}
                              height={300}
                              alt="Man testimonial"
                            />
                          </Center>
                        </Card.Section>
                      </Grid.Col>
                      <Grid.Col md={8}>
                        <Stack justify="space-between">
                            <Text className={classes.primaryText} size="sm">
                              "Atego  In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur"
                            </Text>
                            <Text size="sm" color="dimmed">
                              John Doe
                            </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Center>
              </Carousel.Slide>
              <Carousel.Slide>
                <Center>
                  <Card shadow="sm" p="xl" radius="md" withBorder>
                    <Grid>
                      <Grid.Col md={4}>
                        <Card.Section>
                          <Center>
                            <Image 
                              src={man}
                              height={300}
                              alt="Man testimonial"
                            />
                          </Center>
                        </Card.Section>
                      </Grid.Col>
                      <Grid.Col md={8}>
                        <Stack justify="space-between">
                            <Text className={classes.primaryText} size="sm">
                              "Atego  In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur"
                            </Text>
                            <Text size="sm" color="dimmed">
                              John Doe
                            </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Center>
              </Carousel.Slide>
            </Carousel>
          </Container>
        </Box>
        <FooterLinks data={footerData}/>
      </MainLayout>
    </>
  )
}

export default Home;