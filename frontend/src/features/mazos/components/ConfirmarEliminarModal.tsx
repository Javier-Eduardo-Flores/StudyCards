import type { MazoGlobal } from '../types/mazo.types';

interface ConfirmarEliminarModalProps {
  mazo: MazoGlobal;
  onConfirmar: () => void;
  onCancelar: () => void;
  eliminando: boolean;
}

export function ConfirmarEliminarModal({
  mazo,
  onConfirmar,
  onCancelar,
  eliminando,
}: ConfirmarEliminarModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-150">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-lg">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">¿Eliminar Mazo?</h3>
            <p className="text-xs text-slate-400">
              Esta acción borra el mazo físicamente en PostgreSQL.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 bg-slate-950 p-3 rounded-lg border border-slate-800">
          Mazo a eliminar:{' '}
          <strong className="text-white font-semibold">
            {mazo.nombre}
          </strong>{' '}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            disabled={eliminando}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            disabled={eliminando}
            className="bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {eliminando ? '⏳ Eliminando...' : '🗑️ Confirmar Eliminación'}
          </button>
        </div>
      </div>
    </div>
  );
}
