'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, User, X } from 'lucide-react';

type ChatCopy = {
  welcome: string;
  defaultReply: string;
  assistant: string;
  online: string;
  quickQuestions: string;
  placeholder: string;
  openChat: string;
  send: string;
  poweredBy: string;
  suggestions: { question: string; answer: string }[];
};

const chatCopy: Record<string, ChatCopy> = {
  en: {
    welcome: 'Welcome to HousePlus. I can help with product, OEM/ODM, quotation and documentation questions. What would you like to know?',
    defaultReply: 'Thank you for your message. Share your product requirements and destination, and our team will review them. You can also reach HousePlus via WhatsApp +86 155 7811 9543.',
    assistant: 'HousePlus Assistant', online: 'Online now', quickQuestions: 'Quick questions', placeholder: 'Type your question…', openChat: 'Open chat', send: 'Send', poweredBy: 'Powered by HousePlus Global Trade',
    suggestions: [
      { question: 'How is MOQ confirmed?', answer: 'MOQ is confirmed after product selection, specifications, customization scope and order configuration are reviewed.' },
      { question: 'How is the delivery schedule confirmed?', answer: 'Production schedule, shipping method and export documentation are confirmed in your quotation after the product and order requirements are reviewed.' },
      { question: 'Do you support OEM/ODM?', answer: 'Discuss OEM/ODM availability, branding, packaging and product-modification requirements with our team. The available scope is confirmed in your quotation.' },
      { question: 'How do I request product documentation?', answer: 'Certification and compliance documentation vary by product and destination. Request the relevant product documentation before purchase or project approval.' },
    ],
  },
  es: {
    welcome: 'Bienvenido a HousePlus. Puedo ayudarle con preguntas sobre productos, OEM/ODM, cotizaciones y documentación. ¿Qué desea saber?',
    defaultReply: 'Gracias por su mensaje. Comparta los requisitos del producto y el destino, y nuestro equipo los revisará. También puede contactar a HousePlus por WhatsApp +86 155 7811 9543.',
    assistant: 'Asistente de HousePlus', online: 'En línea ahora', quickQuestions: 'Preguntas rápidas', placeholder: 'Escriba su pregunta…', openChat: 'Abrir chat', send: 'Enviar', poweredBy: 'Desarrollado por HousePlus Global Trade',
    suggestions: [
      { question: '¿Cómo se confirma el MOQ?', answer: 'El MOQ se confirma tras revisar la selección del producto, las especificaciones, el alcance de la personalización y la configuración del pedido.' },
      { question: '¿Cómo se confirma el plazo de entrega?', answer: 'El calendario de producción, el método de envío y la documentación de exportación se confirman en su cotización tras revisar los requisitos.' },
      { question: '¿Ofrecen OEM/ODM?', answer: 'Hable con nuestro equipo sobre disponibilidad OEM/ODM, marca, embalaje y modificaciones. El alcance disponible se confirma en su cotización.' },
      { question: '¿Cómo solicito documentación del producto?', answer: 'La documentación de certificación y cumplimiento depende del producto y del destino. Solicite la documentación correspondiente antes de comprar o aprobar un proyecto.' },
    ],
  },
  de: {
    welcome: 'Willkommen bei HousePlus. Ich helfe bei Fragen zu Produkten, OEM/ODM, Angeboten und Dokumentation. Was möchten Sie wissen?',
    defaultReply: 'Vielen Dank für Ihre Nachricht. Teilen Sie uns Produktanforderungen und Zielort mit; unser Team prüft diese gern. Sie erreichen HousePlus auch über WhatsApp +86 155 7811 9543.',
    assistant: 'HousePlus-Assistent', online: 'Jetzt online', quickQuestions: 'Schnelle Fragen', placeholder: 'Frage eingeben…', openChat: 'Chat öffnen', send: 'Senden', poweredBy: 'Bereitgestellt von HousePlus Global Trade',
    suggestions: [
      { question: 'Wie wird die Mindestbestellmenge bestätigt?', answer: 'Die Mindestbestellmenge wird bestätigt, nachdem Produktauswahl, Spezifikationen, Anpassungsumfang und Bestellkonfiguration geprüft wurden.' },
      { question: 'Wie wird der Lieferplan bestätigt?', answer: 'Produktionsplan, Versandart und Exportdokumentation werden nach Prüfung der Produkt- und Bestellanforderungen im Angebot bestätigt.' },
      { question: 'Unterstützen Sie OEM/ODM?', answer: 'Besprechen Sie OEM/ODM-Verfügbarkeit, Branding, Verpackung und Produktanpassungen mit unserem Team. Der verfügbare Umfang wird im Angebot bestätigt.' },
      { question: 'Wie fordere ich Produktdokumentation an?', answer: 'Zertifizierungs- und Konformitätsunterlagen unterscheiden sich je nach Produkt und Zielort. Fordern Sie die passenden Unterlagen vor Kauf oder Projektfreigabe an.' },
    ],
  },
  fr: {
    welcome: 'Bienvenue chez HousePlus. Je peux vous aider pour les produits, l’OEM/ODM, les devis et la documentation. Que souhaitez-vous savoir ?',
    defaultReply: 'Merci pour votre message. Indiquez vos besoins produit et votre destination, et notre équipe les examinera. Vous pouvez aussi joindre HousePlus sur WhatsApp au +86 155 7811 9543.',
    assistant: 'Assistant HousePlus', online: 'En ligne', quickQuestions: 'Questions rapides', placeholder: 'Saisissez votre question…', openChat: 'Ouvrir le chat', send: 'Envoyer', poweredBy: 'Propulsé par HousePlus Global Trade',
    suggestions: [
      { question: 'Comment le MOQ est-il confirmé ?', answer: 'Le MOQ est confirmé après examen du produit, des spécifications, du périmètre de personnalisation et de la configuration de commande.' },
      { question: 'Comment le délai est-il confirmé ?', answer: 'Le calendrier de production, le mode d’expédition et les documents d’exportation sont confirmés dans votre devis après examen des besoins.' },
      { question: 'Proposez-vous l’OEM/ODM ?', answer: 'Discutez avec notre équipe de la disponibilité OEM/ODM, de la marque, de l’emballage et des modifications produit. Le périmètre disponible est confirmé dans votre devis.' },
      { question: 'Comment demander la documentation produit ?', answer: 'Les documents de certification et de conformité varient selon le produit et la destination. Demandez les documents concernés avant un achat ou une approbation de projet.' },
    ],
  },
  ar: {
    welcome: 'مرحبًا بك في HousePlus. يمكنني المساعدة في الأسئلة المتعلقة بالمنتجات وOEM/ODM وعروض الأسعار والوثائق. ما الذي تود معرفته؟',
    defaultReply: 'شكرًا لرسالتك. شارك متطلبات المنتج والوجهة وسيراجعها فريقنا. يمكنك أيضًا التواصل مع HousePlus عبر واتساب على +86 155 7811 9543.',
    assistant: 'مساعد HousePlus', online: 'متصل الآن', quickQuestions: 'أسئلة سريعة', placeholder: 'اكتب سؤالك…', openChat: 'فتح الدردشة', send: 'إرسال', poweredBy: 'بدعم من HousePlus Global Trade',
    suggestions: [
      { question: 'كيف يتم تأكيد الحد الأدنى للطلب؟', answer: 'يتم تأكيد الحد الأدنى للطلب بعد مراجعة اختيار المنتج والمواصفات ونطاق التخصيص وتكوين الطلب.' },
      { question: 'كيف يتم تأكيد جدول التسليم؟', answer: 'يتم تأكيد جدول الإنتاج وطريقة الشحن ووثائق التصدير في عرض السعر بعد مراجعة متطلبات المنتج والطلب.' },
      { question: 'هل تدعمون OEM/ODM؟', answer: 'ناقش توفر OEM/ODM والعلامة التجارية والتعبئة وتعديلات المنتج مع فريقنا. يتم تأكيد النطاق المتاح في عرض السعر.' },
      { question: 'كيف أطلب وثائق المنتج؟', answer: 'تختلف وثائق الشهادات والامتثال حسب المنتج والوجهة. اطلب الوثائق ذات الصلة قبل الشراء أو اعتماد المشروع.' },
    ],
  },
};

