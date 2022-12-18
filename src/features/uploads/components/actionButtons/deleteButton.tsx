import { Text, UnstyledButton } from "@mantine/core";
import axios from "axios";

import { urls } from "../../../../constants/urls";
import { useStyles } from './actionButtons.styles';
import { useRefreshContext } from "../../../lms/contexts/refreshDataContexProvider";

interface ID {
    id: string;
    type: string;
}

const DeleteButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const { toggleRefreshData } = useRefreshContext();

    const onClick = async() => {
        const confirmation = confirm("Are you sure you want to delete this file? ");
        if(confirmation){
            try {
                await axios.delete(`${urls.baseUrl}/upload/${id}`);
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