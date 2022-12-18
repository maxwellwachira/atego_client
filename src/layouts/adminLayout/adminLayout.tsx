import { useState, ReactNode } from 'react';
import { Burger, Header, Navbar, Group, Code, MediaQuery, ScrollArea, Text, AppShell } from '@mantine/core';
import {
  IconGauge,
  IconMessage,
  IconSchool,
  IconUsers,
  IconCertificate,
  IconLogout,
  IconVideo,
  IconUpload,
  IconSitemap,
} from '@tabler/icons';
import { useRouter } from 'next/router';

import { UserButton } from '../../components/userButton/userButton';
import { LinksGroup } from '../../components/navbarLinkGroups/navbarLinkGroups';
import { useStyles } from './adminLayout.styles';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';

type Props = {
  children: ReactNode;
}

export function AdminLayout({children}: Props ) {
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
      link: '/admin', 
      active: router.pathname === '/admin' ? true : false
    },
    {
      label: 'Courses',
      icon: IconCertificate,
      index:1,
      active: router.pathname === '/admin/courses' ? true : router.pathname === '/admin/categories' ? true : false,
      initiallyOpened: router.pathname === '/admin/courses' ? true : router.pathname === '/admin/categories' ? true : false,
      links: [
        { label: 'Categories', link: '/admin/categories', active: router.pathname === '/admin/categories' ? true : false, },
        { label: 'All Courses', link: '/admin/courses', active: router.pathname === '/admin/courses' ? true : false, },
      ],
    },
    {
      label: 'Students',
      icon: IconUsers,
      link: '/admin/students',
      active: router.pathname === '/admin/students' ? true : false,
    },
    { 
      label: 'Tutors', 
      icon: IconSchool, 
      link: '/admin/tutors', 
      active: router.pathname === '/admin/tutors' ? true : false,
    },
    // { 
    //   label: 'Payments', 
    //   icon: IconCoin, 
    //   link: '/admin/payments', 
    //   active: router.pathname === '/admin/payments' ? true : false,
    // },
    { 
      label: 'Live Session', 
      icon: IconVideo, 
      link: '/admin/live-session', 
      active: router.pathname === '/admin/live-session' ? true : false,
    },
    {
      label: 'Uploads',
      icon: IconUpload,
      link: '/admin/uploads',
      active: router.pathname === '/admin/uploads' ? true : false,
    },
    {
      label: 'Messaging',
      icon: IconMessage,
      active: router.pathname === '/admin/send-sms' ? true : router.pathname === '/admin/sent-sms' ? true : false,
      initiallyOpened: router.pathname === '/admin/send-sms' ? true : router.pathname === '/admin/sent-sms' ? true : false,
      links: [
        { label: 'Send SMS', link: '/admin/send-sms', active: router.pathname === '/admin/send-sms' ? true : false, },
        { label: 'Sent SMS', link: '/admin/sent-sms', active: router.pathname === '/admin/sent-sms' ? true : false, },
      ],
    },
    { 
      label: 'Logout', 
      icon: IconLogout, 
      link: '/auth/logout',  
      active: router.pathname === '/admin/logout' ? true : false,
    },
  ];

  const links = data.map((item) => <LinksGroup {...item} key={item.label}/>);

  return (
      <AppShell
        header={
         <Header height={50} p="md" style={{background: '#14481e'}}>
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

