import { createStyles } from "@mantine/core";

import { colors } from "../../../../constants/colors";

export const useStyles = createStyles((theme) => ({
    button: {
        padding: '2px 10px',
        borderRadius: '10px',
        background: 'transaparent'
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
        border: `2px solid ${colors.secondaryColor}`,
        color: `${colors.secondaryColor}`,
        '&:hover': {
            background: `${colors.secondaryColor}`,
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