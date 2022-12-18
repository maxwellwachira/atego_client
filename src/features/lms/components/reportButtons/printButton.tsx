import { Text, UnstyledButton } from "@mantine/core";

import { useStyles } from './printButtons.styles';



const PrintButton = () => {
    const { classes } = useStyles();
    const onClick = () => {
       
    }
    return (
        <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.printButton}`}>
            <Text size="lg">Print</Text>
        </UnstyledButton>
    )
}

export default PrintButton;