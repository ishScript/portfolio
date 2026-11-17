import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Search from '@mui/icons-material/Search';
import { projects } from '../data';
import Section from './Section';

const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))];

export default function Projects() {
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (tag === 'All' || p.tags.includes(tag)) &&
        (!q || `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [tag, query]);

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 4, alignItems: { md: 'center' }, justifyContent: 'space-between' }}
      >
        <Stack direction="row" role="group" aria-label="Filter by technology" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {allTags.map((t) => (
            <Chip
              key={t}
              label={t}
              clickable
              onClick={() => setTag(t)}
              color={t === tag ? 'primary' : 'default'}
              variant={t === tag ? 'filled' : 'outlined'}
              aria-pressed={t === tag}
            />
          ))}
        </Stack>
        <TextField
          size="small"
          placeholder="Search projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            htmlInput: { 'aria-label': 'Search projects' },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {visible.map((p) => (
          <Card
            key={p.id}
            sx={{
              transition: 'transform 200ms ease, border-color 200ms ease',
              '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' },
            }}
          >
            <CardActionArea onClick={() => setSelected(p)} sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
                <Typography variant="overline" color="text.secondary">
                  {p.when}
                </Typography>
                <Typography variant="h5" component="h3">
                  {p.title}
                </Typography>
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                  {p.summary}
                </Typography>
                <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
                  {p.tags.map((t) => (
                    <Chip key={t} label={t} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {visible.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          No projects match that filter.
        </Typography>
      )}

      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle>{selected.title}</DialogTitle>
            <DialogContent>
              <Typography variant="overline" color="text.secondary">
                {selected.when}
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 2.5, color: 'text.secondary', '& li': { mb: 1 } }}>
                {selected.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </Box>
              <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
                {selected.tags.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setSelected(null)}>Close</Button>
              {selected.repo && (
                <Button href={selected.repo} target="_blank" rel="noreferrer">
                  Source
                </Button>
              )}
              {selected.demo && (
                <Button variant="contained" href={selected.demo} target="_blank" rel="noreferrer">
                  Live demo
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Section>
  );
}
