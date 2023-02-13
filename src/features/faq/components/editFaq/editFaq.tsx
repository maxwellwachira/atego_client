import { Alert, Button, Center, Container, Divider, Modal, Stack, Text, TextInput } from "@mantine/core";
import { colors } from "../../../../constants/colors";
import { IconAlertCircle, IconCheck } from "@tabler/icons";
import AnswerEditor from "../answerEditor/answerEditor";
import { useEditFaq } from "../../hooks/useEditFaq";


interface EditFaqModalInterface {
    id: string;
    open: boolean;
    onClose: () => void;
};

const EditFaqModal = ({ id, open, onClose }: EditFaqModalInterface) => {
    const { form, loading, response, handleSubmit, } = useEditFaq(id);
    return (
        <Modal
            opened={open}
            onClose={onClose}
            size={800}
            title={<Text weight={600} color={`${colors.primaryColor}`} size={20}>Edit FAQ</Text>}
        >
            <Divider />
            <Container>
                {response === 'success' ? (
                    <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                        FAQ edited Successfully
                    </Alert>
                ) : response ? (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                        Reason: {response} <br />
                    </Alert>
                ) : ''}
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Question"
                            placeholder="Type your Question here"
                            value={form.values.question}
                            onChange={(event) => form.setFieldValue('question', event.currentTarget.value)}
                            mt="lg"
                            radius={10}
                            error={form.errors.question}
                        />

                        <Text>Answer</Text>
                        <AnswerEditor />
                        <Center>
                            <Button
                                rightIcon={<IconCheck />}
                                color="green"
                                my="lg"
                                type='submit'
                                loading={loading}
                                loaderPosition="left"
                                radius={8}
                                style={{ width: 200 }}
                            >
                                Edit FAQ
                            </Button>
                        </Center>
                    </Stack>
                </form>
            </Container>
        </Modal>
    )
}

export default EditFaqModal;