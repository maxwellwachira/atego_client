import { Button, Container, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { getCookie } from "cookies-next";
import axios from "axios";

import { urls } from "../../../../constants/urls";
import { useRefreshContext } from "../../../lms/contexts/refreshDataContexProvider";

interface DeleteFaqModalInterface {
    id: string;
    open: boolean;
    onClose: () => void;
};

const DeleteFaqModal = ({ id, open, onClose }: DeleteFaqModalInterface) => {
    const { toggleRefreshData } = useRefreshContext();
    let token = getCookie('accessToken');
    
    const deleteFaq = async () => {
        try {
            await axios.delete(`${urls.baseUrl}/faq/${id}`, { headers: { Authorization: `Bear ${token}` } });
            setTimeout(() => {
                onClose()
            }, 800);
            toggleRefreshData();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
            opened={open}
            onClose={onClose}
            size={500}
            withCloseButton={false}
            closeOnClickOutside={false}
        >
            <Container>
                <Stack justify="center" align="center">
                    <Text>Are you sure you want to Delete this FAQ?</Text>
                    <Group>
                        <Button
                            variant="outline"
                            color="green"
                            onClick={() => setTimeout(()=> onClose(), 800)}
                        >
                            No
                        </Button>
                        <Button
                            color="red"
                            onClick={deleteFaq}
                        >
                            Yes
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </Modal>
    )
}

export default DeleteFaqModal;