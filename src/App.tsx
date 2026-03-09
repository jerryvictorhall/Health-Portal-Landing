/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Plus, Wifi, X, CheckCircle2, Microscope, Brain, LayoutDashboard, Mail } from 'lucide-react';

const Logo = ({ className = "", dark = false }: { className?: string; dark?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className={`${dark ? 'bg-slate-900/10 border-slate-900/20' : 'bg-white/10 border-white/20'} p-2 rounded-xl backdrop-blur-sm border flex flex-col items-center gap-1`}>
      <Wifi className="w-5 h-5 text-teal-400" />
      <div className="relative">
        <Home className={`w-6 h-6 ${dark ? 'text-slate-900' : 'text-white'}`} />
        <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-teal-400 font-bold" />
      </div>
    </div>
    <span className={`font-bold text-2xl tracking-tight ${dark ? 'text-slate-900' : 'text-white'}`}>
      Health <span className="text-teal-400">Portal</span>
    </span>
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    investorType: 'Individual Investor'
  });

  // IMPORTANT: Update this URL with your new SheetDB API ID for the new Google Sheet
  // Create a new API at https://sheetdb.io using your new Google Sheet URL:
  // https://docs.google.com/spreadsheets/d/1k21gwbdvLg3oLKMyuDrML88ZRaBGPlAgRD50KXGGGo0/edit
  const API_URL = 'https://sheetdb.io/api/v1/yxvngakilvj0b';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const payload = {
      data: [{
        name: formData.name,
        email: formData.email,
        investor_type: formData.investorType,
        timestamp: new Date().toLocaleString()
      }]
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      alert("Submission failed. Contact jerry@computeportal.io");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center">
        <Logo dark={true} />
        <div className="hidden md:flex items-center gap-6">
          <a href="mailto:jerry@computeportal.io" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
            <Mail className="w-4 h-4" />
            jerry@computeportal.io
          </a>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-semibold border border-slate-200 px-6 py-2.5 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#0f172a] text-white py-24 px-6">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              The Future of Health is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Proactive.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Transforming Point of Care Diagnostics through real-time blood data and AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-5 px-12 rounded-full text-lg shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              >
                Apply for Investors Beta
              </button>
              <a 
                href="/2025%2002%20FAA%20VIG%20Shared%20Screens%20Slideshow.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-slate-300 hover:text-white font-semibold py-5 px-12 rounded-full border border-white/10 hover:bg-white/5 transition-all"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Investment Section */}
      <section id="investment" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="bg-slate-900 p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent" />
            <h2 className="text-3xl md:text-4xl font-bold relative z-10">The Investors 10 Investment</h2>
            <p className="text-teal-400 mt-3 font-semibold tracking-wide uppercase text-sm relative z-10">Limited to 10 Strategic Partners</p>
          </div>
          
          <div className="p-8 md:p-16 grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                You Receive:
              </h3>
              <ul className="space-y-8">
                {[
                  { icon: Microscope, title: "CBC Diagnostic Device", desc: "Minute-by-minute blood panels for instant data." },
                  { icon: Brain, title: "AI Analytics Machine", desc: "Actionable health insights powered by custom LLMs." },
                  { icon: LayoutDashboard, title: "Health Portal Dashboard", desc: "Native wearable sync and comprehensive health tracking." },
                  { icon: Plus, title: "50,000 Share SAFE Note", desc: "Early equity in the future of proactive health.", highlight: true }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-5 group">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${item.highlight ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${item.highlight ? 'text-amber-700' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sticky top-8">
              <div className="text-center p-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-1 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
                  Total Investment
                </div>
                <div className="text-7xl font-black text-slate-900 my-6 tracking-tighter">$25,000</div>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">Secure your position in the Investors 10 cohort and lead the health revolution.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  Secure Your Slot
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo dark={true} className="opacity-50 grayscale" />
          <p className="text-slate-400 text-sm">© 2026 Health Portal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:jerry@computeportal.io" className="text-slate-400 hover:text-teal-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] max-w-md w-full p-10 relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {formStatus !== 'success' ? (
                <div>
                  <h3 className="text-3xl font-bold mb-2">Investor Application</h3>
                  <p className="text-slate-500 mb-8">Join the inner circle of strategic partners.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Investor Type</label>
                      <select 
                        value={formData.investorType}
                        onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all appearance-none"
                      >
                        <option>Individual Investor</option>
                        <option>Venture Fund</option>
                        <option>Family Office</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-teal-500 text-slate-900 font-bold py-5 rounded-2xl shadow-lg hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : 'Submit Application'}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Application Sent</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Thank you for your interest. Jerry will contact you at <strong>{formData.email}</strong> to discuss the SAFE Note and next steps.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
