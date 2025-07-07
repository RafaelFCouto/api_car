export interface Car extends Record<string, unknown> {
  id_veiculo: number;
  placa: string;
  modelo: string;
  ano: number;
  status: CarStatus;
}

export type CarStatus = 
  | 'DISPONIVEL'
  | 'ALUGADO'
  | 'EM_MANUTENCAO'
  | 'RESERVADO'
  | 'INDISPONIVEL'
  | 'FORA_DE_CIRCULACAO';

export interface CarFormData {
  placa: string;
  modelo: string;
  ano: number;
  status: CarStatus;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}