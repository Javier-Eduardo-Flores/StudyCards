// src/features/mazos/api/mazosApi.ts
import type { MazoGlobal } from '../types/mazo.types';

export const obtenerMazosGlobalesAsync = (): Promise<MazoGlobal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datosSimuladosBD: MazoGlobal[] = [
        { id: 1, nombre: 'Historia Universal' },
        { id: 2, nombre: 'Anatomía Humana' },
        { id: 3, nombre: 'Fórmulas de Física' },
        { id: 4, nombre: 'Verbos en Inglés' },
        { id: 5, nombre: 'Química Orgánica' },
        { id: 6, nombre: 'Capitales del Mundo' },
      ];
      resolve(datosSimuladosBD);
    }, 1200);
  });
};
