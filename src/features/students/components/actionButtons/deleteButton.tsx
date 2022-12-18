import { Text, UnstyledButton } from "@mantine/core";
import axios from "axios";

import { useStyles } from './actionButtons.styles';
import { useRefreshContext } from "../../../lms/contexts/refreshDataContexProvider";
import { urls } from "../../../../constants/urls";

interface ID {
    id: string;
    type: string;
}

const DeleteButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const { toggleRefreshData } = useRefreshContext();

    const onClick = async() => {
        const confirmMessage = type === "student" ? "Are you sure you want to delete this student? " : "Are you sure you want to delete tutor?";
        const confirmation = confirm(confirmMessage);
        if(confirmation){
            try {
                await axios.delete(`${urls.baseUrl}/user/${id}`);
                toggleRefreshData();
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.deleteButton}`}>
            <Text size="sm">Delete</Text>
        </UnstyledButton>
    )
}

export default DeleteButton;