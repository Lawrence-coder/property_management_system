import { motion } from "framer-motion";
import { 
  Info, 
  CalendarClock, 
  CreditCard, 
  Wrench, 
  FileText,
  CheckCircle2
} from "lucide-react";
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-200 p-6 lg:p-10 overflow-y-auto">
      {/* 1. Company Identity & Hero */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[350px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-700"
      >
        <img src={apartmentImg} alt="Manson Street" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 max-w-2xl">
          <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold tracking-widest uppercase text-xs">
            <Info size={16} /> About Our Management
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Excellence in Urban Living.
          </h1>
          <p className="text-lg text-slate-300">
            We manage your home so you can focus on your life. From 24/7 maintenance to 
            seamless digital payments, our goal is to provide a stress-free living experience 
            at Alliance Limited.
          </p>
        </div>
      </motion.div>

      {/* 2. Critical Info: Rent Schedule */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-green-600 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-indigo-500/20"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 bg-white/20 rounded-xl">
            <CalendarClock className="text-white w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rent Schedule Reminder</h2>
            <p className="text-indigo-100">Payments are due on the <span className="font-bold underline">5th of every month</span>.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-indigo-700 px-4 py-2 rounded-full border border-indigo-400/30">
          <CheckCircle2 size={16} /> 5-Day Grace Period Included
        </div>
      </motion.div>

      {/* 3. What the Portal Helps You Do (Animated Cards) */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Features</h3>
        <p className="text-slate-400 mb-8">Everything you need to manage your residency in one click.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <FeatureCard 
          icon={<CreditCard className="text-emerald-400" />}
          title="Instant Rent Payment"
          desc="Securely pay your rent via Mpesa, credit card or bank transfer without leaving your couch and send the receipt via the rent payment form."
          tag="Rent Payment"
        />
        <FeatureCard 
          icon={<Wrench className="text-orange-400" />}
          title="Maintenance Requests"
          desc="Leaking tap? Broken light? Log a ticket instantly and track the repair progress."
          tag="Support"
        />
        <FeatureCard 
          icon={<FileText className="text-blue-400" />}
          title="Digital Forms"
          desc="Access your lease, vacating forms, and community rules anytime, anywhere."
          tag="Vacating Form"
        />
      </motion.div>
    </div>
  );
};

// Sub-component for clean code
const FeatureCard = ({ icon, title, desc, tag }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.5)' }}
    className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-all cursor-default group"
  >
    <div className="mb-6 p-4 bg-slate-900 w-fit rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-1 rounded mb-4 inline-block">
      {tag}
    </span>
    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default HomePage;