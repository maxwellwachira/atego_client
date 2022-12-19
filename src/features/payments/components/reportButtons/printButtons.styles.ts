import { createStyles } from "@mantine/core";

import { colors } from "../../../../constants/colors";

export const useStyles = createStyles((theme) => ({
    button: {
        padding: '2px 10px',
        borderRadius: '7px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        '&:hover': {
            background: 'white'
        }
    },

    excelButton: {
        border: `2px solid ${theme.colors.green[7]}`,
        background: `${theme.colors.green[7]}`,
        color: 'white',
        '&:hover': {
            color: `${theme.colors.green[7]}`,
        }
    },

    pdfButton: {
        border: `2px solid ${theme.colors.red[7]}`,
        background: `${theme.colors.red[7]}`,
        color: 'white',
        '&:hover': {
            color: `${theme.colors.red[7]}`,
        }
    },

    printButton: {
        border: `2px solid ${colors.secondaryColor}`,
        background: `${colors.secondaryColor}`,
        color: 'white',

        '&:hover': {
            color: `${colors.secondaryColor}`,
        }
    },

  
}));