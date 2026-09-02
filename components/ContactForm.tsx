"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        setStatus("Thanks - your message has been received. Our support team will reply within 1-2 business days.");
        form.reset();
      }}
    >
      <h2>Send a message</h2>
      <label className="field">
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label className="field">
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="field">
        Subject
        <input name="subject" required />
      </label>
      <label className="field">
        Message
        <textarea name="message" required />
      </label>
      <button className="button-primary" type="submit">
        <Send size={16} aria-hidden="true" />
        Send message
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
