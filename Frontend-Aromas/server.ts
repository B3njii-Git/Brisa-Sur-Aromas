/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // Perfume DB mock data to return via API
  const perfumes = [
    {
      id: "1",
      name: "Bruma de Calafate",
      brand: "Brisa Sur Aromas",
      price: 48500,
      stock: 12,
      volume: "100 ml",
      description: "Una fragancia mística y dulce, inspirada en las laderas patagónicas. Las bayas silvestres de calafate se funden con notas húmedas de hojas de bosque y viento gélido andino.",
      notes: ["Calafate silvestre", "Musgo de roble", "Viento gélido", "Sándalo"],
      imageUrl: "https://picsum.photos/seed/calafate/600/450"
    },
    {
      id: "2",
      name: "Bosque Profundo",
      brand: "Brisa Sur Aromas",
      price: 52000,
      stock: 8,
      volume: "100 ml",
      description: "La frescura maderosa del sur concentrada en un frasco. Cipreses majestuosos, coihues centenarios y tierra húmeda tras una llovizna sureña, ideal para conectar con la naturaleza salvaje.",
      notes: ["Ciprés patagónico", "Tierra batida", "Madera de Coihue", "Corteza de Pino"],
      imageUrl: "https://picsum.photos/seed/forest/600/450"
    },
    {
      id: "3",
      name: "Glaciar Azul",
      brand: "Brisa Sur Aromas",
      price: 45000,
      stock: 15,
      volume: "100 ml",
      description: "Una explosión ultra fresh con acordes acuáticos y ozónicos salvajes. Simula el aire más puro de un glaciar milenario, acompañado de una sutil menta gélida y almizcle cristalino.",
      notes: ["Acorde de hielo glaciar", "Menta silvestre", "Brisa marina fría", "Almizcle blanco"],
      imageUrl: "https://picsum.photos/seed/glacier/600/450"
    },
    {
      id: "4",
      name: "Viento de Coihue",
      brand: "Brisa Sur Aromas",
      price: 49900,
      stock: 5,
      volume: "100 ml",
      description: "Fragancia herbácea y refrescante que emula el viento cruzando las copas de los árboles sureños. Posee toques cítricos jugosos cruzados con lavanda de montaña y maderas nobles.",
      notes: ["Hojas de Coihue verde", "Limón andino", "Lavanda silvestre", "Árbol de alerce"],
      imageUrl: "https://picsum.photos/seed/wind/600/450"
    }
  ];

  // API Route - GET perfumes
  app.get("/api/perfumes", (req, res) => {
    // Simulate slight delay to demonstrate dynamic loading
    setTimeout(() => {
      res.json(perfumes);
    }, 600);
  });

  // Vite middleware for development or serving assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
