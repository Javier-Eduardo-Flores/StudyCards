// 1. Contrato de Lectura (Entidad desde PostgreSQL)
export interface MazoGlobal {
  id: number;
  nombre: string;
}

// 2. Contrato de Escritura (Payload para el POST)
export interface CrearMazoGlobalDto {
  nombre: string;
}

// 3. Contrato de Error de FluentValidation (.NET ValidationFailure)
export interface FluentValidationError {
  propertyName: string;
  errorMessage: string;
  attemptedValue?: unknown;
  errorCode?: string;
}
