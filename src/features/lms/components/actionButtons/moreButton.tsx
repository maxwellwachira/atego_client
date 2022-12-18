import { useState } from "react";
import { Text, UnstyledButton, Modal, Group, Badge, Container, Divider, Tabs, Center } from "@mantine/core";
import axios from "axios";
import Image from "next/image";
import { IconBook, IconCalendar, IconCurrencyDollar, IconId, IconInfoSquare, IconMoneybag, IconPhoto, IconReceipt, IconVideo } from "@tabler/icons";
import DOMPurify from "dompurify";

import { colors } from "../../../../constants/colors";
import { urls } from "../../../../constants/urls";
import { useStyles } from './actionButtons.styles';

interface ID {
    id: string;
    type: string;
}

interface CategoryData {
    id: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

interface CourseData {
    id: string;
    courseTitle: string;
    CategoryId: string;
    coursePricing: string;
    courseDescriptionTitle: string;
    courseDescriptionContent: string;
    courseThumbnailUrl: string;
    hasVideo: boolean;
    videoSource: string;
    videoUrl: string;
    grannysId: string;
    createdAt: string;
    updatedAt: string;
}

interface TopicData {
    id: string;
    topicName: string;
    createdAt: string;
    updatedAt: string;
};

interface LessonData {
    id: string;
    lessonTitle: string;
    lessonContent: string;
    CourseId: string;
    TopicId: string;
    createdAt: string;
    updatedAt: string;
}

const MoreButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const [openCourseModal, setOpenCourseModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openAddTopic, setOpenAddTopic] = useState(false);
    const [openLessonModal, setOpenLessonModal] = useState(false);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [topicData, setTopicData] = useState<TopicData | null>(null);
    const [lessonData, setLessonData] = useState<LessonData | null>(null);

