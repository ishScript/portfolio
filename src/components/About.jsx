import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { about, skillGroups } from '../data';
import { useInView } from '../hooks/useInView';
import Section from './Section';

// Running chip count before each group, so the stagger continues across groups.
const offsets = skillGroups.map((_, g) =>
  skillGroups.slice(0, g).reduce((n, group) => n + group.items.length, 0),
);

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Stack spacing={2}>
          {about.map((paragraph) => (
            <Typography key={paragraph} color="text.secondary" sx={{ fontSize: '1.0625rem' }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>
        <Stack ref={ref} spacing={3}>
          {skillGroups.map((group, g) => (
            <Box key={group.label}>
              <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                {group.label}
              </Typography>
              <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                {group.items.map((item, i) => {
                  const delay = (offsets[g] + i) * 35;
                  return (
                    <Chip
                      key={item}
                      label={item}
                      variant="outlined"
                      sx={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'none' : 'scale(0.85)',
                        transition: `opacity 350ms ${delay}ms ease, transform 350ms ${delay}ms ease, border-color 150ms, color 150ms`,
                        '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none', transform: 'none' },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Section>
  );
}
