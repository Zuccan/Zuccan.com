import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';

const Contact = ({ theme }) => {
  const colors = {
    purple: { text: '#2E1065', accent: '#7C3AED', border: 'rgba(46,16,101,0.2)', bgLight: '#f3e8ff' },
    chocolate: { text: '#27140c', accent: '#f59e0b', border: 'rgba(39,20,12,0.2)', bgLight: '#fef3c7' },
    violet: { text: '#3b0764', accent: '#9333ea', border: 'rgba(59,7,100,0.15)', bgLight: '#f3e8ff' },
    teal: { text: '#115e59', accent: '#0d9488', border: 'rgba(17,94,89,0.15)', bgLight: '#ccfbf1' },
    midnight: { text: '#f8fafc', accent: '#3b82f6', border: 'rgba(248,250,252,0.2)', bgLight: '#0f172a' }
  };
  const c = colors[theme] || colors.midnight;

  const [formData, setFormData] = useState({ name: '', company: '', project: '', budget: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const Input = ({ name, placeholder, type = "text", width = "w-32" }) => (
    <input 
      type={type}
      placeholder={placeholder}
      value={formData[name] || ''}
      onChange={(e) => setFormData({...formData, [name]: e.target.value})}
      className={`bg-transparent border-b-2 border-dashed outline-none focus:border-solid px-2 py-1 text-center font-bold transition-all duration-300 ${width}`}
      style={{ borderColor: c.border, color: c.accent }}
      required
    />
  );

  return (
    <section id="contact" className="w-full min-h-screen py-24 md:py-32 flex flex-col items-center justify-between bg-transparent transition-colors duration-800 px-6 md:px-12 relative overflow-hidden z-10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-16 relative z-10 flex-1 justify-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-6"
        >
          <span style={{ color: c.accent }} className="font-bold text-xs uppercase tracking-[0.2em]">Contact Us</span>
          <h2 style={{ color: c.text }} className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            Let's build something<br/>
            <span style={{ color: c.accent }} className="italic font-serif font-light">amazing.</span>
          </h2>
        </motion.div>

        {/* Conversational Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 gap-6 text-center">
              <div style={{ backgroundColor: c.accent }} className="w-24 h-24 rounded-full flex items-center justify-center text-white mb-4 shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 style={{ color: c.text }} className="text-4xl md:text-5xl font-black tracking-tighter">Message sent!</h3>
              <p className="text-xl md:text-2xl font-medium" style={{ color: c.border }}>We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-16 items-center w-full">
              <div style={{ color: c.text }} className="text-2xl md:text-4xl lg:text-[42px] leading-[2] md:leading-[2] text-center font-medium w-full">
                Hi Zuccan, my name is <Input name="name" placeholder="Your Name" width="w-32 md:w-56" /> and I represent <Input name="company" placeholder="Company" width="w-32 md:w-56" />. 
                I'm looking to build a <Input name="project" placeholder="Website / App" width="w-40 md:w-64" /> project. 
                My budget is around <Input name="budget" placeholder="₹50k - ₹1L" width="w-32 md:w-56" />. 
                You can reach me at <Input name="email" type="email" placeholder="Email Address" width="w-48 md:w-80" />. Let's make it happen!
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center mt-4">
                <button 
                  type="submit"
                  style={{ backgroundColor: c.text, color: c.bgLight }}
                  className="px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform text-base md:text-lg shadow-xl"
                >
                  Send Inquiry <Send className="w-5 h-5" />
                </button>
                <span style={{ color: c.border }} className="font-black text-sm uppercase tracking-widest px-4">OR</span>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform text-base md:text-lg bg-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.4)]"
                >
                  Chat on WhatsApp <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer Minimal */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[1400px] mx-auto mt-24 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        style={{ borderColor: c.border, color: c.border }}
      >
        <div className="font-bold text-xs md:text-sm uppercase tracking-widest" style={{ color: c.text, opacity: 0.5 }}>
          © {new Date().getFullYear()} Zuccan. All rights reserved.
        </div>
        <div className="flex items-center gap-8 text-xs md:text-sm font-bold uppercase tracking-widest" style={{ color: c.text }}>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: c.accent }}>Instagram</a>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: c.accent }}>Twitter</a>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: c.accent }}>LinkedIn</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
