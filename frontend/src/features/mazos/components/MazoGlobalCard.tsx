export interface MazoGlobalProps {
  id: number;
  nombre: string;
  onEliminar?: (id: number) => void;
  onEditar?: (id: number) => void;
}

export function MazoGlobalCard({
  id,
  nombre,
  onEliminar,
  onEditar,
}: MazoGlobalProps) {
  return (
    <article className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-500 transition-colors shadow-sm relative group">
      {/* Botones de Acción de Tarjeta */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {onEditar && (
          <button
            onClick={() => onEditar(id)}
            title="Editar mazo"
            className="text-slate-400 hover:text-indigo-400 bg-slate-900/50 hover:bg-indigo-950 p-1.5 rounded-md transition-colors cursor-pointer"
          >
            ✏️
          </button>
        )}

        {onEliminar && (
          <button
            onClick={() => onEliminar(id)}
            title="Eliminar mazo"
            className="text-slate-400 hover:text-red-400 bg-slate-900/50 hover:bg-red-950 p-1.5 rounded-md transition-colors cursor-pointer"
          >
            🗑️
          </button>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 pr-16">
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/20">
            ID Catálogo #{id}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Catálogo Base
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-5">{nombre}</h3>
      </div>

      <button
        disabled
        className="w-full bg-slate-900/80 text-slate-400 text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed border border-slate-700"
      >
        🔒 Estudiar Mazo (Requiere Sesión)
      </button>
    </article>
  );
}
