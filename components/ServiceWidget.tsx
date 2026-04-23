'use client';
import { useState } from 'react';
import { MessageCircle, Mail, Phone, X, ChevronRight } from 'lucide-react';

interface ServiceWidgetProps {
  whatsapp?: string;
  wechat?: string;
  email?: string;
  phone?: string;
}

export default function ServiceWidget({ 
  whatsapp = '+8615578119543', 
  wechat = 'JackHousePlus', 
  email = 'jack@houseplus-ch.com', 
  phone = '+2349078080738' 
}: ServiceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition-all flex flex-col items-center gap-1"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="text-[10px] font-bold uppercase tracking-wider [writing-mode:vertical-lr]">Service</span>
      </button>

      {/* Pop-up Window */}
      <div className={`bg-white shadow-2xl rounded-l-xl border border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online Support
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
                <p className="text-xs text-gray-500">WeChat ID</p>
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
                <p className="text-xs text-gray-500">Email Us</p>
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
                <p className="text-xs text-gray-500">Call Us</p>
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
