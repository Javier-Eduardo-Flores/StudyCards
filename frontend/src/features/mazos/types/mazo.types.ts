// frontend/src/features/mazos/types/mazo.types.ts

export interface MazoGlobal {
  id: number;
  nombre: string;
}

export interface CrearMazoGlobalDto {
  nombre: string;
}

export interface ActualizarMazoGlobalDto {
  nombre: string;
}

export interface FluentValidationError {
  propertyName: string;
  errorMessage: string;
  attemptedValue?: unknown;
  errorCode?: string;
}
