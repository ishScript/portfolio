import { useEffect, useState } from 'react';

// Types each word, pauses, deletes it, then moves to the next.
// With loop: false it types the first word once and stops.
export function useTypewriter(words, { typeMs = 70, deleteMs = 35, pauseMs = 1400, loop = true } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (!loop && text === word) return;
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = pauseMs;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeMs, deleteMs, pauseMs, loop]);

  return text;
}
