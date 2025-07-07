import axios from 'axios';
import type { Car, CarFormData } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const carService = {
  async getAll(): Promise<Car[]> {
    const response = await api.get('/car/');
    return response.data;
  },

  async getById(id: number): Promise<Car> {
    const response = await api.get(`/car/${id}/`);
    return response.data;
  },

  async create(data: CarFormData): Promise<Car> {
    const response = await api.post('/car/', data);
    return response.data;
  },

  async update(id: number, data: CarFormData): Promise<Car> {
    const response = await api.put(`/car/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/car/${id}/`);
  },
};

export default api;