import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton } from '@mantine/core';
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons';

import { useStyles } from './navbarLinkGroups.styles';
import { colors } from '../../constants/colors';

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string, active?: boolean }[];
  active?: boolean;
}


export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links, active }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  const onClick = () => {
    setOpened((o) => !o);
  }

  const items = (hasLinks ? links : []).map((arrlink) => (
    <Text<'a'>
      component="a"
      className={`${classes.link} ${arrlink.active ? classes.activeGroupLink : ''}`}
      href={arrlink.link}
      key={arrlink.label}
    >
      {arrlink.label}
    </Text>
  ));

  

  return (
    <>
      <UnstyledButton onClick={onClick} className={`${classes.control} ${active ? classes.active : ""}`} >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30} color={`${colors.primaryLight}`}> 
              <Icon size={18} color={`${colors.primaryColor}`}/>
            </ThemeIcon>
            {hasLinks ? 
              (<Box ml="md">{label}</Box>) :
              (<Text<'a'>
                component="a"
                href={link}
                key={label}
                ml="md"
               >
                {label}
               </Text>
              )
            }
            
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

