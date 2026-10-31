// src/features/mazos/components/CatalogoMazosView.tsx
import { useState, useEffect } from 'react';
import type { MazoGlobal } from '../types/mazo.types';
import { obtenerMazosGlobalesAsync } from '../api/mazosApi';
import { MazoGlobalCard } from './MazoGlobalCard';

export function CatalogoMazosView() {
  const [mazos, setMazos] = useState<MazoGlobal[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    obtenerMazosGlobalesAsync().then((datos) => {
      setMazos(datos);
      setCargando(false);
    });
  }, []);

  const mazosFiltrados = mazos.filter((mazo) =>
    mazo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Catálogo Global de Mazos
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Módulo desacoplado bajo arquitectura{' '}
            <code className="text-indigo-400 font-mono">Vertical Slicing</code>.
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
          + Nuevo Mazo Global
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar mazos en el catálogo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <span className="text-xs text-slate-400">
          Mostrando{' '}
          <strong className="text-white">{mazosFiltrados.length}</strong> de{' '}
          {mazos.length} registros
        </span>
      </div>

      {cargando ? (
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-indigo-400 font-semibold animate-pulse text-lg">
            ⏳ Consultando capa de servicios (mazosApi.ts)...
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mazosFiltrados.map((mazo) => (
            <MazoGlobalCard key={mazo.id} id={mazo.id} nombre={mazo.nombre} />
          ))}
        </section>
      )}
    </div>
  );
}
