import { Text, UnstyledButton } from "@mantine/core";

import { useStyles } from './printButtons.styles';



const ExcelButton = () => {
    const { classes } = useStyles();
    const onClick = () => {
       
    }
    return (
        <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.excelButton}`}>
            <Text size="lg">Download to Excel</Text>
        </UnstyledButton>
    )
}

export default ExcelButton;