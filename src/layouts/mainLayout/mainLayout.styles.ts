import { createStyles } from '@mantine/core';

import { colors } from '../../constants/colors';

export const useStyles = createStyles((theme) => ({
    active: {
        color: `${colors.primaryColor}`
    },

    activeSignIn: {
        backgroundColor: theme.colors.gray[0],
        color: `${colors.primaryColor}`,
        cursor: "default"  
    },

    activeSignUp: {
        backgroundColor: `${colors.primaryColor}`,
        color: theme.colors.gray[0],
        cursor: "default"
    },

    bodyBackground: {
        background: theme.colorScheme === 'light' ?  theme.colors.gray[0] : theme.colors.dark[7],
        margin: "0"
    },

    burger: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "120px",
        width: "100%",
    },

    header: {
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 105,
        maxWidth: "1600px",
        [theme.fn.largerThan("lg")]: {
           minWidth: 1280
         },
    },

    headerBackground: {
        background: theme.colors.gray[0],
        width: "100%",
        display:"flex",
        justifyContent: "center"
    },

    links: {
        margin: "0 45px",
        display: "flex",
        [theme.fn.smallerThan("md")]: {
            display: "none"
        }
    },

    logo: {
        [theme.fn.smallerThan("md")]: {
            display: "none"
        }
    },

    navbar: {
        display: "flex",
        flexDirection: "column",
        [theme.fn.largerThan("md")]: {
          display: "none"
        },

    },
    
    navitem: {
        margin: "0 15px",
        color: theme.colorScheme === 'dark' ?  theme.colors.gray[5] : theme.colors.dark[5],
        fontWeight: 600,

        '&:hover': {
            textDecoration: 'underline',
            textDecorationColor: `${colors.primaryColor}`,
            textDecorationThickness: '4px'
        }
    },

    signin: {
        backgroundColor: `${colors.primaryColor}`,
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "5px 10px",
        color: theme.colors.gray[0] ,
         textAlign: "center",   
        [theme.fn.smallerThan("md")]: {
            width: '120px',
            margin: '7px 7px'
        },

        '&:hover': {
            backgroundColor: `transparent`,
            color: `${colors.primaryColor}`,
            textDecoration: 'none'
        }, 
    },

    signup: {
        backgroundColor: "transaparent",
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "5px 10px",
        color:  `${colors.primaryColor}`,
        textAlign: "center",
        [theme.fn.smallerThan("md")]: {
          width: '120px',
          margin: '7px 7px'
        },
        '&:hover': {
            backgroundColor: `${colors.primaryColor}`,
            color:  theme.colors.gray[0],
            
        }
    
    },

}))