import { useActionState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Send from '@mui/icons-material/Send';
import { profile } from '../data';
import Section from './Section';

const initialState = { status: 'idle', errors: {}, values: { name: '', email: '', message: '' } };

// React 19 form action: receives the previous state and the submitted FormData.
async function submitContact(_prev, formData) {
  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  const errors = {};
  if (!values.name) errors.name = 'Please tell me your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.';
  if (values.message.length < 10) errors.message = 'A little more detail, please (10+ characters).';
  if (Object.keys(errors).length) return { status: 'invalid', errors, values };

  //setting up request for emails!
  try {
  const response = await fetch('https://formspree.io/f/xeaggjpn', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  });
  if (!response.ok) throw new Error('Formspree rejected the submission');
  return { ...initialState, status: 'sent' };
} catch {
  return { status: 'failed', errors: {}, values };
}
}

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const { errors, values } = state;

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' } }}>
        <Typography color="text.secondary" sx={{ fontSize: '1.0625rem' }}>
          Have a role, a project or just a question? Send a message here or email me directly at{' '}
          <Box component="a" href={`mailto:${profile.email}`} sx={{ color: 'primary.main' }}>
            {profile.email}
          </Box>
          .
        </Typography>

        {/* key resets the uncontrolled fields after each submission */}
        <Stack component="form" action={formAction} noValidate spacing={2} key={state.status + JSON.stringify(values)}>
          {state.status === 'sent' && <Alert severity="success">Thanks! Your message is on its way.</Alert>}
          {state.status === 'failed' && (
            <Alert severity="error">Something went wrong. Please try again or email me directly.</Alert>
          )}
          <TextField
            name="name"
            label="Name"
            defaultValue={values.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
            autoComplete="name"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            defaultValue={values.email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoComplete="email"
          />
          <TextField
            name="message"
            label="Message"
            multiline
            minRows={4}
            defaultValue={values.message}
            error={Boolean(errors.message)}
            helperText={errors.message}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={pending}
            endIcon={<Send />}
            sx={{ alignSelf: 'flex-start' }}
          >
            Send message
          </Button>
        </Stack>
      </Box>
    </Section>
  );
}
