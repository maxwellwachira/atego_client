import { createStyles, Box, Container, Grid, Text, TextInput, Button, Center, Notification } from "@mantine/core";
import Image from 'next/image';
import { colors } from "../../constants/colors";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { urls } from "../../constants/urls";
import { IconCheck, IconX } from "@tabler/icons";

const useStyles = createStyles(() => ({
    subscribeGradient: {
        maxWidth: 1080,
        background: 'linear-gradient(135deg, #31B44B 0%, #4385F5 100%)',
        borderRadius: 40,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    subscribeWidth: {
        maxWidth: 400,
        width: "85%"
    },
}));

const Subscribe = () => {
    const { classes } = useStyles();
    const [response, setResponse] = useState('');

    const initialValues = {
        email: '',
    }

    const form = useForm({
        initialValues,
        validate: {
            email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async () => {
        if (JSON.stringify(form.errors) === "{}") {
            try {
                const { data } = await axios.post(`${urls.baseUrl}/newsletter`, form.values);
                if (data.message === "success") {
                    setResponse(data.message);
                    form.setFieldValue('email', '');
                    setTimeout(() => {
                        setResponse('');
                    }, 6000);
                }
            } catch (error: any) {
                console.log(error);
                setResponse(error.response.data.message);
            }
        }
    }

    const clearResponse = () => {
        setResponse('');
    }

    return (
        <Box className={classes.subscribeGradient} my={70}>
            <Container>
                <Grid>
                    <Grid.Col md={7} mt={30}>
                        <Text size={32} weight={600} color="white">Don't be left out, <br />Subscribe to our News Letter</Text>
                        <form className={classes.subscribeWidth} onSubmit={form.onSubmit(() => handleSubmit())}>
                            {response === 'success' ? (
                                <Notification icon={<IconCheck size={18} />} color="teal" title="Success" onClose={clearResponse} my="lg">
                                    You will hear from us soon!!!
                                </Notification>
                            ) : response ? (
                                <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={clearResponse} my="lg">
                                    {response}
                                </Notification>
                            ) : ''
                            }
                            <TextInput
                                mt="xl"
                                placeholder={`     Enter Your Email`}
                                rightSection={<Button radius={"lg"} size="md" type="submit" style={{ background: `${colors.primaryColor}` }}>Subscribe</Button>}
                                radius="lg"
                                size="md"
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                            />
                        </form>
                    </Grid.Col>
                    <Grid.Col md={5}>
                        <Center>
                            <Image
                                src='/subscribe.svg'
                                height={300}
                                width={300}
                                alt="subscibe"
                            />
                        </Center>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

export default Subscribe;