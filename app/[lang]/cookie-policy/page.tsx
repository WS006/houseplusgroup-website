import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'Cookie Policy - HousePlus',
    es: 'Política de Cookies - HousePlus',
    de: 'Cookie-Richtlinie - HousePlus',
    fr: 'Politique de Cookies - HousePlus',
    ar: 'سياسة ملفات تعريف الارتباط - HousePlus',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'HousePlus Cookie Policy — Learn how we use cookies and tracking technologies on houseplus-ch.com to improve your browsing experience.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'GDPR cookies', 'HousePlus cookies'],
    url: `/${lang}/cookie-policy`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const h1Labels: Record<string, string> = {
    en: 'Cookie Policy',
    es: 'Política de Cookies',
    de: 'Cookie-Richtlinie',
    fr: 'Politique de Cookies',
    ar: 'سياسة ملفات تعريف الارتباط',
  };

  const sections = [
    {
      title: '1. What Are Cookies?',
      content: 'Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better browsing experience, and give website owners statistical information about their visitors. Cookies do not contain any personally identifiable information by themselves.',
    },
    {
      title: '2. How HousePlus Uses Cookies',
      content: `HousePlus uses cookies on our website (houseplus-ch.com) for the following purposes:

**Essential Cookies:** These cookies are strictly necessary for the website to function. They enable core features such as security, page navigation, and access to secure areas. Without these cookies, our website cannot function properly.

**Analytics Cookies:** We use analytics tools (such as Google Analytics) to understand how visitors interact with our website — which pages are visited most, how long users stay, and what content is most popular. This helps us improve our website and services. The data collected is aggregated and anonymous.

**Preference Cookies:** These cookies remember your settings and preferences to personalise your experience — such as your preferred language, region, or display settings.

**Marketing Cookies:** We may use marketing cookies to track visitors across websites and display relevant advertising. These cookies are used to measure the effectiveness of our marketing campaigns. We only use reputable third-party providers for marketing cookies.`,
    },
    {
      title: '3. Third-Party Cookies',
      content: `Our website may contain content from third-party services that set their own cookies. These include:

- **Google Analytics**: For website traffic analysis and user behaviour insights
- **Cloudflare**: For website security, performance optimisation, and DDoS protection
- **Storyblok**: Our content management system may set functional cookies for content delivery

We do not control these third-party cookies. Please refer to the respective privacy policies of these providers for more information on how they use cookies.`,
    },
    {
      title: '4. Managing and Disabling Cookies',
      content: `You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. You can manage cookies through:

**Browser Settings:** You can typically find cookie settings in the "Settings", "Privacy", or "Security" section of your browser. Here you can:
- View all cookies stored on your device
- Delete individual or all cookies
- Block cookies from specific websites
- Block all cookies (note: this may affect website functionality)

**Opt-Out Tools:** For Google Analytics, you can install the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.

Please note that disabling certain cookies may impact the functionality of our website. Essential cookies cannot be disabled as they are required for basic website operation.`,
    },
    {
      title: '5. Cookie Retention Periods',
      content: `Different cookies have different retention periods:

- **Session cookies**: Deleted when you close your browser
- **Analytics cookies**: Typically retained for 13–24 months
- **Preference cookies**: Retained for up to 12 months
- **Marketing cookies**: Typically retained for 30–90 days

You can delete cookies at any time through your browser settings.`,
    },
    {
      title: '6. Updates to This Cookie Policy',
      content: 'We may update this Cookie Policy periodically to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies. The date at the top of this Cookie Policy indicates when it was last updated.',
    },
    {
      title: '7. Contact Us',
      content: `If you have questions about our use of cookies, please contact us:

**HousePlus Group**
Email: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM (GMT+8)`,
    },
  ];

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate-600 leading-relaxed mb-2">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-800">{part}</strong> : part)}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-slate-600 ml-4 list-disc mb-1">{line.substring(2)}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-slate-600 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            HousePlus Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            {h1Labels[lang] || h1Labels.en}
          </h1>
          <p className="text-gray-500 text-sm mb-4">Last Updated: January 15, 2025</p>
          <p className="text-lg text-slate-600 leading-relaxed">
            This Cookie Policy explains how HousePlus Group uses cookies and similar tracking technologies when you visit our website houseplus-ch.com.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-10 pb-10 border-b border-gray-200 last:border-0">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">{section.title}</h2>
              <div className="prose max-w-none">
                {renderContent(section.content)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links to other policies */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Related Policies</h2>
          <p className="text-slate-600 mb-6">For more information about how HousePlus handles your data, please review our related policies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${lang}/privacy`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Privacy Policy
            </a>
            <a
              href={`/${lang}/terms`}
              className="inline-block px-8 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
