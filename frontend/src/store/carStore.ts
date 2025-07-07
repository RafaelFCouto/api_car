import { create } from 'zustand';
import type { Car, CarFormData } from '../types';
import { carService } from '../services/api';

interface CarStore {
  cars: Car[];
  loading: boolean;
  error: string | null;
  
  fetchCars: () => Promise<void>;
  addCar: (data: CarFormData) => Promise<void>;
  updateCar: (id: number, data: CarFormData) => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCarStore = create<CarStore>((set, get) => ({
  cars: [],
  loading: false,
  error: null,

  fetchCars: async () => {
    set({ loading: true, error: null });
    try {
      const cars = await carService.getAll();
      set({ cars, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao buscar carros',
        loading: false 
      });
    }
  },

  addCar: async (data: CarFormData) => {
    set({ loading: true, error: null });
    try {
      const newCar = await carService.create(data);
      set({ 
        cars: [...get().cars, newCar],
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao criar carro',
        loading: false 
      });
      throw error;
    }
  },

  updateCar: async (id: number, data: CarFormData) => {
    set({ loading: true, error: null });
    try {
      const updatedCar = await carService.update(id, data);
      set({ 
        cars: get().cars.map(car => 
          car.id_veiculo === id ? updatedCar : car
        ),
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao atualizar carro',
        loading: false 
      });
      throw error;
    }
  },

  deleteCar: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await carService.delete(id);
      set({ 
        cars: get().cars.filter(car => car.id_veiculo !== id),
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao deletar carro',
        loading: false 
      });
      throw error;
    }
  },

  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));