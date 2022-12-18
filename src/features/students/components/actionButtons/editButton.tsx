import { useEffect, useState } from "react";
import { Alert, Box, Button, Center, Container, Divider, Modal, Select, Text, UnstyledButton } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons";
import { useForm } from "@mantine/form";
import axios from "axios";

import { useStyles } from './actionButtons.styles';
import { urls } from "../../../../constants/urls";
import { useRefreshContext } from "../../../lms/contexts/refreshDataContexProvider";
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

const roleSelectData = [
    {value: "student", label: "Student"},
    {value: "tutor", label: "Tutor"}
];

const EditButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [response, setResponse] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);

    const { toggleRefreshData } = useRefreshContext();

    const form = useForm({
        initialValues: {
            role: ''
        },
        validate: {
            role: (value) => (!value ? 'role Name cannot be empty' : null)
        }
    });

    const onClick = () => {
        setOpenModal(true);
    }

    const onClose = () => {
        setOpenModal(false);
    }
    
    const getUserData = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/user/${id}`);
            setUserData(data);
            form.setFieldValue('role', data.role);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async() => {
        if(JSON.stringify(form.errors) === "{}"){
            try {
                const { data } = await axios.put(`${urls.baseUrl}/user/${id}`, form.values);
                setResponse(data.message);
                toggleRefreshData();
                setTimeout(() => {setResponse('')}, 5000);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getUserData();  
    }, [response]);
    return (
        <>
            <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.editButton}`}>
                <Text size="sm">Edit</Text>
            </UnstyledButton>
            <Modal
                opened={openModal}
                onClose={onClose}
                size="600px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={25} >Edit User Role</Text>}
            >
                <Divider />
                <Container>
                    <Box my="lg">
                        {response === 'success' ? (   
                            <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                                success
                            </Alert>           
                        ): response ? (
                            <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                                Reason: {response} <br />
                            </Alert>
                        ): ''}
                    </Box> 
                    <form onSubmit={form.onSubmit(() => { handleSubmit()})}>
                        <Select 
                            label="User Role"
                            placeholder='Select user role'
                            withAsterisk
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps('role', { type: 'input' })}
                            data={roleSelectData}
                            my="md"
                            radius={15}
                            error={form.errors.CategoryId}
                        />
                        <Center>
                            <Button 
                                rightIcon={<IconCheck />}
                                color="green"
                                my="lg"
                                type='submit'
                                radius={15}
                            >
                                Update User Role
                            </Button>
                        </Center>
                    </form>
                </Container>

            </Modal>
        </>
    )
}

export default EditButton;