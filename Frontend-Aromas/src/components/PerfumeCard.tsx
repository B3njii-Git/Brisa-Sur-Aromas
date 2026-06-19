/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Droplet, Info, ShoppingBag } from "lucide-react";
import { Perfume } from "../types";

interface PerfumeCardProps {
  key?: string;
  perfume: Perfume;
  onOpenDetails: (perfume: Perfume) => void;
}

export default function PerfumeCard({ perfume, onOpenDetails }: PerfumeCardProps) {
  // Simple CLY/ARS formats like $45.000
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isLowStock = perfume.stock > 0 && perfume.stock <= 5;
  const isOutOfStock = perfume.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-brand-200/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Visual Image container */}
      <div className="relative aspect-4/3 bg-brand-50 w-full overflow-hidden flex items-center justify-center">
        {/* Soft background glow based on item type */}
        <div className={`absolute inset-0 bg-linear-to-tr opacity-5 transition-opacity group-hover:opacity-10 duration-500 ${
          perfume.id === "1" ? "from-purple-900 to-indigo-800" :
          perfume.id === "2" ? "from-emerald-900 to-teal-800" :
          perfume.id === "3" ? "from-cyan-900 to-blue-800" :
          "from-amber-900 to-emerald-800"
        }`} />

        <img
          src={perfume.imageUrl}
          alt={perfume.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Volume badge */}
        <span className="absolute bottom-3 right-3 bg-white/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-display font-medium tracking-wider text-brand-950 uppercase border border-white/50 shadow-xs">
          {perfume.volume}
        </span>

        {/* Low Stock badge */}
        {isOutOfStock ? (
          <span className="absolute top-3 left-3 bg-red-650 bg-red-600 text-white font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm z-10">
            Agotado
          </span>
        ) : isLowStock ? (
          <span className="absolute top-3 left-3 bg-amber-600 text-white font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm z-10">
            Últimas {perfume.stock} Unidades
          </span>
        ) : null}
      </div>

      {/* Info details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand and category */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-display tracking-widest text-brand-500 uppercase font-medium">
              {perfume.brand}
            </span>
            <div className="flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-xs text-brand-700 font-medium">Extracto de Perfume</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-medium text-brand-950 mb-2 truncate group-hover:text-brand-900 transition-colors">
            {perfume.name}
          </h3>

          {/* Scent notes tag preview */}
          <div className="flex flex-wrap gap-1 mb-4">
            {perfume.notes.slice(0, 2).map((note, idx) => (
              <span key={idx} className="inline-flex text-[10px] font-sans font-medium text-brand-850 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-100">
                {note}
              </span>
            ))}
            {perfume.notes.length > 2 && (
              <span className="inline-flex text-[10px] font-sans font-light text-brand-500 px-1.5 py-0.5">
                +{perfume.notes.length - 2} más
              </span>
            )}
          </div>
        </div>

        {/* Bottom price + action */}
        <div className="pt-4 border-t border-brand-50 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-display text-brand-400 uppercase tracking-wider font-semibold">Precio</span>
            <span className="text-lg font-display font-medium text-brand-900">{formatPrice(perfume.price)}</span>
          </div>

          <button
            onClick={() => onOpenDetails(perfume)}
            className="cursor-pointer group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 hover:bg-brand-900 text-brand-900 hover:text-white rounded-full font-display font-medium text-xs tracking-wider uppercase transition-all duration-305"
          >
            Detalles
            <Info className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
