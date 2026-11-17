import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MailOutline from '@mui/icons-material/EmailOutlined';
import { profile } from '../data';
import { useTypewriter } from '../hooks/useTypewriter';
import ComputerCanvas from './ComputerCanvas';

const before = 'welcome to, ';
const after = " portfolio";
const greeting = [before + profile.firstName + after];

export default function Hero() {
  const typed = useTypewriter(greeting, { typeMs: 90, loop: false });
  const nameEnd = before.length + profile.firstName.length;

  return (
    <Box
      id="top"
      component="header"
      sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 8 }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            justifyItems: { xs: 'center', md: 'start' },
            gap: { xs: 3, md: 6 },
            gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <ComputerCanvas label="A retro desktop computer with keyboard and a hovering mouse, drawn in dashes" />
          <Box>
            <Typography
              variant="h1"
              aria-label={greeting[0]}
              sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }, minHeight: '1.2em' }}
            >
              <span aria-hidden>
                {typed.slice(0, before.length)}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>
                  {typed.slice(before.length, nameEnd)}
                </Box>
                {typed.slice(nameEnd)}
              </span>
              <Box
                component="span"
                aria-hidden
                sx={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1em',
                  ml: 0.5,
                  bgcolor: 'primary.main',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 1s steps(1) infinite',
                  '@keyframes blink': { '50%': { opacity: 0 } },
                }}
              />
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 480, mt: 2.5, lineHeight: 1.8 }}>
              {profile.tagline}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              startIcon={<MailOutline />}
              sx={{ mt: 4, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              Say hi!
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
