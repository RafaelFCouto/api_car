import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import type { Car, CarFormData, CarStatus } from '../types';

const { Option } = Select;

interface CarFormProps {
  car?: Car;
  onSubmit: (data: CarFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const statusOptions: { value: CarStatus; label: string }[] = [
  { value: 'DISPONIVEL', label: 'Disponível' },
  { value: 'ALUGADO', label: 'Alugado' },
  { value: 'EM_MANUTENCAO', label: 'Em Manutenção' },
  { value: 'RESERVADO', label: 'Reservado' },
  { value: 'INDISPONIVEL', label: 'Indisponível' },
  { value: 'FORA_DE_CIRCULACAO', label: 'Fora de Circulação' },
];

const CarForm: React.FC<CarFormProps> = ({ car, onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: CarFormData) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={car ? {
        placa: car.placa,
        modelo: car.modelo,
        ano: car.ano,
        status: car.status,
      } : {
        status: 'DISPONIVEL',
      }}
      style={{ maxWidth: 'none' }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <Form.Item
          name="placa"
          label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Placa</span>}
          rules={[
            { required: true, message: 'Por favor, informe a placa' },
            { max: 10, message: 'Placa deve ter no máximo 10 caracteres' },
          ]}
        >
          <Input 
            placeholder="ABC-1234" 
            size="large"
            style={{ height: '40px' }}
          />
        </Form.Item>

        <Form.Item
          name="modelo"
          label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Modelo</span>}
          rules={[
            { required: true, message: 'Por favor, informe o modelo' },
            { max: 50, message: 'Modelo deve ter no máximo 50 caracteres' },
          ]}
        >
          <Input 
            placeholder="Honda Civic" 
            size="large"
            style={{ height: '40px' }}
          />
        </Form.Item>

        <Form.Item
          name="ano"
          label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Ano</span>}
          rules={[
            { required: true, message: 'Por favor, informe o ano' },
            { type: 'number', min: 1900, max: new Date().getFullYear() + 1, message: 'Ano inválido' },
          ]}
        >
          <InputNumber 
            style={{ width: '100%', height: '40px' }}
            size="large"
            placeholder="2023"
            min={1900}
            max={new Date().getFullYear() + 1}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Status</span>}
          rules={[{ required: true, message: 'Por favor, selecione o status' }]}
        >
          <Select 
            placeholder="Selecione o status"
            size="large"
            style={{ height: '40px' }}
          >
            {statusOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '12px',
        paddingTop: '24px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Button 
          onClick={onCancel}
          size="large"
          style={{ minWidth: '100px' }}
        >
          Cancelar
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          size="large"
          style={{ minWidth: '120px' }}
        >
          {car ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </Form>
  );
};

export default CarForm;