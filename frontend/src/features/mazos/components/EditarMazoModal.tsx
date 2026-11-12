import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MazoGlobal } from '../types/mazo.types';
import { useState } from 'react';
import {
  actualizarMazoGlobalAsync,
  extraerMensajeErrorBackend,
} from '../api/mazosApi';
import {
  crearMazoGlobalSchema,
  type CrearMazoGlobalSchemaType,
} from '../schemas/mazo.schema';

interface EditarMazoModalProps {
  mazo: MazoGlobal;
  onMazoActualizado: (mazoActualizado: MazoGlobal) => void;
  onCancelar: () => void;
}

export function EditarMazoModal({
  mazo,
  onMazoActualizado,
  onCancelar,
}: EditarMazoModalProps) {
  const [errorServidor, setErrorServidor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CrearMazoGlobalSchemaType>({
    resolver: zodResolver(crearMazoGlobalSchema),
    mode: 'onChange',
    defaultValues: { nombre: mazo.nombre }, // Pre-llenamos con el nombre actual
  });

  const procesarEdicion = async (datosValidados: CrearMazoGlobalSchemaType) => {
    try {
      setErrorServidor(null);
      const actualizado = await actualizarMazoGlobalAsync(
        mazo.id,
        datosValidados
      );
      onMazoActualizado(actualizado);
    } catch (error) {
      setErrorServidor(extraerMensajeErrorBackend(error));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>✏️</span> Editar Mazo #{mazo.id}
          </h3>
          <button
            onClick={onCancelar}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(procesarEdicion)}>
          <label className="block text-xs text-slate-400 mb-1.5 font-medium">
            Nombre del Mazo
          </label>
          <input
            type="text"
            {...register('nombre', {
              onChange: () => {
                if (errorServidor) setErrorServidor(null);
              },
            })}
            disabled={isSubmitting}
            className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors mb-2 ${
              errors.nombre
                ? 'border-amber-500'
                : errorServidor
                  ? 'border-red-500'
                  : 'border-slate-700 focus:border-indigo-500'
            }`}
          />

          {errors.nombre && (
            <p className="text-amber-400 text-xs mb-3 font-medium">
              ⚡ {errors.nombre.message}
            </p>
          )}

          {errorServidor && (
            <div className="bg-red-950/60 border border-red-500/40 rounded-lg p-2.5 text-xs text-red-300 mb-4">
              🛡️ <strong>Respuesta .NET:</strong> {errorServidor}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancelar}
              disabled={isSubmitting}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm px-4 py-2 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-sm px-4 py-2 rounded-lg font-medium cursor-pointer"
            >
              {isSubmitting ? '⏳ Guardando...' : '💾 Actualizar Mazo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
