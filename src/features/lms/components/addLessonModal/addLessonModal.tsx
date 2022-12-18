import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Modal, TextInput, Stack, Button, Container, Text, Stepper, Group, Box, Notification, Divider, Paper, Alert } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconArrowRight, IconCheck, IconUpload, IconX } from '@tabler/icons';
import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

import { colors } from '../../../../constants/colors';
import { useAddLesson } from '../../hooks/useAddLesson';


interface AddCourseData {
    open: boolean;
    onClose: () => void;
    courseId?: string;
    topicId?: string;
};


const AddLessonModal = ({ open, onClose, courseId, topicId }: AddCourseData) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState('');
    const { active, form, loading, nextText, response, nextStep, handleSubmit, prevStep, setActive } = useAddLesson();

    const handleEditorChange = (state: any) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(currentContentAsHTML);
    }

    console.log(convertedContent)

    return (
        <>
            <Modal
                opened={open}
                onClose={onClose}
                size="600"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28}>Add New Lesson</Text>}
            >
                <Divider mb="xl" />
                <Container>

                    <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="#14481e">
                        <Stepper.Step label="First step" description="Lesson Title" allowStepSelect={active > 0}>
                            <Text color={`${colors.primaryColor}`} size={20}>Step 1 content: Lesson Title</Text>
                        </Stepper.Step>
                        <Stepper.Step label="Second step" description="Lesson Content" allowStepSelect={active > 1}>
                            <Text color={`${colors.primaryColor}`} size={20}>Step 2 content: Lesson Content</Text>
                        </Stepper.Step>

                        <Stepper.Completed>
                            <Text color={`${colors.primaryColor}`} size={20}> Click Submit to add lesson </Text>
                            {JSON.stringify(form.errors) === "{}" ? "" : (
                                <Notification icon={<IconX size={18} />} color="red" title="Error">
                                    <Text>{form.errors?.lessonTitle}</Text>
                                </Notification>
                            )}
                            {response === 'success' ? (
                                <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                                    Lesson added Successfully
                                </Alert>
                            ) : response ? (
                                <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                                    Reason: {response} <br />
                                </Alert>
                            ) : ''}
                        </Stepper.Completed>
                    </Stepper>
                    <form onSubmit={form.onSubmit(() => handleSubmit(convertedContent, courseId ? courseId : '1', topicId ? topicId : '1'))}>
                        <Stack>
                            <Box hidden={active !== 0 ? true : false}>
                                <TextInput
                                    label="Lesson Title"
                                    placeholder="Enter the title of the lesson"
                                    value={form.values.lessonTitle}
                                    onChange={(event) => form.setFieldValue('lessonTitle', event.currentTarget.value)}
                                    mt="lg"
                                    error={form.errors.lessonTitle}
                                    radius={15}
                                />
                            </Box>
                            <Paper hidden={active !== 1 ? true : false} withBorder pb={20} px={10} pt={10} mt={20} radius={15}>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={handleEditorChange}
                                />
                            </Paper>
                            <Group position="center" my="xl">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    type="button"
                                    leftIcon={<IconArrowLeft />}
                                    color="dark"
                                    radius={10}
                                    disabled={active === 0 ? true : false}
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    rightIcon={active >=2 ? <IconCheck /> : <IconArrowRight />}
                                    color="dark"
                                    radius={10}
                                    type={active === 3 ? 'submit' : 'button'}
                                    loading={loading}
                                >
                                    {nextText}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        </>
    );
}

export default AddLessonModal;