"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared contact form logic for both desktop and mobile surfaces.
 * Handles submission state, local contact API call, and auto-reset.
 *
 * @returns {{ status: string, handleSubmit: Function }}
 */
export default function useContactForm() {
  const [status, setStatus] = useState("idle");
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const resetStatusLater = useCallback((delay) => {
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), delay);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      website: form.website?.value || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        resetStatusLater(4000);
      } else {
        setStatus("error");
        resetStatusLater(3000);
      }
    } catch {
      setStatus("error");
      resetStatusLater(3000);
    }
  };

  return { status, handleSubmit };
}
