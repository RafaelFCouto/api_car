import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../components/Layout/StandardPageLayout';
import CarForm from '../components/CarForm';
import { useCarStore } from '../store/carStore';
import type { CarFormData } from '../types';

const CarRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addCar } = useCarStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CarFormData) => {
    try {
      setLoading(true);
      await addCar(data);
      toast.success('Carro cadastrado com sucesso!');
      navigate('/cars');
    } catch (error) {
      console.error('Erro ao cadastrar carro:', error);
      toast.error('Erro ao cadastrar carro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cars');
  };

  return (
    <StandardPageLayout
      title="Cadastro de Carro"
      subtitle="Preencha os campos abaixo para cadastrar um novo carro"
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
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </StandardPageLayout>
  );
};

export default CarRegister;