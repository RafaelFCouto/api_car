import React, { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../components/Layout/StandardPageLayout';
import CarForm from '../components/CarForm';
import { useCarStore } from '../store/carStore';
import type { CarFormData, Car } from '../types';

const CarEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { cars, updateCar, fetchCars } = useCarStore();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Car | null>(null);
  const [fetchingCar, setFetchingCar] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        setFetchingCar(true);
        
        // Se não tem carros carregados, busca primeiro
        if (cars.length === 0) {
          await fetchCars();
        }
        
        // Busca o carro pelo ID
        const foundCar = cars.find(c => c.id_veiculo === Number(id));
        if (foundCar) {
          setCar(foundCar);
        } else {
          toast.error('Carro não encontrado');
          navigate('/cars');
        }
      } catch (error) {
        console.error('Erro ao carregar carro:', error);
        toast.error('Erro ao carregar dados do carro');
        navigate('/cars');
      } finally {
        setFetchingCar(false);
      }
    };

    if (id) {
      loadCar();
    }
  }, [id, cars, fetchCars, navigate]);

  const handleSubmit = async (data: CarFormData) => {
    if (!car) return;
    
    try {
      setLoading(true);
      await updateCar(car.id_veiculo, data);
      toast.success('Carro atualizado com sucesso!');
      navigate('/cars');
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      toast.error('Erro ao atualizar carro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cars');
  };

  if (fetchingCar) {
    return (
      <StandardPageLayout
        title="Editar Carro"
        subtitle="Carregando informações do carro..."
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '200px'
        }}>
          <Spin size="large" />
        </div>
      </StandardPageLayout>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <StandardPageLayout
      title="Editar Carro"
      subtitle={`Atualize as informações do carro ${car.placa}`}
    >
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          type="default"
        >
          Ir para Lista
        </Button>
      </div>
      
      <CarForm
        car={car}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </StandardPageLayout>
  );
};

export default CarEdit;