'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { locales } from './config';
import { signOut } from 'next-auth/react';
import { useModalState } from '@/hooks/use-modal';

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations('header');

  const { handleOpen } = useModalState('add-lesson');

  const handleOpenAddLesson = () => {
    handleOpen();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #191919, #222831)',
        px: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isMobile ? (
          <>
            <IconButton
              sx={{ display: 'flex', gap: 1 }}
              edge="start"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
              <Typography variant="body1" color="white">
                {t('menu')}
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                '& .MuiMenu-paper': {
                  backgroundColor: '#333',
                  color: '#fff',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose} sx={{ color: '#fff' }}>
                <LanguageSwitcher cookieName="locale" locales={locales} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenAddLesson();
                  handleMenuClose();
                }}
                sx={{ color: '#fff' }}
              >
                {t('add-lesson')}
              </MenuItem>
              <MenuItem onClick={() => signOut()} sx={{ color: '#fff' }}>
                {t('sign-out')}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                mr: 'auto',
              }}
              onClick={handleOpenAddLesson}
            >
              {t('add-lesson')}
            </Button>
            <LanguageSwitcher cookieName="locale" locales={locales} />
            <Button
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              onClick={() => signOut()}
            >
              {t('sign-out')}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
