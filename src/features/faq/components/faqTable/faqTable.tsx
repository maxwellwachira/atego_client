import { ActionIcon, Button, Group, Menu, Table } from "@mantine/core";
import { IconEdit, IconGridDots, IconTrash } from "@tabler/icons";
import { useState } from "react";
import DeleteFaqModal from "../deleteFaq/deleteFaQ";
import EditFaqModal from "../editFaq/editFaq";

interface TopicData {
    data: {
        id: string;
        count: number;
        question: number;
        answer: string;
    }[]
};

const FaqTable = ({ data }: TopicData) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [id, setId] = useState('');

    const onCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const onCloseEditModal = () => {
        setOpenEditModal(false);
    }

    const onClick = (id: string) => {
        setId(id);
        setOpenDeleteModal(true);
    }

    const onClickEdit = (id: string) => {
        setId(id);
        setOpenEditModal(true);
    }

    const rows = data.map((element) => (
        <tr key={element.id}>
            <td>{element.count}</td>
            <td>{element.question}</td>
            <td dangerouslySetInnerHTML={{ __html: element.answer }} />
            <td>
                <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={250} transition="rotate-right" transitionDuration={150}>
                    <Menu.Target>
                        <ActionIcon>
                            <IconGridDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown >
                        <Menu.Label>Action</Menu.Label>
                        <Menu.Item icon={<IconEdit size={14} />} onClick={() => onClickEdit(element.id)}>Edit</Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => onClick(element.id)}>Delete FAQ</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </td>
        </tr>
    ))
    return (
        <>
            <Table striped highlightOnHover captionSide="bottom" mt={20}>
                <caption>Atego FAQ</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            <DeleteFaqModal open={openDeleteModal} onClose={onCloseDeleteModal} id={id} />
            <EditFaqModal open={openEditModal} onClose={onCloseEditModal}  id={id}/>
        </>

    );
}

export default FaqTable;