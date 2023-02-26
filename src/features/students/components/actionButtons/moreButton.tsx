import { useState } from "react";
import { Badge, Container, Divider, Group, Modal, Text, UnstyledButton } from "@mantine/core";
import axios from "axios";

import { useStyles } from './actionButtons.styles';
import { urls } from "../../../../constants/urls";
import { IconId, IconReceipt, IconCalendar, IconPhone, IconMail, IconActivity } from "@tabler/icons";
import { colors } from "../../../../constants/colors";

interface ID {
    id: string;
    type: string;
}

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    active: boolean;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
}


const MoreButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const onClick = async() => {
        setOpenModal(true);
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/${id}`);
            setUserData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onClose = () => {
        setOpenModal(false);
    }

    const parseDate = (input: string) => {
        return new Date(input).toLocaleString();
    }

    return (
        <>
            <Modal
                opened={openModal}
                onClose={onClose}
                size="500px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={25} >{type === "student" ? "Student" : "Tutor"} Details</Text>}
            >    
                <Divider />
                <Container>
                    <Group mt="lg" position="apart">
                        <Text><IconId size={16} color={`${colors.primaryColor}`}/>Student Id: </Text>
                        <Badge color="dark" size="lg">{userData?.id}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconReceipt size={16} color={`${colors.primaryColor}`}/> {type === "student" ? "Student" : "Tutor"} Name: </Text>
                        <Badge color="dark" size="lg">{userData?.firstName} {userData?.lastName}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconPhone size={16} color={`${colors.primaryColor}`}/> Phone Number: </Text>
                        <Badge color="dark" size="lg">{userData?.phoneNumber}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconMail size={16} color={`${colors.primaryColor}`}/> Email: </Text>
                        <Badge color="dark" size="lg">{userData?.email}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconActivity size={16} color={`${colors.primaryColor}`}/> Active: </Text>
                        <Badge color="dark" size="lg">{userData?.active.toString()}</Badge>
                    </Group>
                    <Group mt="lg" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Created At:  </Text>
                        <Badge color="dark" size="lg">{userData ? parseDate(userData.createdAt): ""}</Badge>
                    </Group>

                    <Group mt="lg" mb="xl" position="apart">
                        <Text><IconCalendar size={16} color={`${colors.primaryColor}`}/> Updated At:  </Text>
                        <Badge color="dark" size="lg">{userData ? parseDate(userData.updatedAt): ""}</Badge>
                    </Group>
                </Container>
            </Modal>
            <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.moreButton}`}>
                <Text size="sm">More</Text>
            </UnstyledButton>

        </>
    )
}

export default MoreButton;