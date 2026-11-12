// frontend/src/features/mazos/api/mazosApi.ts
import axios from 'axios';
import type {
  MazoGlobal,
  CrearMazoGlobalDto,
  ActualizarMazoGlobalDto,
  FluentValidationError,
} from '../types/mazo.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const obtenerMazosGlobalesAsync = async (): Promise<MazoGlobal[]> => {
  const respuesta = await apiClient.get<MazoGlobal[]>('/mazos');
  return respuesta.data;
};

export const crearMazoGlobalAsync = async (
  nuevoMazo: CrearMazoGlobalDto
): Promise<MazoGlobal> => {
  const respuesta = await apiClient.post<MazoGlobal>('/mazos', nuevoMazo);
  return respuesta.data;
};

// NUEVO: Endpoint PUT para actualizar mazo
export const actualizarMazoGlobalAsync = async (
  id: number,
  mazoEditado: ActualizarMazoGlobalDto
): Promise<MazoGlobal> => {
  await apiClient.put(`/mazos/${id}`, mazoEditado);
  // Reconstruimos el objeto con el ID y el nuevo nombre para entregárselo a React
  return { id, nombre: mazoEditado.nombre };
};

export const eliminarMazoGlobalAsync = async (id: number): Promise<void> => {
  await apiClient.delete(`/mazos/${id}`);
};

export const extraerMensajeErrorBackend = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return 'Sin respuesta del servidor (.NET apagado o bloqueo CORS).';
    const status = error.response.status;
    const data = error.response.data;

    if (Array.isArray(data)) {
      const erroresFluent = (data as FluentValidationError[])
        .map((item) => item?.errorMessage)
        .filter(
          (msg): msg is string =>
            typeof msg === 'string' && msg.trim().length > 0
        );

      if (erroresFluent.length > 0)
        return `[HTTP ${status}] ${erroresFluent.join(' | ')}`;
    }

    if (typeof data === 'string' && data.trim().length > 0)
      return `[HTTP ${status}] ${data}`;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      if ('errors' in obj && obj.errors && typeof obj.errors === 'object') {
        const lista = Object.values(
          obj.errors as Record<string, string[]>
        ).flat();
        if (lista.length > 0) return `[HTTP ${status}] ${lista.join(' | ')}`;
      }
      const msg =
        obj.error || obj.mensaje || obj.message || obj.detail || obj.title;
      if (typeof msg === 'string' && msg.trim().length > 0)
        return `[HTTP ${status}] ${msg}`;
    }
    return `[HTTP ${status}] El servidor rechazó la operación.`;
  }
  return error instanceof Error ? error.message : 'Error inesperado.';
};
