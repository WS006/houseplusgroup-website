'use client';

import { useState } from 'react';

interface InquiryFormProps {
  lang: string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Send Inquiry',
    name: 'Name *',
    email: 'Email *',
    company: 'Company',
    whatsapp: 'WhatsApp (optional)',
    product: 'Product of Interest',
    quantity: 'Quantity',
    message: 'Message *',
    submit: 'Send Inquiry',
    sending: 'Sending...',
    success: 'Thank you! We will reply within 24 hours.',
    error: 'Something went wrong. Please try again later.',
    placeholder_product: 'e.g., Solar panel 500W',
    placeholder_quantity: 'e.g., 100 pcs',
  },
  es: {
    title: 'Enviar Consulta',
    name: 'Nombre *',
    email: 'Correo *',
    company: 'Empresa',
    whatsapp: 'WhatsApp (opcional)',
    product: 'Producto de interés',
    quantity: 'Cantidad',
    message: 'Mensaje *',
    submit: 'Enviar Consulta',
    sending: 'Enviando...',
    success: '¡Gracias! Te responderemos en 24 horas.',
    error: 'Algo salió mal. Por favor intenta de nuevo.',
    placeholder_product: 'Ej: Panel solar 500W',
    placeholder_quantity: 'Ej: 100 unidades',
  },
  de: {
    title: 'Anfrage senden',
    name: 'Name *',
    email: 'E-Mail *',
    company: 'Firma',
    whatsapp: 'WhatsApp (optional)',
    product: 'Produkt von Interesse',
    quantity: 'Menge',
    message: 'Nachricht *',
    submit: 'Anfrage senden',
    sending: 'Senden...',
    success: 'Danke! Wir werden innerhalb von 24 Stunden antworten.',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.',
    placeholder_product: 'z.B. Solarpanel 500W',
    placeholder_quantity: 'z.B. 100 Stück',
  },
  fr: {
    title: 'Envoyer une demande',
    name: 'Nom *',
    email: 'E-mail *',
    company: 'Entreprise',
    whatsapp: 'WhatsApp (optionnel)',
    product: 'Produit d\'intérêt',
    quantity: 'Quantité',
    message: 'Message *',
    submit: 'Envoyer la demande',
    sending: 'Envoi...',
    success: 'Merci ! Nous vous répondrons dans les 24 heures.',
    error: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    placeholder_product: 'Ex: Panneau solaire 500W',
    placeholder_quantity: 'Ex: 100 pièces',
  },
  ar: {
    title: 'إرسال استفسار',
    name: 'الاسم *',
    email: 'البريد الإلكتروني *',
    company: 'الشركة',
    whatsapp: 'واتساب (اختياري)',
    product: 'المنتج المهتم به',
    quantity: 'الكمية',
    message: 'الرسالة *',
    submit: 'إرسال الاستفسار',
    sending: 'جاري الإرسال...',
    success: 'شكراً! سوف نقوم بالرد خلال 24 ساعة.',
    error: 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
    placeholder_product: 'مثال: لوح شمسي 500 واط',
    placeholder_quantity: 'مثال: 100 قطعة',
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
      <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.title}</h2>
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {t.success}
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMsg || t.error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.name}</label>
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
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.email}</label>
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
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.company}</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.whatsapp}</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.product}</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder={t.placeholder_product}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.quantity}</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={t.placeholder_quantity}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">{t.message}</label>
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
          {status === 'loading' ? t.sending : t.submit}
        </button>
      </form>
    </div>
  );
}