interface Message { id: number; text: string; sender: 'user' | 'bot'; time: string; }

export default function ChatBot({ lang = 'en' }: { lang?: string }) {
  const ui = chatCopy[lang] || chatCopy.en;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [{ id: 1, text: ui.welcome, sender: 'bot', time: getCurrentTime() }]);
  const [inputValue, setInputValue] = useState('');
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMessages([{ id: 1, text: ui.welcome, sender: 'bot', time: getCurrentTime() }]), [lang, ui.welcome]);
  useEffect(() => { const timer = setTimeout(() => setShowPulse(false), 8000); return () => clearTimeout(timer); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function handleSuggestionClick(suggestion: string) {
    setMessages((previous) => [...previous, { id: Date.now(), text: suggestion, sender: 'user', time: getCurrentTime() }]);
    setTimeout(() => {
      const reply = ui.suggestions.find((item) => item.question === suggestion)?.answer || ui.defaultReply;
      setMessages((previous) => [...previous, { id: Date.now() + 1, text: reply, sender: 'bot', time: getCurrentTime() }]);
    }, 600);
  }

  function handleSend() { if (inputValue.trim()) { handleSuggestionClick(inputValue); setInputValue(''); } }

  return <>
    <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-2 right-2 z-[100] h-11 w-11 md:bottom-6 md:right-6 md:h-14 md:w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-800' : 'bg-blue-600 hover:bg-blue-700'} ${showPulse && !isOpen ? 'animate-bounce' : ''}`} aria-label={ui.openChat}>
      {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={21} className="text-white" />}
    </button>
    {isOpen && <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="fixed bottom-16 left-2 right-2 z-[100] w-auto md:bottom-24 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
      <div className="bg-blue-600 px-5 py-4 flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot size={20} className="text-white" /></div><div><p className="text-white font-bold text-sm">{ui.assistant}</p><p className="text-blue-100 text-xs flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full inline-block" />{ui.online}</p></div></div>
      <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((message) => <div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}><div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-blue-100' : 'bg-blue-600'}`}>{message.sender === 'user' ? <User size={14} className="text-blue-600" /> : <Bot size={14} className="text-white" />}</div><div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'}`}>{message.text}</div></div>)}
        <div ref={messagesEndRef} />
        {messages.length === 1 && <div className="pt-2 space-y-2"><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{ui.quickQuestions}</p><div className="flex flex-wrap gap-2">{ui.suggestions.map((item) => <button key={item.question} onClick={() => handleSuggestionClick(item.question)} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors">{item.question}</button>)}</div></div>}
      </div>
      <div className="p-3 bg-white border-t border-slate-100"><div className="flex gap-2"><input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSend()} placeholder={ui.placeholder} className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-700 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-blue-400 transition-colors" /><button onClick={handleSend} className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors" aria-label={ui.send}><Send size={16} className="text-white" /></button></div><p className="text-center text-[10px] text-slate-400 mt-2">{ui.poweredBy}</p></div>
    </div>}
  </>;
}

function getCurrentTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
