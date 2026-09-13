/** Ink-drawn marginalia. Sized in em so they ride the page type scale. */

type P = { className?: string };

const base = "inline-block align-middle";

export function CapIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 3 1.5 8.2 12 13.4l8.4-4.2v5.3h1.8V8.2L12 3Z" />
      <path d="M5.4 11.6v4.1c0 1.6 3 3.1 6.6 3.1s6.6-1.5 6.6-3.1v-4.1L12 14.9l-6.6-3.3Z" />
    </svg>
  );
}

export function CaseIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M9 4h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm0 3h6V6H9v1Z" />
    </svg>
  );
}

export function PersonIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <circle cx="12" cy="7.6" r="4.1" />
      <path d="M3.6 20.6c0-4 3.8-6.6 8.4-6.6s8.4 2.6 8.4 6.6v.6H3.6v-.6Z" />
    </svg>
  );
}

export function CompassIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 20.3s-7.4-4.6-7.4-9.4A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 7.4 2.6c0 4.8-7.4 9.4-7.4 9.4Z" />
    </svg>
  );
}

export function GroupIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <circle cx="12" cy="7" r="2.9" />
      <circle cx="5.2" cy="9.2" r="2.3" />
      <circle cx="18.8" cy="9.2" r="2.3" />
      <path d="M12 11.4c-3 0-5.4 1.8-5.4 4.2v2.2h10.8v-2.2c0-2.4-2.4-4.2-5.4-4.2Z" />
      <path d="M5.2 12.6c-2 0-3.6 1.2-3.6 2.9v1.5h3.8v-1.4c0-1.1.4-2.1 1.1-2.9-.4-.1-.8-.1-1.3-.1Zm13.6 0c-.5 0-.9 0-1.3.1.7.8 1.1 1.8 1.1 2.9V17h3.8v-1.5c0-1.7-1.6-2.9-3.6-2.9Z" />
    </svg>
  );
}

export function EyeIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2.4 12S6 6.4 12 6.4 21.6 12 21.6 12 18 17.6 12 17.6 2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="2.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BulbIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 2.4a6.6 6.6 0 0 0-3.9 11.9c.6.5 1 1.2 1 2v.3h5.8v-.3c0-.8.4-1.5 1-2A6.6 6.6 0 0 0 12 2.4Z" />
      <rect x="9.1" y="17.6" width="5.8" height="1.5" rx="0.7" />
      <rect x="9.9" y="20.1" width="4.2" height="1.5" rx="0.7" />
    </svg>
  );
}

export function SealIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 2.6 14 5l3.1-.5.6 3.1 2.7 1.6-1.6 2.7.6 3.1-3.1.6L14 18.4 12 16l-2 2.4-2.3-2.8-3.1-.6.6-3.1L3.6 9.2l2.7-1.6.6-3.1L10 5l2-2.4Z" />
      <path d="M9.6 17.4 7.9 22l4.1-1.7L16.1 22l-1.7-4.6-2.4 2.6-2.4-2.6Z" />
    </svg>
  );
}

export function ChatIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M3 5.4A1.8 1.8 0 0 1 4.8 3.6h10.4a1.8 1.8 0 0 1 1.8 1.8v5.8a1.8 1.8 0 0 1-1.8 1.8H8.4L4.6 16v-3H4.8A1.8 1.8 0 0 1 3 11.2V5.4Z" />
      <path d="M18.6 7.4h.6A1.8 1.8 0 0 1 21 9.2V15a1.8 1.8 0 0 1-1.8 1.8H19v3l-3.2-3h-4.2a1.8 1.8 0 0 1-1.6-1h5.2a2.8 2.8 0 0 0 2.8-2.8V7.4h.6Z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="2.6" y="5" width="18.8" height="14" rx="1.6" />
      <path d="m3.4 6.4 8.6 6.2 8.6-6.2" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6.2 3.6h3l1.6 4-2 1.4a12.4 12.4 0 0 0 6.2 6.2l1.4-2 4 1.6v3a1.6 1.6 0 0 1-1.7 1.6C11.2 19 5 12.8 4.6 5.3a1.6 1.6 0 0 1 1.6-1.7Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.8h4v11.2H3V9.8Zm6.6 0h3.8v1.5h.1a4.2 4.2 0 0 1 3.8-2.1c4 0 4.7 2.6 4.7 6v5.8h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.8Z" />
    </svg>
  );
}
