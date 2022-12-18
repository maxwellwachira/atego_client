import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Stack, Text, TextInput, UnstyledButton, Select, Radio, NumberInput, Stepper, Group, Box, Textarea, FileInput, Notification, Divider } from "@mantine/core";
import { IconAlertCircle, IconArrowLeft, IconArrowRight, IconCheck, IconCross, IconUpload, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import axios from "axios";

import { useStyles } from './actionButtons.styles';
import { colors } from "../../../../constants/colors";
import { useRefreshContext } from "../../../lms/contexts/refreshDataContexProvider";
import { urls } from "../../../../constants/urls";


interface ID {
    id: string;
    type: string;
}

const EditButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const { toggleRefreshData } = useRefreshContext();

    const form = useForm({
        initialValues: {
            fileName: ''
        }
    });

    const getIntialValues = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/upload/${id}`);
            form.setFieldValue('fileName', data.fileName);
        } catch (error) {
            console.log(error);
        }
    }

    const onClick = async() => {
        setOpen(true);
    } 
    const onClose = () => {
        setOpen(false);
    }

    const handleSubmit = async() => {
        setLoading(true);
        if(JSON.stringify(form.errors) === "{}"){
            try {
                const { data } = await axios.put(`${urls.baseUrl}/upload/${id}`, form.values);
                if(data.message === "success"){
                    setResponse(data.message);
                    toggleRefreshData();
                    setLoading(false);
                    setTimeout(() => {setResponse('')}, 5000);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getIntialValues();
    }, []);
   
    return (
        <>
            <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.editButton}`}>
                <Text size="sm">Edit</Text>
            </UnstyledButton>
            <Modal
                opened={open}
                onClose={onClose}
                size="600px"
                title={ <Text weight={600} color={`${colors.primaryColor}`} size={25}>Edit Upload</Text>}
            >   
                <Divider />
                <Container>
                    {response === 'success' ? (   
                        <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                           File Name Edited Successfully
                        </Alert>           
                    ): response ? (
                        <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                            Reason: {response} <br />
                        </Alert>
                    ): ''}
                    <form onSubmit={form.onSubmit(() => handleSubmit())}>
                        <Stack>
                            <TextInput
                                withAsterisk
                                label="File Name"
                                placeholder="Edit file name"
                                value={form.values.fileName}
                                onChange={(event) => form.setFieldValue('fileName', event.currentTarget.value)}
                                mt="lg"
                                error={form.errors.categoryName}
                            />

                            <Button 
                                rightIcon={<IconCheck />}
                                color="dark"
                                my="xl"
                                type='submit'
                                loading={loading}
                                loaderPosition="left"
                                radius="md"
                            >
                                Update
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Modal>
           </>
    )
}

export default EditButton;