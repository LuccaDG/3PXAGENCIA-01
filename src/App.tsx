import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  MessageSquare, 
  Globe, 
  Award,
  ChevronRight,
  Menu,
  X,
  Star,
  Send,
  CheckCircle2,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id?: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export default function App() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    rating: 5,
    comment: ''
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch Reviews
    const q = query(
      collection(db, 'reviews'),
      where('approved', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        ...newReview,
        approved: false, // Needs moderation
        createdAt: new Date().toISOString()
      });
      setSubmitSuccess(true);
      setNewReview({ name: '', company: '', rating: 5, comment: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Hero Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
      })
      .from('.hero-sub', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');

      // Scroll Reveal for Bento Grid
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Scroll Reveal for Sections
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        });
      });
      // Parallax effect for floating elements
      gsap.to('.parallax-1', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -250,
        x: 50,
        rotate: 120,
        ease: 'none'
      });

      gsap.to('.parallax-2', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        },
        y: 150,
        x: -30,
        rotate: -60,
        ease: 'none'
      });

      gsap.to('.parallax-3', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: -120,
        x: 20,
        rotate: 180,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, []);

  const logoUrl = "https://lh3.googleusercontent.com/d/1-HZTk-U8eLqvZsWnlktlUwlGMH1_eAGI";
  const whatsappUrl = "https://wa.me/5569993296487";
  const instagramUrl = "https://www.instagram.com/joaopaulorepresentacoes/";
  const facebookUrl = "https://www.facebook.com/3pxagencia/";

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00A89E] selection:text-black">
      {/* HEADER */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/5 backdrop-blur-[15px] rounded-full border border-white/10 px-2 shadow-2xl">
        <div className="mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 pl-3 md:pl-4">
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden">
              <img 
                src={logoUrl} 
                alt="3PX Logo" 
                className="w-full h-full object-contain p-1.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-display font-bold tracking-tighter uppercase leading-none">Agência</span>
              <span className="text-[8px] font-sans font-medium tracking-[0.2em] uppercase opacity-50">E propaganda</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-70">
            <a href="#servicos" className="hover:text-[#00A89E] transition-colors">Serviços</a>
            <a href="#diferenciais" className="hover:text-[#00A89E] transition-colors">Diferenciais</a>
            <a href="#sobre" className="hover:text-[#00A89E] transition-colors">Sobre</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#00A89E] transition-colors">Instagram</a>
          </nav>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#004B57] to-[#00A89E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-[#00A89E]/30 transition-all mr-2"
          >
            <MessageSquare className="w-3 h-3" />
            Contato
          </a>

          <button 
            className="md:hidden pr-4 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 shadow-2xl"
          >
            <nav className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest">
              <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00A89E] transition-colors">Serviços</a>
              <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00A89E] transition-colors">Diferenciais</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00A89E] transition-colors">Sobre</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#00A89E] transition-colors">Instagram</a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#004B57] to-[#00A89E] text-white rounded-full"
              >
                <MessageSquare className="w-4 h-4" />
                Contato
              </a>
            </nav>
          </motion.div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
              alt="Business Architecture" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
          </div>

          {/* Floating Brand Elements (Cubes/Circles) */}
          <div className="parallax-1 absolute top-1/4 right-[10%] w-24 h-24 bg-gradient-to-br from-[#00A89E] to-[#005F56] rounded-full rotate-12 opacity-20 blur-sm animate-pulse hidden lg:block"></div>
          <div className="parallax-2 absolute bottom-1/4 left-[5%] w-16 h-16 bg-gradient-to-br from-[#001C44] to-[#004B57] rounded-xl -rotate-12 opacity-30 blur-[2px] hidden lg:block"></div>
          <div className="parallax-3 absolute top-1/3 left-[15%] w-8 h-8 bg-[#00A89E] rounded-full rotate-45 opacity-40 hidden lg:block"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-1.5 mb-8 glass rounded-full border border-[#00A89E]/20">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00A89E]">Representação Comercial de Elite</span>
            </div>
            <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[1.05] md:leading-[0.9] tracking-tighter mb-8">
              CONECTANDO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001C44] via-[#00A89E] to-white">MARCAS AO TOPO.</span>
            </h1>
            <p className="hero-sub text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Estratégia, expansão de mercado e resultados sólidos. Transformamos o potencial da sua empresa em liderança regional e nacional com a autoridade 3PX.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto group relative px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 hover:pr-14 animate-soft-pulse text-center"
              >
                <span className="relative z-10">Expandir meu Negócio</span>
                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              <a 
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all text-center"
              >
                Ver Portfólio
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <div className="w-px h-12 bg-gradient-to-b from-[#00A89E] to-transparent"></div>
          </div>
        </section>

        {/* AUTHORITY MARQUEE */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-7xl mx-auto glass rounded-full py-6 md:py-10 overflow-hidden border border-white/5">
            <div className="animate-marquee">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex items-center gap-12 md:gap-20 px-6 md:px-10">
                  <span className="text-2xl md:text-4xl font-display font-bold opacity-10 whitespace-nowrap uppercase tracking-tighter hover:opacity-100 hover:text-[#00A89E] transition-all cursor-default">Expansão Estratégica</span>
                  <span className="text-2xl md:text-4xl font-display font-bold opacity-10 whitespace-nowrap uppercase tracking-tighter hover:opacity-100 hover:text-[#001C44] transition-all cursor-default">Resultados Sólidos</span>
                  <span className="text-2xl md:text-4xl font-display font-bold opacity-10 whitespace-nowrap uppercase tracking-tighter hover:opacity-100 hover:text-[#00A89E] transition-all cursor-default">Gestão de Alta Performance</span>
                  <span className="text-2xl md:text-4xl font-display font-bold opacity-10 whitespace-nowrap uppercase tracking-tighter hover:opacity-100 hover:text-[#004B57] transition-all cursor-default">Conexão de Mercado</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS (BENTO GRID) */}
        <section id="diferenciais" className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 reveal">
            <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tighter mb-4 md:mb-6">
              O DIFERENCIAL <br /> <span className="text-[#00A89E]">3PX</span>
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#001C44] to-[#00A89E]"></div>
          </div>

          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Item 1 - Large */}
            <div className="bento-item md:col-span-2 md:row-span-2 glass p-6 md:p-10 flex flex-col justify-between group border-l-4 border-l-[#001C44] rounded-[2rem]">
              <div>
                <div className="w-12 h-12 bg-[#001C44]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#001C44] group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Penetração de Mercado</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  Não apenas representamos, nós conquistamos espaço. Utilizamos inteligência comercial para identificar as melhores oportunidades e fechar negócios de alto valor.
                </p>
              </div>
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-5xl font-display font-bold text-[#00A89E]">100%</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Compromisso com <br />Resultados e Performance</span>
                </div>
              </div>
            </div>

            {/* Item 2 - Wide */}
            <div className="bento-item md:col-span-2 glass p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:bg-[#001C44]/20 transition-colors rounded-[2rem]">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00A89E]/10 rounded-full flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 md:w-8 md:h-8 text-[#00A89E]" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-2">Relatórios de Performance</h3>
                <p className="text-sm text-white/50">Transparência total com dados reais sobre vendas, leads e crescimento de mercado em tempo real.</p>
              </div>
            </div>

            {/* Item 3 - Small */}
            <div className="bento-item glass p-6 md:p-10 group hover:border-[#00A89E]/30 transition-all rounded-[2rem]">
              <TrendingUp className="w-8 h-8 mb-4 text-[#004B57] opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-display font-bold mb-2">Escalabilidade</h3>
              <p className="text-xs text-white/50 leading-relaxed">Modelos de representação que acompanham o crescimento da sua produção.</p>
            </div>

            {/* Item 4 - Small */}
            <div className="bento-item glass p-6 md:p-10 group hover:border-[#00A89E]/30 transition-all rounded-[2rem]">
              <Users className="w-8 h-8 mb-4 text-[#00A89E] opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-display font-bold mb-2">Networking</h3>
              <p className="text-xs text-white/50 leading-relaxed">Acesso direto aos principais decisores e players do mercado regional.</p>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-16 md:py-32 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 reveal">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00A89E] mb-4 block">Nossa Expertise</span>
                <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tighter">SOLUÇÕES EM <br /> REPRESENTAÇÃO COMERCIAL.</h2>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 md:mt-0 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#00A89E] transition-all">
                Consultoria Estratégica <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Expansão de Mercado",
                  desc: "Mapeamento de novas regiões e abertura de canais de venda estratégicos para sua marca.",
                  icon: <Globe className="w-6 h-6" />
                },
                {
                  title: "Gestão de Vendas",
                  desc: "Acompanhamento completo do ciclo de vendas, desde a prospecção até o pós-venda especializado.",
                  icon: <Zap className="w-6 h-6" />
                },
                {
                  title: "Inteligência Comercial",
                  desc: "Análise de concorrência e tendências de mercado para posicionar seu produto com vantagem competitiva.",
                  icon: <BarChart3 className="w-6 h-6" />
                }
              ].map((service, idx) => (
                <div key={idx} className="reveal group glass p-6 md:p-8 rounded-[2rem] hover:bg-white/[0.03] transition-all">
                  <div className="mb-6 md:mb-8 w-12 h-12 md:w-14 md:h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#001C44] group-hover:to-[#00A89E] group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 md:mb-8">{service.desc}</p>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00A89E] opacity-50 hover:opacity-100 transition-opacity">
                    Falar sobre isso <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS / PROVA SOCIAL */}
        <section id="depoimentos" className="py-16 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20 reveal">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00A89E] mb-4 block">Voz do Cliente</span>
              <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tighter">RESULTADOS QUE <br /> FALAM POR NÓS.</h2>
            </div>

            {reviews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {reviews.map((review) => (
                  <div key={review.id} className="reveal glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#00A89E] fill-[#00A89E]' : 'text-white/10'}`} />
                        ))}
                      </div>
                      <p className="text-white/70 italic leading-relaxed mb-8">"{review.comment}"</p>
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#001C44] to-[#00A89E] flex items-center justify-center text-xs font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{review.name}</h4>
                        <p className="text-[10px] text-[#00A89E] uppercase tracking-widest">{review.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Review Form */}
            <div className="max-w-3xl mx-auto glass p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-[#00A89E]/20 relative overflow-hidden reveal">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A89E]/10 blur-[50px] rounded-full"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Avalie nossa parceria</h3>
                <p className="text-white/50 text-xs md:text-sm mb-8">Sua opinião é fundamental para nossa evolução contínua.</p>

                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-16 h-16 text-[#00A89E] mb-4" />
                    <h4 className="text-xl font-bold mb-2">Obrigado pela avaliação!</h4>
                    <p className="text-white/50 text-sm">Sua mensagem foi enviada para moderação e aparecerá em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-0">Nome Completo</label>
                        <input 
                          type="text" 
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-[#00A89E] px-0 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[#00A89E] transition-colors rounded-none"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-0">Empresa / Cargo</label>
                        <input 
                          type="text" 
                          value={newReview.company}
                          onChange={(e) => setNewReview({...newReview, company: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-[#00A89E] px-0 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[#00A89E] transition-colors rounded-none"
                          placeholder="Ex: Diretor na Empresa X"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-0">Sua Avaliação</label>
                      <div className="flex gap-2 ml-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button 
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            animate={newReview.rating === star ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ 
                              duration: 0.4,
                              times: [0, 0.5, 1],
                              ease: "easeInOut"
                            }}
                            className="focus:outline-none"
                          >
                            <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-[#00A89E] fill-[#00A89E]' : 'text-white/10'}`} />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-0">Seu Depoimento</label>
                      <textarea 
                        required
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        className="w-full bg-transparent border-0 border-b border-[#00A89E] px-0 py-4 text-sm focus:outline-none focus:ring-0 focus:border-[#00A89E] transition-colors min-h-[120px] rounded-none resize-none"
                        placeholder="Conte-nos como foi sua experiência com a 3PX..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#001C44] to-[#00A89E] text-white font-bold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-[#00A89E]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enviando...' : (
                        <>
                          Enviar Avaliação <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-32 px-6">
          <div className="max-w-7xl mx-auto glass rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 text-center overflow-hidden relative border border-white/5">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00A89E] blur-[100px] md:blur-[150px] rounded-full"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#001C44] blur-[100px] md:blur-[150px] rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter mb-6 md:mb-8">
                PRONTO PARA <br /> <span className="text-[#00A89E]">DOMINAR O MERCADO?</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8 md:mb-12 text-sm md:text-lg">
                Conecte sua marca a uma representação comercial de alta performance com a autoridade 3PX. Vamos construir o próximo capítulo do seu sucesso.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-block px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-[#001C44] to-[#00A89E] text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-[#00A89E]/40 transition-all text-sm md:text-base"
              >
                Agendar Reunião Estratégica
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] overflow-hidden">
                  <img 
                    src={logoUrl} 
                    alt="3PX Logo" 
                    className="w-full h-full object-contain p-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-display font-bold tracking-tighter uppercase leading-none">Agência</span>
                  <span className="text-[8px] font-sans font-medium tracking-[0.2em] uppercase opacity-50">E propaganda</span>
                </div>
              </div>
              <p className="text-white/40 max-w-xs leading-relaxed">
                Transformando o potencial de marcas em liderança de mercado através de estratégias de marketing e propaganda de alta performance com o selo 3PX.
              </p>
              <div className="mt-8 flex gap-4">
                <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 group" title="Instagram">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href={facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group" title="Facebook">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group" title="WhatsApp">
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-[#00A89E]">Navegação</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a></li>
                <li><a href={whatsappUrl} className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-[#00A89E]">Contato</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#00A89E]" />
                  <span>69 99329-6487</span>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#00A89E]" />
                  <span>@joaopaulorepresentacoes</span>
                </li>
                <li className="text-[10px] leading-relaxed mt-4">
                  Atendimento em toda a região de Rondônia e expansão nacional.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span>© 2026 3PX - Agência E propaganda. Todos os direitos reservados.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
