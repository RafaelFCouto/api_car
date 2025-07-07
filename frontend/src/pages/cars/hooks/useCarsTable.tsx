import { useEffect, useState } from "react";
import { message } from "antd";
import type { SortOrder } from "antd/es/table/interface";
import { useCarStore } from "../../../store/carStore";
import type { Car } from "../../../types";

export const useCarsTable = () => {
  const { cars, fetchCars } = useCarStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarsFromAPI = async () => {
      try {
        setLoading(true);
        await fetchCars();
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        message.error("Erro ao carregar carros!");
      } finally {
        setLoading(false);
      }
    };

    fetchCarsFromAPI();
  }, [fetchCars]);

  // Definição das colunas da tabela
  const columns = [
    {
      title: "Placa",
      dataIndex: "placa",
      key: "placa",
      sorter: (a: Car, b: Car) => a.placa.localeCompare(b.placa),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text: string | undefined) => <strong>{text ?? "Sem placa"}</strong>,
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
      render: (text: string | undefined) => <span>{text ?? "Sem modelo"}</span>,
    },
    {
      title: "Ano",
      dataIndex: "ano",
      key: "ano",
      render: (text: number | undefined) => <span>{text ?? "Sem ano"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: number | undefined) => <span>{text ?? "Sem ano"}</span>,
    },
  ];

  return { columns, cars, loading };
};