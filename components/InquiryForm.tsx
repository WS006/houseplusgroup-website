'use client';

import { useState } from 'react';

interface InquiryFormProps {
  lang: string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'HousePlus Inquiry',
    name: 'Full Name *',
    email: 'Business Email *',
    company: 'Company Name',
    whatsapp: 'WhatsApp (Optional)',
    product: 'HousePlus Product of Interest',
    quantity: 'Estimated Quantity',
    message: 'Message *',
    submit: 'Send HousePlus Inquiry',
    sending: 'Sending...',
    success: 'Thank you! HousePlus team will reply within 24 hours.',
    error: 'Submission failed. Please try again later.',
    placeholder_product: 'e.g., HousePlus Solar Panel 500W',
    placeholder_quantity: 'e.g., 500 pcs',
  },
};

export default function InquiryForm({ lang = 'en' }: InquiryFormProps) {
  const t = translations[lang] || translations.en;

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

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      setFormData({ name: '', email: '', company: '', whatsapp: '', product: '', quantity: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-black mb-8 text-slate-900">{t.title}</h2>
      {status === 'success' && (
        <div className="mb-8 p-6 bg-green-50 text-green-700 rounded-2xl border border-green-100 font-bold">
          {t.success}
        </div>
      )}
      {status === 'error' && (
        <div className="mb-8 p-6 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold">
          {errorMsg || t.error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.name}</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.email}</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.company}</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.whatsapp}</label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.product}</label>
            <input type="text" name="product" value={formData.product} onChange={handleChange} placeholder={t.placeholder_product} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.quantity}</label>
            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder={t.placeholder_quantity} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{t.message}</label>
          <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all"></textarea>
        </div>
        <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 text-white py-5 rounded-2xl hover:bg-blue-700 disabled:bg-slate-400 font-black text-xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1">
          {status === 'loading' ? t.sending : t.submit}
        </button>
      </form>
    </div>
  );
}
