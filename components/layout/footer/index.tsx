import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { getMessages } from 'next-intl/server';

const socialLinks = [
  {
    href: 'https://github.com/Denis-Zhukov',
    icon: <GitHubIcon fontSize="small" />,
  },
  {
    href: 'https://t.me/Denis_Zhukov_Hachiko',
    icon: <TelegramIcon fontSize="small" />,
  },
];

export const Footer = async () => {
  const messages = (await getMessages())['footer'] as Record<string, string>;

  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #191919, #222831)',
        py: 0.15,
        boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ minHeight: 24, justifyContent: 'space-between', px: 0.5 }}
        >
          <Typography
            variant="caption"
            color="rgba(255, 255, 255, 0.7)"
            sx={{ fontSize: '0.7rem' }}
          >
            © {new Date().getFullYear()} {messages['owner']}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map(({ href, icon }, index) => (
              <IconButton
                key={index}
                color="inherit"
                href={href}
                target="_blank"
                sx={{
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease-in-out',
                  '&:hover': { opacity: 1 },
                  fontSize: '1rem',
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
