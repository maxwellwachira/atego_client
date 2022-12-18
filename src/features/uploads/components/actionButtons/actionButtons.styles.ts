import { createStyles } from "@mantine/core";

import { colors } from "../../../../constants/colors";

export const useStyles = createStyles((theme) => ({
    addButton: {
        border: `3px solid ${theme.colors.green[7]}`,
        color: `${theme.colors.green[7]}`,
        fontWeight: 600,
        background:'white',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        '&:hover': {
            background: `${theme.colors.green[7]}`,
            color: 'white'
        }
    },

    button: {
        padding: '2px 10px',
        borderRadius: '10px',
        background: 'transaparent',
        
    },

    deleteButton: {
        border: `2px solid ${theme.colors.red[5]}`,
        color: `${theme.colors.red[5]}`,
        '&:hover': {
            background: `${theme.colors.red[5]}`,
            color: 'white'
        }
    },

    editButton: {
        border: `2px solid ${colors.tertiaryColor}`,
        color: `${colors.tertiaryColor}`,
        '&:hover': {
            background: `${colors.tertiaryColor}`,
            color: 'white'
        }
    },

    moreButton: {
        border: `2px solid ${theme.colors.dark[7]}`,
        color: `${theme.colors.dark[7]}`,
        '&:hover': {
            background: `${theme.colors.dark[7]}`,
            color: 'white'
        }
    }
}));