/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Droplets, 
  Wind, 
  Sparkles, 
  Compass, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  Trees, 
  Flame, 
  ShieldCheck 
} from "lucide-react";
import Hero from "./components/Hero";
import PerfumeCard from "./components/PerfumeCard";
import PerfumeDetailModal from "./components/PerfumeDetailModal";
import { Perfume } from "./types";

// Default/mock fallback data (3 perfumes as requested)
const MOCK_PERFUMES_FALLBACK: Perfume[] = [
  {
    id: "mock-1",
    name: "Bruma de Calafate (Demo)",
    brand: "Brisa Sur Aromas",
    price: 48500,
    stock: 12,
    volume: "100 ml",
    description: "[Modo Offline] Una fragancia mística y dulce, inspirada en las laderas patagónicas de calafates silvestres y viento gélido andino oriental.",
    notes: ["Calafate silvestre", "Musgo de roble", "Viento gélido"],
    imageUrl: "https://picsum.photos/seed/calafate/600/450"
  },
  {
    id: "mock-2",
    name: "Bosque Profundo (Demo)",
    brand: "Brisa Sur Aromas",
    price: 52000,
    stock: 5,
    volume: "100 ml",
    description: "[Modo Offline] Frescura maderosa del sur concentrada. Cipreses majestuosos, coihues centenarios y follaje perfumado post-lluvia.",
    notes: ["Ciprés patagónico", "Madera de Coihue", "Corteza de Pino"],
    imageUrl: "https://picsum.photos/seed/forest/600/450"
  },
  {
    id: "mock-3",
    name: "Glaciar Azul (Demo)",
    brand: "Brisa Sur Aromas",
    price: 45000,
    stock: 0, // Out of stock to show out-of-stock badge
    volume: "100 ml",
    description: "[Modo Offline] Sabor de acordes acuáticos y ozónicos salvajes. Simula el aire puro de un bloque glaciar con menta helada.",
    notes: ["Acorde glaciar", "Menta silvestre", "Almizcle blanco"],
    imageUrl: "https://picsum.photos/seed/glacier/600/450"
  }
];

