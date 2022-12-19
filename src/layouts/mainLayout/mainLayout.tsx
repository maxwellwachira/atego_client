import React, { ReactNode, useState } from 'react';
import {
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Divider,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  Space,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useStyles } from './mainLayout.styles';
import logo from '../../assets/logo.png';
import { colors } from '../../constants/colors';
import whatsapp from '../../assets/whatsapp.png';
import { useAuthContext } from '../../features/authentication';
import { UserButton } from '../../components/userButton/userButton';
import { IconChevronDown, IconChevronRight, IconDashboard, IconLogout } from '@tabler/icons';

type Props = {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { auth, userMe } = useAuthContext();

  const getInitials = (nameString: string) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="md"
      fixed
      header={
        <Header height={105} className={`${classes.headerBackground}`} withBorder={true}>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div className={classes.burger}>
              <Anchor href="/" ml="xl">
                <Image
                  src={logo}
                  width={150}
                  height={100}
                  alt='logo'

                />
              </Anchor>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="md"
                color={`${colors.primaryColor}`}
                mr="xl"
              />
            </div>
          </MediaQuery>
          <div className={classes.header}>
            <div className={classes.logo}>
              <Anchor href="/" className={classes.navitem}>
                <Image
                  src={logo}
                  width={150}
                  height={100}
                  alt='logo'
                />

              </Anchor>
            </div>
            <div className={classes.links}>
              <Anchor className={`${classes.navitem} ${router.pathname === "/courses" ? classes.active : ""}`} href="/courses">Courses</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : ""}`} href="/about">About</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/find-a-home" ? classes.active : ""}`} href="#">Financial Aid</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/faq" ? classes.active : ""}`} href="#">Community</Anchor>
              <div>
                {auth ?
                  <div className={classes.userIcon}>
                    <Menu shadow="md" width={250} transition="rotate-right" transitionDuration={150}>
                      <Menu.Target>
                        <UnstyledButton>
                          <Group>
                            <Avatar radius="xl"><Text color={`${colors.primaryColor}`}>{getInitials(`${userMe.firstName} ${userMe.lastName}`)}</Text></Avatar>
                            <div style={{ flex: 1 }}>
                              <Text size="sm" weight={500}>
                                {userMe.firstName}
                              </Text>

                            </div>

                            <IconChevronRight size={14} stroke={1.5} />
                          </Group>
                        </UnstyledButton>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>{userMe.email}</Menu.Label>
                        <Menu.Item
                          icon={<IconDashboard size={14} />}
                          component="a"
                          href={userMe.role === "admin" ? "/admin" : userMe.role === "tutor" ? "/tutors/uploads" : "/students"}
                        >
                          Dashboard
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          color="red"
                          icon={<IconLogout size={14} />}
                          component="a"
                          href="/auth/logout"
                        >
                          Logout
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div> :
                  <div>
                    <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/login" ? classes.activeSignIn : ""}`} href="/auth/login" >Login</Anchor>
                    <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/register" ? classes.activeSignUp : ""}`} href="/auth/register">Register</Anchor>
                  </div>
                }
              </div>
            </div>
          </div>
        </Header>}

      navbar={<Navbar
        width={{ base: "100%", sm: 0 }}
        hidden={!opened}
      >
        <Drawer
          position='top'
          opened={opened}
          onClose={() => setOpened(false)}
          overlayOpacity={0.55}
          overlayBlur={3}
          transition="rotate-left"
          transitionDuration={250}
          transitionTimingFunction="ease"
          closeButtonLabel={"close"}
        >
          <Divider mb="md" />
          <div className={classes.navbar}>
            <Anchor className={`${classes.navitem} ${router.pathname === "/" ? classes.active : ""}`} href="/">Home</Anchor>
            <Space h="xs" />
            <Anchor className={`${classes.navitem} ${router.pathname === "/courses" ? classes.active : ""}`} href="/courses">Courses</Anchor>
            <Space h="xs" />
            <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : ""}`} href="/about">About</Anchor>
            <Space h="xs" />
            <Anchor className={`${classes.navitem} ${router.pathname === "/find-a-home" ? classes.active : ""}`} href="#">Financial Aid</Anchor>
            <Space h="xs" />
            <Anchor className={`${classes.navitem} ${router.pathname === "/faq" ? classes.active : ""}`} href="#">Community</Anchor>
            <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/login" ? classes.activeSignIn : ""}`} href="/auth/login" >Login</Anchor>
            <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/register" ? classes.activeSignUp : ""}`} href="/auth/register">Register</Anchor>
          </div>
        </Drawer>
      </Navbar>}
    >
      <Anchor className={classes.whatsapp} href='https://wa.me/254703519593?text=Hello%2C%20I%20am%20interested%20in%20Atego' target='_blank'>
        <Image
          src={whatsapp}
          height={60}
          width={60}
          alt="whatsapp icon"
        />
      </Anchor>
      {children}
    </AppShell>
  );
}

export default MainLayout;
