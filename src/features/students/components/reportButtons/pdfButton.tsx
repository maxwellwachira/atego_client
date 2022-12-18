import { Text, UnstyledButton } from "@mantine/core";

import { useStyles } from './printButtons.styles';



const PdfButton = () => {
    const { classes } = useStyles();
    const onClick = () => {
       
    }
    return (
        <UnstyledButton onClick={onClick} className={`${classes.button} ${classes.pdfButton}`}>
            <Text size="lg">Download to PDF</Text>
        </UnstyledButton>
    )
}

export default PdfButton;