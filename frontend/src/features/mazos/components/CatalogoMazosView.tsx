// frontend/src/features/mazos/components/CatalogoMazosView.tsx
import { useState, useEffect } from 'react';
import type { MazoGlobal } from '../types/mazo.types';
import {
  obtenerMazosGlobalesAsync,
  eliminarMazoGlobalAsync,
  extraerMensajeErrorBackend,
} from '../api/mazosApi';
import { MazoGlobalCard } from './MazoGlobalCard';
import { CrearMazoForm } from './CrearMazoForm';
import { ConfirmarEliminarModal } from './ConfirmarEliminarModal';
import { EditarMazoModal } from './EditarMazoModal';

export function CatalogoMazosView() {
  const [mazos, setMazos] = useState<MazoGlobal[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [errorRed, setErrorRed] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  // Estados para los Modales
  const [mazoAEliminar, setMazoAEliminar] = useState<MazoGlobal | null>(null);
  const [eliminando, setEliminando] = useState<boolean>(false);

  const [mazoAEditar, setMazoAEditar] = useState<MazoGlobal | null>(null);

  useEffect(() => {
    obtenerMazosGlobalesAsync()
      .then((datos) => {
        setMazos(datos);
        setErrorRed(null);
      })
      .catch((error) => {
        setErrorRed(extraerMensajeErrorBackend(error));
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // 1. Crear (POST - Spread)
  const manejarMazoCreado = (nuevoMazo: MazoGlobal) => {
    setMazos((mazosActuales) => [...mazosActuales, nuevoMazo]);
    setMostrarFormulario(false);
  };

  // 2. Actualizar (PUT - Inmutabilidad con .map)
  const manejarMazoActualizado = (mazoActualizado: MazoGlobal) => {
    setMazos((mazosActuales) =>
      mazosActuales.map((m) =>
        m.id === mazoActualizado.id ? mazoActualizado : m
      )
    );
    setMazoAEditar(null);
  };

  // 3. Confirmar Eliminación (DELETE - Inmutabilidad con .filter)
  const ejecutarEliminacion = async () => {
    if (!mazoAEliminar) return;

    try {
      setEliminando(true);
      await eliminarMazoGlobalAsync(mazoAEliminar.id);
      setMazos((mazosActuales) =>
        mazosActuales.filter((m) => m.id !== mazoAEliminar.id)
      );
      setMazoAEliminar(null);
    } catch (error) {
      alert(`Error al eliminar: ${extraerMensajeErrorBackend(error)}`);
    } finally {
      setEliminando(false);
    }
  };

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
            Conectado en tiempo real vía HTTP/CORS con{' '}
            <code className="text-indigo-400 font-mono">PostgreSQL</code>.
          </p>
        </div>

        {!mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
          >
            + Nuevo Mazo Global
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <CrearMazoForm
          onMazoCreado={manejarMazoCreado}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}

      {/* Buscador reactivo */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar mazos provenientes de la BD..."
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

      {cargando && (
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-indigo-400 font-semibold animate-pulse text-lg">
            ⏳ Consultando endpoint GET /api/mazos en .NET...
          </p>
        </div>
      )}

      {!cargando && errorRed && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-6 text-center">
          <p className="text-red-400 font-bold text-base mb-1">
            🚨 Error de Comunicación Full-Stack
          </p>
          <p className="text-slate-300 text-sm">{errorRed}</p>
        </div>
      )}

      {!cargando && !errorRed && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mazosFiltrados.map((mazo) => (
            <MazoGlobalCard
              key={mazo.id}
              id={mazo.id}
              nombre={mazo.nombre}
              onEliminar={() => setMazoAEliminar(mazo)}
              onEditar={() => setMazoAEditar(mazo)}
            />
          ))}
        </section>
      )}

      {/* MODAL 1: Confirmación de Eliminación */}
      {mazoAEliminar && (
        <ConfirmarEliminarModal
          mazo={mazoAEliminar}
          onConfirmar={ejecutarEliminacion}
          onCancelar={() => setMazoAEliminar(null)}
          eliminando={eliminando}
        />
      )}

      {/* MODAL 2: Formulario de Edición (PUT) */}
      {mazoAEditar && (
        <EditarMazoModal
          mazo={mazoAEditar}
          onMazoActualizado={manejarMazoActualizado}
          onCancelar={() => setMazoAEditar(null)}
        />
      )}
    </div>
  );
}
