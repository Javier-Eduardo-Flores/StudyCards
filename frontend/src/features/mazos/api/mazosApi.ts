import axios from 'axios';
import type {
  MazoGlobal,
  CrearMazoGlobalDto,
  FluentValidationError,
} from '../types/mazo.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Endpoint GET
export const obtenerMazosGlobalesAsync = async (): Promise<MazoGlobal[]> => {
  const respuesta = await apiClient.get<MazoGlobal[]>('/mazos');
  return respuesta.data;
};

// NUEVO: Endpoint POST
export const crearMazoGlobalAsync = async (
  nuevoMazo: CrearMazoGlobalDto
): Promise<MazoGlobal> => {
  const respuesta = await apiClient.post<MazoGlobal>('/mazos', nuevoMazo);
  return respuesta.data;
};

// NUEVO: Extractor de Errores HTTP de .NET (Soporta FluentValidation)
export const extraerMensajeErrorBackend = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Sin respuesta del servidor (.NET apagado o bloqueo CORS).';
    }

    const status = error.response.status;
    const data = error.response.data;

    // Caso B: Arreglo de errores devuelto por FluentValidation en .NET
    if (Array.isArray(data)) {
      const erroresFluent = (data as FluentValidationError[])
        .map((item) => item?.errorMessage)
        .filter(
          (msg): msg is string =>
            typeof msg === 'string' && msg.trim().length > 0
        );

      if (erroresFluent.length > 0) {
        return `[HTTP ${status}] ${erroresFluent.join(' | ')}`;
      }
    }

    // Caso C: String directo
    if (typeof data === 'string' && data.trim().length > 0) {
      return `[HTTP ${status}] ${data}`;
    }

    // Caso D: ProblemDetails
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      if ('errors' in obj && obj.errors && typeof obj.errors === 'object') {
        const listaErrores = Object.values(
          obj.errors as Record<string, string[]>
        ).flat();
        if (listaErrores.length > 0) {
          return `[HTTP ${status}] ${listaErrores.join(' | ')}`;
        }
      }
      const mensajeExplicito =
        obj.error || obj.mensaje || obj.message || obj.detail || obj.title;
      if (
        typeof mensajeExplicito === 'string' &&
        mensajeExplicito.trim().length > 0
      ) {
        return `[HTTP ${status}] ${mensajeExplicito}`;
      }
    }
    return `[HTTP ${status}] El servidor rechazó la operación.`;
  }
  return error instanceof Error ? error.message : 'Error inesperado.';
};
