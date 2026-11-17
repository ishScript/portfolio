import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import GitHub from '@mui/icons-material/GitHub';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Mail from '@mui/icons-material/Email';
import { profile } from '../data';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
];

const iconSx = { color: 'text.primary', '&:hover': { color: 'primary.main' } };

export default function NavBar({ mode, onToggleMode }) {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(12px)',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: (t) => `${t.palette.background.default}cc`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 0.5 }}>
          <Typography
            component="a"
            href="#top"
            variant="h6"
            sx={{ color: 'text.primary', textDecoration: 'none', mr: 2, fontSize: '1.05rem' }}
          >
            {profile.name}
          </Typography>
          <Box component="nav" sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
            {links.map((l) => (
              <Button key={l.href} href={l.href} size="small" sx={iconSx}>
                {l.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: { xs: 1, sm: 0 } }} />
          <IconButton href={`mailto:${profile.email}`} aria-label="Email" size="small" sx={iconSx}>
            <Mail fontSize="small" />
          </IconButton>
          <IconButton href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" size="small" sx={iconSx}>
            <GitHub fontSize="small" />
          </IconButton>
          <IconButton href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" size="small" sx={iconSx}>
            <LinkedIn fontSize="small" />
          </IconButton>
          <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            <IconButton onClick={onToggleMode} aria-label="Toggle colour theme" size="small" sx={iconSx}>
              {mode === 'dark' ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
