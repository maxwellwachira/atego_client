import { createStyles } from "@mantine/core";

import { colors } from "../../constants/colors";

export const useStyles = createStyles((theme) => ({
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
      paddingBottom: 0,
    },
  
    header: {
      padding: theme.spacing.md,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: `${colors.secondaryColor}`

    },
    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },
  
    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },
  
    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  }));