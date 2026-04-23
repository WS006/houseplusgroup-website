'use client';

import { useState } from 'react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    product: '',
    quantity: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Submission failed');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        whatsapp: '',
        product: '',
        quantity: '',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Inquiry</h2>
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Thank you! We will reply within 24 hours.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {errorMsg || 'Something went wrong. Please try again later.'}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">WhatsApp (optional)</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Product of Interest</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g., Solar panel 500W"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 100 pcs"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Message *</label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
        >
          {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}