    const onClick = async() => {
        type === 'course' ? setOpenCourseModal(true) :type === 'category' ?  setOpenCategoryModal(true) : type === "topic" ? setOpenAddTopic(true) : setOpenLessonModal(true);
        try {
            const urlPath =  type === "category" ? "category" : type === "course" ? "course" : type ==="topic" ? "topic/single-topic" : "lesson/single-lesson";
            const { data } = await axios.get(`${urls.baseUrl}/${urlPath}/${id}`);
            type === "category" ? setCategoryData(data) : type === "course" ? setCourseData(data) : type === "topic" ? setTopicData(data) : setLessonData(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    } 

    const onClose = () => {
        type === 'course' ? setOpenCourseModal(false) :type === 'category' ?  setOpenCategoryModal(false) : type === "topic" ? setOpenAddTopic(false) : setOpenLessonModal(false);
    }

    const parseDate = (input: string) => {
        return new Date(input).toLocaleString();
    }

    const capitalizeFirsLetter = (sentence: string) => {
        const words = sentence.split(" ");
        return words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    }
   
    return (
        <>
            <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.moreButton}`}>
                <Text size="sm">More</Text>
            </UnstyledButton>
            <Modal
                opened={openCategoryModal}
                onClose={onClose}
                size="500px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28} >{categoryData?.categoryName} CATEGORY</Text>}
            >    
                <Divider />
                <Container>
                    <Group mt="lg" position="apart">
                        <Text><IconId size={16} color={`${colors.primaryColor}`}/> Category Id: </Text>
                        <Badge color="dark" size="lg">{categoryData?.id}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconReceipt size={16} color={`${colors.primaryColor}`}/> Category Name: </Text>
                        <Badge color="dark" size="lg">{categoryData?.categoryName}</Badge>
                    </Group>

                    <Group mt="lg" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Created At:  </Text>
                        <Badge color="dark" size="lg">{categoryData ? parseDate(categoryData.createdAt): ""}</Badge>
                    </Group>

                    <Group mt="lg" mb="xl" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Updated At:  </Text>
                        <Badge color="dark" size="lg">{categoryData ? parseDate(categoryData.updatedAt): ""}</Badge>
                    </Group>
                </Container>
            </Modal>
            <Modal
                opened={openCourseModal}
                onClose={onClose}
                size="600px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28} >{courseData?.courseTitle}</Text>}
            >    
                <Divider />
                <Container>

                    <Tabs defaultValue="basicInfo" color="teal">
                        <Tabs.List>
                            <Tabs.Tab value="basicInfo" icon={<IconInfoSquare size={14} />}>Basic Info</Tabs.Tab>
                            <Tabs.Tab value="thumbnail" icon={<IconPhoto size={14} />}>Thumbnail</Tabs.Tab>
                            <Tabs.Tab value="descripion" icon={<IconBook size={14} />}>Description</Tabs.Tab>
                            <Tabs.Tab value="video" icon={<IconVideo size={14} />}>Videos</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="basicInfo" pt="xs"> 
                            <Group mt="lg" position="apart">
                                <Text><IconId size={16} color={`${colors.primaryColor}`}/> Course Id: </Text>
                                <Badge color="dark" size="lg">{courseData?.id}</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text><IconReceipt size={16} color={`${colors.primaryColor}`}/> Course Name: </Text>
                                <Badge color="dark" size="lg">{courseData?.courseTitle}</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text><IconCurrencyDollar size={16} color={`${colors.primaryColor}`}/>Course Pricing Amount: </Text>
                                <Badge color="dark" size="lg">KSh. {courseData?.coursePricing}</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Created At:  </Text>
                                <Badge color="dark" size="lg">{courseData ? parseDate(courseData.createdAt): ""}</Badge>
                            </Group>

                            <Group mt="lg" mb="xl" position="apart">
                                <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Updated At :  </Text>
                                <Badge color="dark" size="lg">{courseData ? parseDate(courseData.updatedAt): ""}</Badge>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value="thumbnail" pt="xs"> 
                            <Text mb="lg">Course Thumbnail: </Text>
                            {courseData ? 
                                <Center>
                                    <Image 
                                        src={`${urls.baseUrl}/image?filePath=public${courseData?.courseThumbnailUrl}`}
                                        width="400"
                                        height="250"
                                        alt="course thumbnail"
                                    /> 
                                </Center> : ""
                            }
                        </Tabs.Panel>
                        <Tabs.Panel value="descripion" pt="xs"> 
                            <Group mt="lg" position="apart">
                                <Text>Course Description Title: </Text>
                                <Badge color="dark" size="lg">{courseData?.courseDescriptionTitle}</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text>Course Description: </Text>
                                <Badge color="dark" size="lg">{courseData?.courseDescriptionContent}</Badge>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value="video" pt="xs"> 
                            <Group mt="lg" position="apart">
                                <Text>Course has description video: </Text>
                                <Badge color="dark" size="lg">{courseData?.hasVideo ? "Yes" : "No"}</Badge>
                            </Group>

                            {courseData?.hasVideo ?
                                <>
                                <Group mt="lg" position="apart">
                                    <Text>Video Source </Text>
                                    <Badge color="dark" size="lg">{courseData?.videoSource}</Badge>
                                </Group>
                                <Group mt="lg" position="apart">
                                    <Text>Video link </Text>
                                    <Badge color="dark" size="lg">{courseData?.videoUrl}</Badge>
                                </Group>
                                </>
                            
                            : ""
                            }
                        </Tabs.Panel>
                    </Tabs>
                </Container>
            </Modal>
            <Modal
                opened={openAddTopic}
                onClose={onClose}
                size="500px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28} >{categoryData?.categoryName} Topic Details</Text>}
            >    
                <Divider />
                <Container>
                    <Group mt="lg" position="apart">
                        <Text><IconId size={16} color={`${colors.primaryColor}`}/> Topic Id: </Text>
                        <Badge color="dark" size="lg">{topicData?.id}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconReceipt size={16} color={`${colors.primaryColor}`}/> Topic Title: </Text>
                        <Badge color="dark" size="lg">{topicData?.topicName}</Badge>
                    </Group>

                    <Group mt="lg" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Created At:  </Text>
                        <Badge color="dark" size="lg">{topicData ? parseDate(topicData.createdAt): ""}</Badge>
                    </Group>

                    <Group mt="lg" mb="xl" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Updated At:  </Text>
                        <Badge color="dark" size="lg">{topicData ? parseDate(topicData.updatedAt): ""}</Badge>
                    </Group>
                </Container>
            </Modal>

            <Modal
                opened={openLessonModal}
                onClose={onClose}
                size="600px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28} >{lessonData?.lessonTitle}</Text>}
            >    
                <Divider />
                <Container>

                    <Tabs defaultValue="basicInfo" color="teal">
                        <Tabs.List>
                            <Tabs.Tab value="basicInfo" icon={<IconInfoSquare size={14} />}>Basic Info</Tabs.Tab>
                            <Tabs.Tab value="content" icon={<IconPhoto size={14} />}>Content</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="basicInfo" pt="xs"> 
                            <Group mt="lg" position="apart">
                                <Text><IconId size={16} color={`${colors.primaryColor}`}/> Lesson Id: </Text>
                                <Badge color="dark" size="lg">{lessonData?.id}</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text><IconReceipt size={16} color={`${colors.primaryColor}`}/> Lesson Title: </Text>
                                <Badge color="dark" size="lg">{lessonData ? capitalizeFirsLetter(lessonData.lessonTitle) : '' }</Badge>
                            </Group>
                            <Group mt="lg" position="apart">
                                <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Created At:  </Text>
                                <Badge color="dark" size="lg">{lessonData ? parseDate(lessonData.createdAt): ""}</Badge>
                            </Group>

                            <Group mt="lg" mb="xl" position="apart">
                                <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Updated At :  </Text>
                                <Badge color="dark" size="lg">{lessonData ? parseDate(lessonData.updatedAt): ""}</Badge>
                            </Group>
                        </Tabs.Panel>
                        <Tabs.Panel value="content" pt="xs"> 
                            <Text mb="lg">Lesson Content: </Text>
                            {lessonData ? 
                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(lessonData.lessonContent)}}/> : ''
                            }
                        </Tabs.Panel>
                    </Tabs>
                </Container>
            </Modal>
        </>
    )
}

export default MoreButton;