import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Zap, Shield, Headphones, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

const FeatureBlurb = ({ icon, title, desc, c, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center gap-4 group cursor-default"
  >
    <div style={{ backgroundColor: c.bgLight, color: c.accent }} className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
      {icon}
    </div>
    <div className="flex flex-col">
      <h4 style={{ color: c.text }} className="font-bold text-base transition-colors duration-800">{title}</h4>
      <p className="text-gray-500 text-xs font-medium">{desc}</p>
    </div>
  </motion.div>
);

const PricingCard = ({ 
  plan, 
  title, 
  desc, 
  price, 
  priceSub, 
  features, 
  buttonText, 
  isPopular,
  c,
  delay
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay }}
      style={{ borderColor: isPopular ? c.accent : 'rgba(0,0,0,0.05)' }}
      className={`relative w-full h-full flex flex-col bg-white rounded-3xl p-6 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${isPopular ? 'border-2 z-10' : 'border z-0'}`}
    >
      {isPopular && (
        <div style={{ backgroundColor: c.accent }} className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5 transition-colors duration-800">
          <Award className="w-3 h-3" />
          Most Popular
        </div>
      )}
      
      <div className="flex flex-col mb-6">
        <span style={{ color: c.accent }} className="font-bold text-[10px] uppercase tracking-widest mb-2 transition-colors duration-800">{plan}</span>
        <h3 style={{ color: c.text }} className="text-3xl font-black tracking-tight mb-2 transition-colors duration-800">{title}<span style={{ color: c.accent }} className="transition-colors duration-800">.</span></h3>
        <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[95%]">{desc}</p>
      </div>

      <div className="flex flex-col mb-8">
        <span style={{ color: c.accent }} className="font-bold text-[10px] uppercase tracking-widest mb-3 transition-colors duration-800">Includes</span>
        <ul className="flex flex-col gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle2 style={{ color: c.accent }} className="w-4 h-4 flex-shrink-0 transition-colors duration-800" />
              <span className="text-gray-700 font-medium text-xs">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-col">
        <h4 style={{ color: c.text }} className="text-4xl font-black tracking-tighter mb-1 transition-colors duration-800">{price}</h4>
        <p className="text-gray-500 text-[10px] font-semibold mb-2">{priceSub}</p>
        
        {/* Payment Plan Area */}
        <div className="flex flex-col items-center mt-2 mb-6 relative">
          <div className="w-full h-px bg-gray-100 absolute top-2 left-0 z-0"></div>
          <span className="bg-white px-2 text-[8px] font-bold text-gray-400 tracking-widest uppercase mb-3 z-10">Payment Plan</span>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center flex-1">
              <span style={{ color: c.text }} className="font-bold text-[13px] mb-0.5">40%</span>
              <span className="text-[8px] text-gray-400 font-semibold text-center leading-tight">Advance</span>
            </div>
            <div className="w-px h-6 bg-gray-100 self-center"></div>
            <div className="flex flex-col items-center flex-1">
              <span style={{ color: c.text }} className="font-bold text-[13px] mb-0.5">30%</span>
              <span className="text-[8px] text-gray-400 font-semibold text-center leading-tight">Design<br/>Approved</span>
            </div>
            <div className="w-px h-6 bg-gray-100 self-center"></div>
            <div className="flex flex-col items-center flex-1">
              <span style={{ color: c.text }} className="font-bold text-[13px] mb-0.5">30%</span>
              <span className="text-[8px] text-gray-400 font-semibold text-center leading-tight">After Project<br/>Completion</span>
            </div>
          </div>
        </div>
        
        <button 
          style={{ 
            backgroundColor: isPopular ? c.accent : 'transparent',
            borderColor: isPopular ? 'transparent' : 'rgba(0,0,0,0.1)',
            color: isPopular ? '#fff' : c.text
          }}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm border ${isPopular ? 'shadow-lg hover:brightness-110' : 'hover:border-black'}`}
        >
          {buttonText} <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Pricing = ({ theme }) => {
  const colors = {
    purple: { text: '#2E1065', accent: '#7C3AED', border: 'rgba(46,16,101,0.2)', bgLight: '#f3e8ff' },
    chocolate: { text: '#27140c', accent: '#f59e0b', border: 'rgba(39,20,12,0.2)', bgLight: '#fef3c7' },
    violet: { text: '#3b0764', accent: '#9333ea', border: 'rgba(59,7,100,0.15)', bgLight: '#f3e8ff' },
    teal: { text: '#115e59', accent: '#0d9488', border: 'rgba(17,94,89,0.15)', bgLight: '#ccfbf1' }
  };
  const c = colors[theme] || colors.teal;

  return (
    <section id="pricing" className="w-full h-screen min-h-[800px] flex items-center justify-center bg-transparent transition-colors duration-800 px-6 md:px-12 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-6">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="flex flex-col"
           >
            
             <h2 style={{ color: c.text }} className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] transition-colors duration-800">
               Transparent<br/><span style={{ color: c.accent }} className="transition-colors duration-800">Pricing.</span>
             </h2>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-col items-start md:items-end text-left md:text-right gap-6"
           >
             <p className="text-gray-600 text-base font-medium max-w-sm leading-relaxed">
               No hidden fees. No surprises. Choose the plan that fits your goals and let's build something amazing.
             </p>
             <button style={{ color: c.text }} className="flex items-center gap-3 bg-transparent rounded-full font-bold transition-colors duration-800 group text-sm">
               <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-500 transition-all">
                 <ArrowDownRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
               </div>
               Let's build your project
             </button>
           </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
          
          {/* Features Column (Left) */}
          <div className="xl:col-span-3 flex flex-col justify-between gap-8 py-2 relative">
            {/* Choose Your Plan Rotated Text */}
            <div className="hidden xl:block absolute left-[-40px] top-[40%] -rotate-90 origin-center opacity-30 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
             
            </div>

            <div className="flex flex-col gap-6">
               <FeatureBlurb c={c} delay={0.2} icon={<Zap className="w-5 h-5" />} title="Fast Delivery" desc="On-time, every time." />
               <FeatureBlurb c={c} delay={0.3} icon={<Shield className="w-5 h-5" />} title="Fixed Pricing" desc="No hidden charges." />
               <FeatureBlurb c={c} delay={0.4} icon={<Headphones className="w-5 h-5" />} title="Ongoing Support" desc="We've got your back." />
            </div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: 0.5 }}
               className="bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-row items-center gap-4 mt-auto border border-gray-50"
            >
               <div style={{ backgroundColor: c.accent }} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md transition-colors duration-800">
                 <Award className="w-4 h-4" />
               </div>
               <p className="text-xs font-bold text-gray-800 leading-tight">All plans come with 7 days of post-launch support.</p>
            </motion.div>
          </div>

          {/* Pricing Cards (Right) */}
          <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
            <PricingCard 
              c={c}
              delay={0.2}
              plan="Basic"
              title="Startup"
              desc="Perfect for startups & small businesses to get online."
              price="₹6,499"
              priceSub="Project Based Pricing"
              buttonText="Get Started"
              features={[
                "5 Pages Website",
                "Responsive Design",
                "Contact Form",
                "Basic SEO Setup",
                "Social Media Integration",
                "1 Round of Revisions",
                "Delivery in 7-10 Days"
              ]}
            />
            <PricingCard 
              c={c}
              delay={0.4}
              plan="Professional"
              title="Growth"
              desc="Perfect for growing businesses that need more power."
              price="₹9,999"
              priceSub="Project Based Pricing"
              buttonText="Get Started"
              isPopular={true}
              features={[
                "8-10 Pages Website",
                "Custom UI/UX Design",
                "Advanced SEO Setup",
                "WhatsApp Chat Integration",
                "Google Maps Integration",
                "2 Rounds of Revisions",
                "Delivery in 10-15 Days"
              ]}
            />
            <PricingCard 
              c={c}
              delay={0.6}
              plan="Premium"
              title="Enterprise"
              desc="Perfect for brands & enterprises that need custom solutions."
              price="₹14,999"
              priceSub="Project Based Pricing"
              buttonText="Contact Us"
              features={[
                "15+ Pages Website",
                "Custom UI/UX Design",
                "E-Commerce / Booking",
                "Advanced SEO + Speed Opt.",
                "WhatsApp + Live Chat",
                "Google Analytics Setup",
                "3 Rounds of Revisions",
                "Delivery in 15-20 Days"
              ]}
            />
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Pricing;
