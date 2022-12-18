import { useState } from 'react';
import { Modal, TextInput, Stack, Select, Radio, NumberInput, Button, Container, Text, Stepper, Group, Box, Textarea, FileInput, Notification, Alert, Divider } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconArrowRight, IconCheck, IconUpload, IconX } from '@tabler/icons';

import { colors } from '../../../../constants/colors';
import { useAddCourse } from '../../hooks/useAddCourse';


interface AddCourseData {
    open: boolean;
    selectData: {
        value: string;
        label: string;
    }[];
    onClose: () => void;
};

const videoSourceSelect = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'vimeo', label: 'Vimeo' },
    { value: 'other', label: 'Other' },
];

const AddCourseModal = ({ open, onClose }: AddCourseData) => {
    const [file, setFile] = useState<File | null>(null);
    const { active, form, nextText, loading, response, nextClick, handleSubmit, prevStep, setActive, categorySelectData } = useAddCourse();

    return (
        <>
            <Modal
                opened={open}
                onClose={onClose}
                size="600"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28}>Add New Course</Text>}
            >
                <Divider mb="lg"/>
                <Container>
                    <Stepper active={active} onStepClick={setActive} breakpoint="sm" color='#14481e'>
                        <Stepper.Step label="First step" description="Course Basic Info" allowStepSelect={active > 0}>
                            <Text color={`${colors.primaryColor}`} size={20}>Step 1 content: Basic Infomartion</Text>
                        </Stepper.Step>
                        <Stepper.Step label="Second step" description="Course Description" allowStepSelect={active > 1}>
                            <Text color={`${colors.primaryColor}`} size={20}>Step 2 content: Course Description</Text>
                        </Stepper.Step>
                        <Stepper.Step label="Third step" description="Description Video" allowStepSelect={active > 2}>
                            <Text color={`${colors.primaryColor}`} size={20}>Step 3 content: Description Video</Text>
                        </Stepper.Step>
                        <Stepper.Completed>
                            <Text color={`${colors.primaryColor}`} size={20}> Click Submit to add course </Text>
                            {JSON.stringify(form.errors) === "{}" ? "" : (
                                <Notification icon={<IconX size={18} />} color="red" title="Error">
                                    <Text>{form.errors?.courseName}</Text>
                                    <Text>{form.errors?.CategoryId}</Text>
                                    <Text>{form.errors?.descriptionTitle}</Text>
                                    <Text>{form.errors?.descriptionContent}</Text>
                                </Notification>
                            )}
                            {response === 'success' ? (
                                <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                                    Course added Successfully
                                </Alert>
                            ) : response ? (
                                <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                                    Reason: {response} <br />
                                </Alert>
                            ) : ''}
                        </Stepper.Completed>
                    </Stepper>
                    <form onSubmit={form.onSubmit(() => handleSubmit(file))}>
                        <Stack>
                            <Box hidden={active !== 0 ? true : false}>
                                <TextInput
                                    label="Course Name"
                                    placeholder="Enter the name of the course"
                                    value={form.values.courseName}
                                    onChange={(event) => form.setFieldValue('courseName', event.currentTarget.value)}
                                    mt="lg"
                                    radius={15}
                                    error={form.errors.courseName}
                                />
                                <Select
                                    label="Category"
                                    placeholder='Select Course Category'
                                    withAsterisk
                                    searchable
                                    nothingFound="No options"
                                    {...form.getInputProps('CategoryId', { type: 'input' })}
                                    data={categorySelectData()}
                                    mt="md"
                                    radius={15}
                                    error={form.errors.CategoryId}
                                />
                                <Radio.Group
                                    label="Pricing"
                                    description="Is this a free or paid course?"
                                    withAsterisk
                                    {...form.getInputProps('pricing', { type: 'input' })}
                                    mt="md"

                                >
                                    <Radio value="free" label="Free" color='dark' />
                                    <Radio value="paid" label="Paid" color='dark' />
                                </Radio.Group>

                                {form.values.pricing != "free" &&
                                    <NumberInput
                                        decimalSeparator="."
                                        label="Amount"
                                        placeholder='Enter pricing amount'
                                        {...form.getInputProps('amount', { type: 'input' })}
                                        mt="md"
                                        radius={15}
                                        withAsterisk
                                    />
                                }
                            </Box>
                            <Box hidden={active !== 1 ? true : false}>
                                <TextInput
                                    label="Description Title"
                                    placeholder="Enter Course Description Title"
                                    value={form.values.descriptionTitle}
                                    onChange={(event) => form.setFieldValue('descriptionTitle', event.currentTarget.value)}
                                    mt="lg"
                                    radius={15}
                                />
                                <Textarea
                                    label="Description Content"
                                    placeholder="Enter Course Description content"
                                    value={form.values.descriptionContent}
                                    onChange={(event) => form.setFieldValue('descriptionContent', event.currentTarget.value)}
                                    mt="lg"
                                    radius={15}
                                />
                                <FileInput
                                    required
                                    label="Course Thumbnail"
                                    placeholder="upload thumbnail image"
                                    icon={<IconUpload size={14} />}
                                    mt="lg"
                                    value={file}
                                    onChange={setFile}
                                    radius={15}
                                />
                            </Box>
                            <Box hidden={active !== 2 ? true : false}>
                                <Radio.Group
                                    label="Description video"
                                    description="is there a description video?"
                                    withAsterisk
                                    mt="md"
                                    {...form.getInputProps('hasVideo', { type: 'input' })}

                                >
                                    <Radio value="true" label="Has video" color='dark' />
                                    <Radio value="false" label="No video" color='dark' />
                                </Radio.Group>

                                <Select
                                    label="Video Source"
                                    placeholder='Select Video Source'
                                    withAsterisk
                                    searchable
                                    nothingFound="No options"
                                    data={videoSourceSelect}
                                    mt="lg"
                                    radius={15}
                                    disabled={form.values.hasVideo === "false" ? true : false}
                                    {...form.getInputProps('videoSource', { type: 'input' })}
                                />
                                <TextInput
                                    required
                                    label="Video Link"
                                    placeholder="Enter Video Link"
                                    mt="lg"
                                    radius={15}
                                    disabled={form.values.hasVideo === "false" ? true : false}
                                    {...form.getInputProps('videoUrl', { type: 'input' })}
                                />
                            </Box>

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
                                    onClick={nextClick}
                                    rightIcon={active >= 3 ? <IconCheck /> : <IconArrowRight />}
                                    color="dark"
                                    radius={10}
                                    type={active === 4 ? 'submit' : 'button'}
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

export default AddCourseModal;