export default function App() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSource, setCurrentSource] = useState<"api" | "fallback">("api");
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [simulationTrigger, setSimulationTrigger] = useState(0); 
  const [isSimulationForcedOffline, setIsSimulationForcedOffline] = useState(false);

  // Dynamic fetch request GET to /api/perfumes
  useEffect(() => {
    let active = true;
    setIsLoading(true);

    const loadData = async () => {
      if (isSimulationForcedOffline) {
        // Mocking immediate offline behavior
        setTimeout(() => {
          if (!active) return;
          setPerfumes(MOCK_PERFUMES_FALLBACK);
          setCurrentSource("fallback");
          setIsLoading(false);
        }, 500);
        return;
      }

      try {
        const response = await fetch("/api/perfumes");
        if (!response.ok) {
          throw new Error("Respuesta de API incorrecta");
        }
        const data = await response.json();
        if (active) {
          setPerfumes(data);
          setCurrentSource("api");
          setIsLoading(false);
        }
      } catch (err) {
        console.warn("Fallo de conexión en API Perfumes, cargando mock data por defecto:", err);
        if (active) {
          setPerfumes(MOCK_PERFUMES_FALLBACK);
          setCurrentSource("fallback");
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [simulationTrigger, isSimulationForcedOffline]);

  const handleRetry = () => {
    setSimulationTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/40 text-brand-950 font-sans selection:bg-brand-200 selection:text-brand-950">
      {/* Dynamic Nav Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-brand-100/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo element */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-white shadow-md">
              <Wind className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-serif font-bold text-lg tracking-wider text-brand-950 uppercase">Brisa Sur</span>
              <span className="block text-[9px] font-display text-brand-500 tracking-widest uppercase font-semibold">Aromas Orgánicos</span>
            </div>
          </div>

          {/* Center Navigation Links - Keep single screen constraint safe */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-display tracking-widest uppercase font-semibold text-brand-600">
            <a href="#home" className="hover:text-brand-900 transition-colors">Inicio</a>
            <a href="#catalogo" className="hover:text-brand-900 transition-colors">Catálogo</a>
            <a href="#valores" className="hover:text-brand-900 transition-colors">Sustentabilidad</a>
          </nav>

          {/* Connection Status Panel & Trigger Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100">
              <span className={`w-2 h-2 rounded-full ${
                currentSource === "api" ? "bg-green-500 animate-pulse" : "bg-amber-500"
              }`} />
              <span className="text-[10px] font-display font-semibold tracking-wider text-brand-800 uppercase">
                {currentSource === "api" ? "API Conectada" : "Modo Fallback Offline"}
              </span>
            </div>

            {/* Simulated Disconnect Button for interactive client evaluations */}
            <button
              onClick={() => {
                setIsSimulationForcedOffline(!isSimulationForcedOffline);
                handleRetry();
              }}
              title="Simula pérdida de conexión para ver perfumes por defecto (mock-data)"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-wider bg-brand-100 hover:bg-brand-200 text-brand-700 hover:text-brand-900 transition-all border border-brand-300/30"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isSimulationForcedOffline ? "Reconectar API" : "Simular Offline"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Main Catalogue Section */}
      <section id="catalogo" className="py-24 max-w-7xl mx-auto px-6 w-full scroll-mt-20">
        {/* Title Group and description */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-brand-500" />
            <span className="text-xs font-display tracking-widest text-brand-500 uppercase font-semibold">ALQUIMIA PATAGÓNICA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-950 mb-4 tracking-tight">
            Nuestro Catálogo de Aromas
          </h2>
          <p className="text-base text-brand-700 font-light font-sans max-w-2xl leading-relaxed">
            Cada fragancia es elaborada pacientemente en lotes limitados utilizando extractos vegetales puros de los rincones más vírgenes del sur. Explora nuestras composiciones exclusivas.
          </p>
        </div>

        {/* Dynamic State Alert Banner */}
        {currentSource === "fallback" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-amber-50 border border-amber-200/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-950">Sección en Modo de Respaldo</p>
                <p className="text-xs text-brand-700">El servidor API no ha respondido o holds offline simulator. Mostrando datos locales de demostración (3 perfumes básicos).</p>
              </div>
            </div>
            {!isSimulationForcedOffline && (
              <button
                onClick={handleRetry}
                className="cursor-pointer text-xs font-display tracking-wider font-semibold text-brand-900 hover:text-brand-950 bg-white shadow-xs border border-brand-200 hover:border-brand-300 px-4 py-2 rounded-full transition-all"
              >
                Reintentar Conexión
              </button>
            )}
          </motion.div>
        )}

        {/* Grid and Loader */}
        {isLoading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center py-20 bg-white/40 border border-brand-100/50 rounded-3xl">
            <div className="w-12 h-12 border-3 border-brand-200 border-t-brand-900 rounded-full animate-spin mb-4" />
            <p className="text-sm font-display tracking-widest text-brand-500 uppercase font-medium animate-pulse">Sintonizando esencias...</p>
          </div>
        ) : perfumes.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-brand-200 rounded-3xl p-12 text-center bg-white/50">
            <span className="text-lg font-serif italic text-brand-600 mb-2">Sin aromas catalogados</span>
            <p className="text-sm text-brand-500">Por el momento no hay stock de perfumes disponibles.</p>
          </div>
        ) : (
          /* Cards Grid Wrapper */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {perfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onOpenDetails={setSelectedPerfume}
              />
            ))}
          </div>
        )}
      </section>

      {/* Elegant Corporate Sustainability Section */}
      <section id="valores" className="bg-brand-950 text-white py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-display tracking-widest text-brand-400 uppercase font-bold mb-3 block">
              COMPROMISO SUSTENTABLE
            </span>
            <h3 className="text-3xl md:text-5.5xl font-serif font-bold tracking-tight mb-6 leading-tight">
              Honrar la pureza de la naturaleza sureña
            </h3>
            <p className="text-brand-250 font-sans font-light leading-relaxed mb-8">
              En Brisa Sur Aromas creemos en procesos respetuosos con las laderas y los bosques. No solo encapsulamos fragancias extraordinarias, sino que regeneramos tierras nativas mediante proyectos activos en la Patagonia.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-brand-800">
              <div>
                <span className="block text-2xl md:text-3xl font-display font-bold text-white">100%</span>
                <span className="text-xs text-brand-350 uppercase tracking-wider font-semibold font-display">Ingredientes Veganos</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-display font-bold text-white">Cruelty Free</span>
                <span className="text-xs text-brand-350 uppercase tracking-wider font-semibold font-display">Certificación PETA</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Value card 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-200 mb-6">
                <Trees className="w-6 h-6" />
              </div>
              <h4 className="text-base font-serif font-medium mb-3">Reforestación Activa</h4>
              <p className="text-xs text-brand-300 font-light leading-relaxed">
                Por cada frasco adquirido en nuestra tienda, donamos el 7% de lo recaudado para la plantación de Alerces y Coihues nativos en zonas degradadas.
              </p>
            </div>

            {/* Value card 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-200 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-serif font-medium mb-3">Envasado Minimalista</h4>
              <p className="text-xs text-brand-300 font-light leading-relaxed">
                Vidrio reciclado soplado a mano, tapas reutilizables de maderas regionales caídas y empaques compostables de fibras orgánicas. Cero plástico virgen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Detail Modal Selector */}
      <PerfumeDetailModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
      />

      {/* Brand Footer */}
      <footer className="mt-auto bg-brand-950 border-t border-brand-900/60 text-brand-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-900 rounded-lg flex items-center justify-center text-brand-200">
              <Wind className="w-4.5 h-4.5" />
            </div>
            <span className="font-serif font-semibold tracking-wider text-sm text-white uppercase">
              Brisa Sur Aromas
            </span>
          </div>

          <p className="text-xs font-sans text-brand-400/80 text-center md:text-right">
            © 2026 Brisa Sur Aromas S.A. Todos los derechos reservados. Desarrollado con esmero y elegancia.
          </p>
        </div>
      </footer>
    </div>
  );
}
