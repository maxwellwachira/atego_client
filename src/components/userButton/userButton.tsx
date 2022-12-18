import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
  } from '@mantine/core';
  import { IconChevronRight } from '@tabler/icons';
  
 import { useStyles } from './userButton.styles';
 import { colors } from '../../constants/colors';

  interface UserButtonProps extends UnstyledButtonProps {
    initials: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
  }
  
  export function UserButton( {initials, name, email, icon, ...others }: UserButtonProps) {
    const { classes } = useStyles();
  
    return (
      <UnstyledButton className={classes.user} {...others}>
        <Group>
          <Avatar radius="xl"><Text color={`${colors.primaryColor}`}>{initials}</Text></Avatar>
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
  
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
  
          {icon || <IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    );
  }