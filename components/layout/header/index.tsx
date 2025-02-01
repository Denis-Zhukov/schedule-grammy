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
import { AddLessonModal } from '@/components/modals/add-lesson';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations('header');

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
                <LanguageSwitcher
                  cookieName="locale"
                  locales={{ en: 'English', ru: 'Русский' }}
                />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpen(true);
                  handleMenuClose();
                }}
                sx={{ color: '#fff' }}
              >
                {t('add-lesson')}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
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
              }}
              onClick={() => setOpen(true)}
            >
              {t('add-lesson')}
            </Button>
            <LanguageSwitcher
              cookieName="locale"
              locales={{ en: 'English', ru: 'Русский' }}
            />
          </Box>
        )}
      </Toolbar>

      <AddLessonModal open={open} handleClose={() => setOpen(false)} />
    </AppBar>
  );
};
