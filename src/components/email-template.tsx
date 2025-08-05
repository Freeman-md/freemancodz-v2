import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#333' }}>
      <h2>New Contact Form Submission</h2>

      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>

      <div style={{ marginTop: '1em' }}>
        <p><strong>Message:</strong></p>
        <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
      </div>

      <hr style={{ margin: '2em 0' }} />

      <footer style={{ fontSize: '0.85em', color: '#888' }}>
        This message was submitted via your contact form.
      </footer>
    </div>
  );
}
