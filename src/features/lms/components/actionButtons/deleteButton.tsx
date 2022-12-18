import { Text, UnstyledButton } from "@mantine/core";
import axios from "axios";

import { urls } from "../../../../constants/urls";
import { useStyles } from './actionButtons.styles';
import { useRefreshContext } from "../../contexts/refreshDataContexProvider";

interface ID {
    id: string;
    type: string;
}

const DeleteButton = ({id, type}: ID) => {
    const { classes } = useStyles();
    const { toggleRefreshData } = useRefreshContext();

    const onClick = async() => {
        const confirmMessage = type === "category" ? 
            "Are you sure you want to delete this category? This will delete all courses in this category" : 
            type === "course" ?
            "Are you sure you want to delete this course?" :
            type === "topic" ?
            "Are you sure you want to delete this topic?" :
            "Are you sure you want to delete this lesson?";

        const confirmation = confirm(confirmMessage);
        if(confirmation){
            const urlPath = type === "category" ? "category" : type === "course" ? "course" : type === "topic" ? "topic" : "lesson";
            try {
                await axios.delete(`${urls.baseUrl}/${urlPath}/${id}`);
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