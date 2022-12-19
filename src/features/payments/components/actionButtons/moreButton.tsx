import { Text, UnstyledButton } from "@mantine/core";

import { useStyles } from './actionButtons.styles';

interface UserID {
    id: number
}

const MoreButton = ({id}: UserID) => {
    const { classes } = useStyles();
    const onClick = () => {
        console.log(id);
    }
    return (
        <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.moreButton}`}>
            <Text size="sm">More</Text>
        </UnstyledButton>
    )
}

export default MoreButton;