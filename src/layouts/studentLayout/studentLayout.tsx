import { useState, ReactNode } from 'react';
import { Burger, Header, Navbar, Group, Code, MediaQuery, ScrollArea, Text, AppShell } from '@mantine/core';
import {
  IconGauge,
  IconSchool,
  IconUsers,
  IconCertificate,
  IconLogout,
  IconUpload,
  IconSitemap,
} from '@tabler/icons';
import { useRouter } from 'next/router';

import { UserButton } from '../../components/userButton/userButton';
import { LinksGroup } from '../../components/navbarLinkGroups/navbarLinkGroups';
import { useStyles } from './studentLayout.styles';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';

type Props = {
  children: ReactNode;
}

export function StudentLayout({children}: Props ) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const { userMe } = useAuthContext();

  const getInitials = (nameString: string) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }


  const data = [
    { 
      label: 'Main Page', 
      icon: IconSitemap, 
      link: '/', 
      active: router.pathname === '/' ? true : false
    },
    { 
      label: 'Dashboard', 
      icon: IconGauge, 
      link: '/students', 
      active: router.pathname === '/students' ? true : false
    },
    {
      label: 'My Courses',
      icon: IconSchool,
      index:1,
      link: '/students/courses',
      active: router.pathname === '/students/courses' ? true : false,
     
    },
    {
      label: 'Live Session',
      icon: IconUsers,
      link: '/students/live-session',
      active: router.pathname === '/students/live-session' ? true : false,
    },
    {
      label: 'Uploads',
      icon: IconUpload,
      link: '/students/uploads',
      active: router.pathname === '/students/uploads' ? true : false,
    },
    { 
      label: 'Certificates', 
      icon: IconCertificate, 
      link: '/students/certificates', 
      active: router.pathname === '/students/certificates' ? true : false,
    },
  
    { 
      label: 'Logout', 
      icon: IconLogout, 
      link: '/auth/logout',  
      active: router.pathname === '/students/logout' ? true : false,
    },
  ];

  const links = data.map((item) => <LinksGroup {...item} key={item.label}/>);

  return (
      <AppShell
        header={
          <Header height={50} p="md" style={{ background: '#14481e' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="white"
                mr="xl"
              />
            </MediaQuery>
            <Text weight={600} size={25} color='white' ml="lg">Atego</Text>
          </div>
        </Header>
        }
        navbar = {
          <Navbar height={`cal(100vh - 50px)`} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} p="sm" className={classes.navbar} >
            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
              <UserButton
                  initials={getInitials(`${userMe.firstName} ${userMe.lastName}`)}
                  name={`${userMe.firstName} ${userMe.lastName}`}
                  email={`${userMe.email}`}
                />
            </Navbar.Section>   
        </Navbar>
        }
      >
        {children}
      </AppShell>
    
  );
}

