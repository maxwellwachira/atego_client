import { useState } from "react";
import { IconPlus } from "@tabler/icons";
import { Button, createStyles } from "@mantine/core";
import AddFaqModal from "./addFaqModal";


const useStyles = createStyles((theme) => ({
    addButton: {
        border: `3px solid ${theme.colors.green[7]}`,
        borderRadius: 10,
        color: `${theme.colors.green[7]}`,
        fontWeight: 600,
        background: 'white',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        '&:hover': {
            background: `${theme.colors.green[7]}`,
            color: 'white'
        }
    }
}));


const AddFaqButton = () => {
    const [open, setOpen] = useState(false);
    const { classes } = useStyles();

    const onClick = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button
                leftIcon={<IconPlus />}
                className={classes.addButton}
                onClick={onClick}
            >
                Add FAQ
            </Button>
            <AddFaqModal open={open} onClose={onClose} />
        </>
    )
}

export default AddFaqButton;