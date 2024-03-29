import { createStyles } from '@mantine/core';

import { colors } from '../../constants/colors';

export const useStyles = createStyles((theme) => ({
    active: {
        color: `${colors.primaryColor}`
    },

    activeSignIn: {
        backgroundColor: `${colors.primaryColor}`,
        color: theme.colors.gray[0],
        cursor: "default"
    },

    activeSignUp: {
        backgroundColor: `${colors.secondaryColor}`,
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
        height: "75px",
        width: "100%",
    },

    header: {
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 95,
        maxWidth: "1600px",
       
        [theme.fn.largerThan("md")]: {
                width: "100%",
                maxWidth: "1080px",
            
        },
    },

    headerBackground: {
        width: "100%",
        display:"flex",
        justifyContent: "center"
    },

    links: {
        display: "flex",
        [theme.fn.smallerThan("md")]: {
            display: "none"
        }
    },

    logo: {
        marginLeft: 20,
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
            textDecoration: 'none'
        }, 
    },

    signup: {
        backgroundColor: "transaparent",
        border: `2px solid ${colors.secondaryColor}`,
        borderRadius: "10px",
        padding: "5px 10px",
        color:  `${colors.secondaryColor}`,
        textAlign: "center",
        [theme.fn.smallerThan("md")]: {
          width: '120px',
          margin: '7px 7px'
        },
        '&:hover': {
            backgroundColor: `${colors.secondaryColor}`,
            color:  theme.colors.gray[0],
            textDecoration: 'none'
        }
    
    },

    userIcon: {
        position: 'absolute',
        top: 27.5,
        marginLeft: 30,
    },

    userIconContent: {
        display: 'flex',
        flexDirection: 'row'
    },

    whatsapp : {
        position: 'fixed',
        top: 'calc(100vh - 105px)',
        right: 0,
        marginRight: 30,
        zIndex: 10,
        [theme.fn.smallerThan("md")]: {
            marginRight: 10,
        }
    }

}))