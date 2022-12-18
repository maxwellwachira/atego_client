import { Modal,TextInput, Stack, Button, Container,  Text, Alert, Divider } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons';

import { colors } from '../../../../constants/colors';
import { useAddTopic } from '../../hooks/useAddTopic ';


interface AddTopicInterface {
    id: number;
    open: boolean;
    onClose: () => void;
};

const AddTopicModal = ({open, onClose, id}: AddTopicInterface) => {
    const { form, loading, response, handleSubmit } = useAddTopic();

    return (
        <>
            <Modal
                opened={open}
                onClose={onClose}
                size="600px"
                title={<Text weight={600} color={`${colors.primaryColor}`} size={28}>Add New Topic</Text>}
            >   
                <Divider mb="xl" />
                <Container>                  
                    {response === 'success' ? (   
                        <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                           Topic added Successfully
                        </Alert>           
                    ): response ? (
                        <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
                            Reason: {response} <br />
                        </Alert>
                    ): ''}
                    <form onSubmit={form.onSubmit(() => handleSubmit(id))}>
                        <Stack>
                            <TextInput
                                withAsterisk
                                label="Topic Title"
                                placeholder="Enter the title of the topic"
                                value={form.values.topicName}
                                onChange={(event) => form.setFieldValue('topicName', event.currentTarget.value)}
                                mt="lg"
                                radius={15}
                                error={form.errors.categoryName}
                            />

                            <Button 
                                rightIcon={<IconCheck />}
                                color="green"
                                my="lg"
                                type='submit'
                                loading={loading}
                                loaderPosition="left"
                                radius={15}
                            >
                                Add Topic
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        </>
    )
}

export default AddTopicModal;
