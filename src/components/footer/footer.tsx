import { Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import Image from 'next/image';

import { useStyles } from './footer.styles';
import logo from '../../assets/logo.png';
import { colors } from '../../constants/colors';


interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target='_blank'
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            src={logo}
            width={150}
            height={90}
            alt='logo'
          />
          <Text size="xs" color="dimmed" className={classes.description}>
            Don't wait, Enrol today
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 Atego. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon
            size="lg"
            component='a'
            href='https://twitter.com/_beyondgrades'
            target='_blank'
          >
            <IconBrandTwitter size={18} stroke={1.5} color={`${colors.primaryColor}`} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component='a'
            href='https://www.youtube.com/channel/UCvvziPuo8Jx67q9sNVX9dhA/videos'
            target='_blank'
          >
            <IconBrandYoutube size={18} stroke={1.5} color={`${colors.primaryColor}`} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component='a'
            href='https://www.instagram.com/ategoschool/'
            target='_blank'
          >
            <IconBrandInstagram size={18} stroke={1.5} color={`${colors.primaryColor}`} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default FooterLinks;