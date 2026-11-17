import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useInView } from '../hooks/useInView';

// Page section with a heading that fades and slides in when scrolled to.
export default function Section({ id, eyebrow, title, children }) {
  const [ref, inView] = useInView(0.12);
  return (
    <Box component="section" id={id} sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 64 }}>
      <Container
        ref={ref}
        maxWidth="lg"
        sx={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(24px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none', transform: 'none' },
        }}
      >
        <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.16em' }}>
          {eyebrow}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 5 }}>
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
}
