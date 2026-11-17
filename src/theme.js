import { createTheme } from '@mui/material/styles';

const font = '"Nunito Variable", system-ui, sans-serif';

export function buildTheme(mode) {
  const dark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#e4a0f9' : '#9a35b8' },
      secondary: { main: dark ? '#a7e3cf' : '#1e4c3f' },
      background: dark
        ? { default: '#1e4c3f', paper: '#24584a' }
        : { default: '#fbf5fd', paper: '#ffffff' },
      text: dark
        ? { primary: '#f1f7f4', secondary: '#b3cdc3' }
        : { primary: '#14342b', secondary: '#4c6b61' },
      divider: dark ? 'rgba(241,247,244,0.16)' : 'rgba(20,52,43,0.14)',
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: font,
      h1: { fontWeight: 700, letterSpacing: '-0.01em' },
      h2: { fontWeight: 800, letterSpacing: '-0.01em' },
      h3: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 800 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiCard: { defaultProps: { variant: 'outlined' } },
      MuiDialog: { styleOverrides: { paper: { backgroundImage: 'none' } } },
    },
  });
}
