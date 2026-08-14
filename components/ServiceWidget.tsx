'use client';
import { useState } from 'react';
import { MessageCircle, Mail, Phone, X, ChevronRight } from 'lucide-react';

interface ServiceWidgetProps {
  lang?: string;
  whatsapp?: string;
  wechat?: string;
  email?: string;
  phone?: string;
}

export default function ServiceWidget({ 
  lang = 'en',
  whatsapp = '+8615578119543', 
  wechat = 'JackHousePlus', 
  email = 'jack@houseplus-ch.com', 
  phone = '+8615578119543'
}: ServiceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy: Record<string, Record<string, string>> = {
    en: { service: 'Service', support: 'Online Support', wechat: 'WeChat ID', email: 'Email Us', call: 'Call Us' },
    es: { service: 'Servicio', support: 'Soporte en línea', wechat: 'ID de WeChat', email: 'Escríbanos', call: 'Llámenos' },
    de: { service: 'Kundenservice', support: 'Online-Support', wechat: 'WeChat-ID', email: 'E-Mail senden', call: 'Anrufen' },
    fr: { service: 'Assistance', support: 'Assistance en ligne', wechat: 'Identifiant WeChat', email: 'Nous écrire', call: 'Nous appeler' },
    ar: { service: 'الخدمة', support: 'الدعم عبر الإنترنت', wechat: 'معرّف WeChat', email: 'راسلنا', call: 'اتصل بنا' },
  };
  const ui = copy[lang] || copy.en;

  return (
    <div className="fixed bottom-20 right-0 z-[100] flex items-end md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:items-center">
      {/* Toggle Button */}
      <button
        aria-label={ui.service}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-2.5 md:p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition-all flex flex-col items-center gap-1"
      >
        {isOpen ? <X size={20} /> : <Mail size={20} />}
        <span className="text-[10px] font-bold uppercase tracking-wider [writing-mode:vertical-lr]">{ui.service}</span>
      </button>

      {/* Pop-up Window */}
      <div className={`bg-white shadow-2xl rounded-l-xl border border-gray-100 transition-all duration-300 overflow-hidden max-h-[70vh] ${isOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
        <div className="overflow-y-auto max-h-[70vh] p-5 md:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {ui.support}
          </h3>
          
          <div className="space-y-4">
            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${whatsapp.replace('+', '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
            >
              <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">WhatsApp</p>
                <p className="text-sm font-semibold text-gray-700">{whatsapp}</p>
              </div>
              <ChevronRight size={14} className="ml-auto text-gray-300" />
            </a>

            {/* WeChat */}
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{ui.wechat}</p>
                <p className="text-sm font-semibold text-gray-700">{wechat}</p>
              </div>
            </div>

            {/* Email */}
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="bg-red-100 p-2 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{ui.email}</p>
                <p className="text-sm font-semibold text-gray-700 truncate w-40">{email}</p>
              </div>
              <ChevronRight size={14} className="ml-auto text-gray-300" />
            </a>

            {/* Phone */}
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="bg-gray-100 p-2 rounded-full text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{ui.call}</p>
                <p className="text-sm font-semibold text-gray-700">{phone}</p>
              </div>
              <ChevronRight size={14} className="ml-auto text-gray-300" />
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">HousePlus Global Trade</p>
          </div>
        </div>
      </div>
    </div>
  );
}
