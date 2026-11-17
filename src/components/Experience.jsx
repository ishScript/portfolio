import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { education, experience } from '../data';
import Section from './Section';

function Entry({ title, org, meta, points }) {
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 4,
        pb: 5,
        borderLeft: 2,
        borderColor: 'divider',
        '&:last-of-type': { pb: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -7,
          top: 6,
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'primary.main',
        },
      }}
    >
      <Typography variant="overline" color="text.secondary">
        {meta}
      </Typography>
      <Typography variant="h5" component="h3">
        {title}
        <Box component="span" sx={{ color: 'primary.main' }}>
          {' '}
          · {org}
        </Box>
      </Typography>
      {points && (
        <Box component="ul" sx={{ pl: 2.5, mt: 1.5, mb: 0, color: 'text.secondary', '& li': { mb: 0.75 } }}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked and studied">
      <Stack sx={{ maxWidth: 760 }}>
        {experience.map((job) => (
          <Entry
            key={job.org}
            title={job.role}
            org={job.org}
            meta={`${job.dates} · ${job.place}`}
            points={job.points}
          />
        ))}
        <Entry title={education.degree} org={education.school} meta={education.dates} />
      </Stack>
    </Section>
  );
}
