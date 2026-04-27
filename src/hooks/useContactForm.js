"use client";

import { useState } from "react";

/**
 * Shared contact form logic for both desktop and mobile surfaces.
 * Handles submission state, API call to web3forms, and auto-reset.
 *
 * @returns {{ status: string, handleSubmit: Function }}
 */
export default function useContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = {
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      subject: "Portfolio Contact — " + form.name.value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return { status, handleSubmit };
}
