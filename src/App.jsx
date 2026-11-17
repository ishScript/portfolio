import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { buildTheme } from './theme';
import { profile } from './data';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const year = new Date().getFullYear();

function initialMode() {
  try {
    const saved = localStorage.getItem('color-mode');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // storage unavailable — use the default
  }
  return 'dark';
}

export default function App() {
  const [mode, setMode] = useState(initialMode);
  const theme = useMemo(() => buildTheme(mode), [mode]);

  useEffect(() => {
    try {
      localStorage.setItem('color-mode', mode);
    } catch {
      // ignore
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar mode={mode} onToggleMode={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          © {year} {profile.name}. Built with React and Material UI.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
