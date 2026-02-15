"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const newErrors: Record<string, string> = {};
    const firstName = form.get("firstName") as string;
    const lastName = form.get("lastName") as string;
    const email = form.get("email") as string;
    const message = form.get("message") as string;

    if (!firstName?.trim()) newErrors.firstName = "First name is required";
    if (!lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message?.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormState("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent</h3>
        <p className="text-gray-600 text-sm">Thank you for reaching out. A member of our team will get back to you within 1-2 business days.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" aria-label="Contact form" onSubmit={handleSubmit} noValidate>
      <fieldset disabled={formState === "submitting"}>
        <legend className="sr-only">Contact information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">First Name *</label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "first-name-error" : undefined}
              className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors ${errors.firstName ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-900"}`}
              placeholder="John"
            />
            {errors.firstName && <p id="first-name-error" className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last-name" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">Last Name *</label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "last-name-error" : undefined}
              className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors ${errors.lastName ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-900"}`}
              placeholder="Smith"
            />
            {errors.lastName && <p id="last-name-error" className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="email" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors ${errors.email ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-900"}`}
            placeholder="john@company.com"
          />
          {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mt-6">
          <label htmlFor="organization" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">Organization</label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
            placeholder="Your organization"
          />
        </div>
      </fieldset>
      <div>
        <label htmlFor="area-of-interest" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">Area of Interest</label>
        <select
          id="area-of-interest"
          name="areaOfInterest"
          disabled={formState === "submitting"}
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-600 text-sm focus:outline-none focus:border-gray-900 transition-colors"
        >
          <option value="">Select an area</option>
          <option>Digital Modernization</option>
          <option>Artificial Intelligence</option>
          <option>Data &amp; Analytics</option>
          <option>Cybersecurity</option>
          <option>Cloud Services</option>
          <option>Energy &amp; Utilities</option>
          <option>Federal Health</option>
          <option>Disaster Management</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs text-gray-600 uppercase tracking-wider mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={formState === "submitting"}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors resize-none ${errors.message ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-900"}`}
          placeholder="Tell us about your project or challenge..."
        />
        {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="btn-shine px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
