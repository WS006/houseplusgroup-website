import InquiryForm from '@/components/InquiryForm';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Fill out the form below and our sales team will get back to you within 24 hours.
        </p>
        <InquiryForm />
      </div>
    </main>
  );
}
