import React, { ReactNode, useState } from 'react';
import {
  Anchor,
  AppShell,
  Burger,
  Divider,
  Drawer,
  Header,
  MediaQuery,
  Navbar,
  Space,
} from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useStyles } from './mainLayout.styles';
import logo from '../../assets/logo.png';
import { colors } from '../../constants/colors';

type Props = {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <AppShell
        navbarOffsetBreakpoint="md"
        fixed
        header = {
        <Header height={105} className={`${classes.headerBackground}`} withBorder>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div  className={classes.burger}>
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
              <Anchor className={`${classes.navitem} ${router.pathname === "/" ? classes.active : "" }`} href="/">Courses</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : "" }`} href="#">About</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/find-a-home" ? classes.active : "" }`} href="#">Financial Aid</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/faq" ? classes.active : "" }`} href="#">Community</Anchor>
              <div>
                <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/sign-in" ? classes.activeSignIn : "" }`} href="#" >Sign In</Anchor>
                <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/sign-up" ? classes.activeSignUp : "" }`} href="/auth/sign-in">Sign Up</Anchor>
              </div>
            </div>
          </div>
        </Header>}

        navbar = {<Navbar
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
                <Anchor className={`${classes.navitem} ${router.pathname === "/" ? classes.active : "" }`} href="/">Courses</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : "" }`} href="#">About</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname === "/find-a-home" ? classes.active : "" }`} href="#">Financial Aid</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname === "/faq" ? classes.active : "" }`} href="#">Community</Anchor>
                <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/sign-in" ? classes.activeSignIn : "" }`} href="#" >Sign In</Anchor>
                <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/sign-up" ? classes.activeSignUp : "" }`} href="/auth/sign-in">Sign Up</Anchor>
              </div>
            </Drawer>
        </Navbar>}
    >
        {children}
    </AppShell>
  );
}

export default MainLayout;
