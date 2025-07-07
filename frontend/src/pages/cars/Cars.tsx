import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StandardPageLayout from "../../components/Layout/StandardPageLayout";
import StandardTable from "../../components/Table/StandardTable";
import { createEditAction, createDeleteAction } from "../../components/Table/tableActions";
import { useCarsTable } from "./hooks/useCarsTable";
import { useCarStore } from "../../store/carStore";
import type { Car } from "../../types";

const Cars: React.FC = () => {
  const navigate = useNavigate();
  const { columns, cars, loading } = useCarsTable();
  const { deleteCar } = useCarStore();
  const [searchValue, setSearchValue] = useState('');

  // Filtrar carros baseado na busca
  const filteredCars = useMemo(() => {
    if (!searchValue.trim()) return cars;
    
    return cars.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [cars, searchValue]);

  const createActionButtons = (record: Car) => [
    createEditAction(() => navigate(`/cars/edit/${record.id_veiculo}`)),
    createDeleteAction(
      async () => {
        if (record.id_veiculo) {
          await deleteCar(Number(record.id_veiculo));
        }
      },
      'Tem certeza que deseja excluir este carro?'
    ),
  ];

  return (
    <StandardPageLayout
      title="Carros"
      subtitle="Lista de carros já cadastrados"
      primaryAction={{
        key: 'create',
        label: 'Cadastrar Carro',
        onClick: () => navigate("/cars/register"),
      }}
      showSearch={true}
      searchPlaceholder="Buscar carro..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    >
      <StandardTable<Car>
        columns={columns}
        dataSource={filteredCars}
        loading={loading}
        actionButtons={createActionButtons}
        rowKey="id_veiculo"
      />
    </StandardPageLayout>
  );
};

export default Cars;