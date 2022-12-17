import { createStyles, Box, Container, Grid, Text, TextInput, Button, Center } from "@mantine/core";
import Image from 'next/image';
import { colors } from "../../constants/colors";

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
    return (
        <Box className={classes.subscribeGradient} my={70}>
            <Container>
                <Grid>
                    <Grid.Col md={7} mt={30}>
                        <Text size={32} weight={600} color="white">Don't be left out, <br />Subscribe to our News Letter</Text>
                        <form className={classes.subscribeWidth}>
                            <TextInput
                                mt="xl"
                                placeholder={`     Enter Your Email`}
                                rightSection={<Button radius={"lg"} size="md" style={{ background: `${colors.primaryColor}` }}>Subscribe</Button>}
                                radius="lg"
                                size="md"
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