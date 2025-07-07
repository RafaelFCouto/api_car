# 🎯 Frontend - Sistema de Gestão de Carros
## Documentação Completa para Defesa Acadêmica

---

## 📋 Sumário

1. [Conceitos Fundamentais Web](#-conceitos-fundamentais-web)
2. [Arquitetura do Sistema](#-arquitetura-do-sistema)
3. [Tecnologias e Frameworks](#-tecnologias-e-frameworks)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Componentes e Padrões](#-componentes-e-padrões)
6. [Gerenciamento de Estado](#-gerenciamento-de-estado)
7. [Comunicação HTTP e APIs](#-comunicação-http-e-apis)
8. [Roteamento e Navegação](#-roteamento-e-navegação)
9. [Interface e UX/UI](#-interface-e-uxui)
10. [Segurança Frontend](#-segurança-frontend)
11. [Performance e Otimização](#-performance-e-otimização)
12. [Testes e Qualidade](#-testes-e-qualidade)
13. [Build e Deploy](#-build-e-deploy)

---

## 🌐 Conceitos Fundamentais Web

### 1.1 URI, URL e URN

#### **URI (Uniform Resource Identifier)**
- **Definição**: Identificador único para recursos na web
- **Função**: Identifica um recurso de forma única
- **Sintaxe Geral**: `scheme:[//authority]path[?query][#fragment]`
- **Exemplo**: `https://api.exemplo.com/cars/123?status=active#details`

#### **URL (Uniform Resource Locator)**
- **Definição**: Subconjunto de URI que especifica a localização exata
- **Função**: Não apenas identifica, mas também localiza o recurso
- **Componentes Detalhados**:
  - **Scheme/Protocol**: `https://` (como acessar)
  - **Authority**: `api.exemplo.com` (onde está)
  - **Port**: `:443` (porta, implícita no HTTPS)
  - **Path**: `/cars/123` (caminho específico)
  - **Query String**: `?status=active&limit=10` (parâmetros)
  - **Fragment**: `#details` (seção específica)

#### **URN (Uniform Resource Name)**
- **Definição**: Identificador persistente independente de localização
- **Função**: Nome permanente que não muda mesmo se o recurso mudar de lugar
- **Exemplo**: `urn:isbn:978-0-13-235088-4` (ISBN de um livro)
- **Uso**: Bibliotecas digitais, sistemas acadêmicos

### 1.2 Protocolos de Rede

#### **HTTP (HyperText Transfer Protocol)**
- **Versões**: HTTP/1.1, HTTP/2, HTTP/3
- **Características**:
  - Stateless (sem estado)
  - Request-Response
  - Baseado em texto (HTTP/1.1)
  - Multiplexing (HTTP/2)

#### **HTTPS (HTTP Secure)**
- **Criptografia**: TLS/SSL
- **Porta Padrão**: 443
- **Benefícios**:
  - Confidencialidade dos dados
  - Integridade da informação
  - Autenticação do servidor
  - Melhhor ranking SEO

#### **WebSocket**
- **Uso**: Comunicação bidirecional em tempo real
- **Protocolo**: `ws://` ou `wss://` (seguro)
- **Aplicações**: Chat, notificações push, atualizações em tempo real

### 1.3 Métodos HTTP

| Método | Propósito | Idempotente | Seguro | Exemplo de Uso |
|--------|-----------|-------------|--------|----------------|
| GET | Recuperar dados | ✅ | ✅ | Listar carros |
| POST | Criar recurso | ❌ | ❌ | Cadastrar carro |
| PUT | Atualizar/Substituir | ✅ | ❌ | Editar carro completo |
| PATCH | Atualização parcial | ❌ | ❌ | Atualizar status |
| DELETE | Remover recurso | ✅ | ❌ | Excluir carro |
| HEAD | Metadata apenas | ✅ | ✅ | Verificar existência |
| OPTIONS | Métodos permitidos | ✅ | ✅ | CORS preflight |

### 1.4 Status Codes HTTP

#### **2xx - Sucesso**
- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Sucesso sem conteúdo de retorno

#### **3xx - Redirecionamento**
- `301 Moved Permanently`: Redirecionamento permanente
- `304 Not Modified`: Recurso não modificado (cache)

#### **4xx - Erro do Cliente**
- `400 Bad Request`: Requisição malformada
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Não autorizado
- `404 Not Found`: Recurso não encontrado
- `422 Unprocessable Entity`: Erro de validação

#### **5xx - Erro do Servidor**
- `500 Internal Server Error`: Erro interno
- `502 Bad Gateway`: Gateway inválido
- `503 Service Unavailable`: Serviço indisponível

---

## 🏗️ Arquitetura do Sistema

### 2.1 Arquitetura Cliente-Servidor

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   FRONTEND      │ ◄──────────────► │    BACKEND      │
│   (Cliente)     │                  │   (Servidor)    │
│                 │                  │                 │
│ • React 19      │                  │ • Django 5.2    │
│ • TypeScript    │                  │ • DRF 3.16      │
│ • Ant Design    │                  │ • MySQL 8.0     │
│ • Zustand       │                  │ • Docker        │
└─────────────────┘                  └─────────────────┘
```

### 2.2 Arquitetura de Camadas Frontend

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                   │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│  │   Components    │ │     Pages       │ │   Layout    │ │
│  │  (UI Elements)  │ │  (Routes/Views) │ │ (Structure) │ │
│  └─────────────────┘ └─────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                     BUSINESS LAYER                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│  │     Hooks       │ │     Stores      │ │  Utilities  │ │
│  │  (Logic/State)  │ │ (Global State)  │ │  (Helpers)  │ │
│  └─────────────────┘ └─────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│  │    Services     │ │      Types      │ │    Utils    │ │
│  │  (API Calls)    │ │ (TypeScript)    │ │ (Validators)│ │
│  └─────────────────┘ └─────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Padrão SPA (Single Page Application)

**Características**:
- Uma única página HTML carregada inicialmente
- Navegação através de JavaScript
- Atualizações dinâmicas do DOM
- Melhor experiência do usuário
- Menos requisições ao servidor

**Vantagens**:
- Performance superior após carregamento inicial
- Interações mais fluidas
- Capacidade offline
- Melhor UX para aplicações complexas

**Desvantagens**:
- Carregamento inicial mais lento
- SEO mais complexo
- Maior complexidade de desenvolvimento
- Problemas de acessibilidade se mal implementado

---

## 🛠️ Tecnologias e Frameworks

### 3.1 React 19.1.0

#### **Conceitos Fundamentais**

**Virtual DOM**:
```javascript
// Conceito: React mantém uma representação virtual do DOM
// Quando o estado muda, React:
// 1. Cria novo Virtual DOM
// 2. Compara com o anterior (Diffing)
// 3. Atualiza apenas as diferenças no DOM real (Reconciliation)

const VirtualDOMExample = () => {
  const [count, setCount] = useState(0);
  
  // Quando count muda, React atualiza apenas o texto do span
  return <span>Contador: {count}</span>;
};
```

**JSX (JavaScript XML)**:
```jsx
// JSX é transformado em chamadas React.createElement
// JSX:
const element = <h1 className="greeting">Olá, mundo!</h1>;

// Transpilado para:
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Olá, mundo!'
);
```

**Component Lifecycle (Functional Components)**:
```jsx
const CarComponent = () => {
  // 1. Mounting (Montagem)
  useEffect(() => {
    console.log('Componente montado');
    return () => {
      // 3. Unmounting (Desmontagem)
      console.log('Componente desmontado');
    };
  }, []);

  // 2. Updating (Atualização)
  useEffect(() => {
    console.log('Componente atualizado');
  });

  return <div>Carro</div>;
};
```

**Hooks Fundamentais**:

```jsx
// useState - Gerenciamento de estado local
const [cars, setCars] = useState([]);

// useEffect - Efeitos colaterais
useEffect(() => {
  fetchCars();
}, []);

// useMemo - Memoização de valores
const expensiveCalculation = useMemo(() => {
  return cars.filter(car => car.status === 'DISPONIVEL').length;
}, [cars]);

// useCallback - Memoização de funções
const handleCarDelete = useCallback((id) => {
  deleteCar(id);
}, [deleteCar]);

// useRef - Referência a elementos DOM
const inputRef = useRef(null);
```

#### **Novidades React 19**

**Server Components**:
- Renderização no servidor
- Melhor performance inicial
- Redução do bundle JavaScript

**Concurrent Features**:
- Rendering interruptível
- Priorização de atualizações
- Melhor responsividade

### 3.2 TypeScript

#### **Sistema de Tipos**

```typescript
// Tipos Primitivos
const id: number = 123;
const name: string = "Carro";
const isActive: boolean = true;

// Tipos de Objetos
interface Car {
  id_veiculo: number;
  placa: string;
  modelo: string;
  ano: number;
  status: CarStatus;
}

// Union Types
type CarStatus = 
  | 'DISPONIVEL'
  | 'ALUGADO'
  | 'EM_MANUTENCAO'
  | 'RESERVADO'
  | 'INDISPONIVEL'
  | 'FORA_DE_CIRCULACAO';

// Generic Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Utility Types
type CarFormData = Omit<Car, 'id_veiculo'>;
type PartialCar = Partial<Car>;
type RequiredCar = Required<Car>;
```

#### **Benefícios do TypeScript**

1. **Type Safety**: Prevenção de erros em tempo de compilação
2. **IntelliSense**: Melhor experiência de desenvolvimento
3. **Refactoring**: Mudanças seguras no código
4. **Documentation**: Tipos servem como documentação
5. **Team Collaboration**: Contratos claros entre desenvolvedores

### 3.3 Vite 7.0.0

#### **Características**

**Desenvolvimento Rápido**:
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hot: true, // Hot Module Replacement
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
        },
      },
    },
  },
});
```

**ES Modules Nativo**:
- Importações diretas no navegador
- Sem bundling em desenvolvimento
- Startup extremamente rápido

**Hot Module Replacement (HMR)**:
- Atualizações instantâneas
- Preservação do estado
- Melhor DX (Developer Experience)

### 3.4 Ant Design 5.26.3

#### **Design System**

**Princípios de Design**:
1. **Natural**: Interações intuitivas
2. **Certain**: Feedback claro
3. **Meaningful**: Propósito definido
4. **Growing**: Evolutivo

**Componentes Utilizados no Projeto**:

```jsx
// Layout Components
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;

// Data Display
import { Table, Card, Statistic, Tag } from 'antd';

// Data Entry
import { Form, Input, Select, Button, DatePicker } from 'antd';

// Feedback
import { Modal, message, notification, Spin } from 'antd';

// Navigation
import { Pagination, Steps } from 'antd';
```

**Theming e Customização**:
```typescript
// theme.config.ts
export const theme = {
  token: {
    colorPrimary: '#004281', // Azul corporativo
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    borderRadius: 6,
  },
  algorithm: theme.defaultAlgorithm,
};
```

---

## 📁 Estrutura do Projeto

### 4.1 Organização de Diretórios

```
frontend/
├── public/                     # Arquivos estáticos
│   ├── vite.svg               # Favicon
│   └── index.html             # HTML template
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Table/            # Componentes de tabela
│   │   │   ├── index.ts      # Barrel exports
│   │   │   ├── TableActions.tsx
│   │   │   └── tableActions.tsx
│   │   └── UI/               # Componentes de interface
│   ├── layout/               # Componentes de layout
│   │   ├── AppLayout.tsx     # Layout principal
│   │   ├── AppLayout.css     # Estilos do layout
│   │   └── StandardPageLayout.tsx
│   ├── pages/                # Páginas da aplicação
│   │   ├── cars/             # Módulo de carros
│   │   │   ├── Cars.tsx      # Listagem
│   │   │   ├── hooks/        # Hooks específicos
│   │   │   │   └── useCarsTable.tsx
│   │   │   └── index.ts      # Exports
│   │   ├── CarRegister.tsx   # Cadastro
│   │   └── CarEdit.tsx       # Edição
│   ├── services/             # Camada de serviços
│   │   └── api.ts           # Cliente HTTP
│   ├── store/               # Gerenciamento de estado
│   │   └── carStore.ts      # Store de carros
│   ├── types/               # Definições TypeScript
│   │   └── index.ts         # Tipos globais
│   ├── utils/               # Utilitários
│   │   └── constants.ts     # Constantes
│   ├── App.tsx              # Componente raiz
│   ├── App.css              # Estilos globais
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Tipos do Vite
├── package.json             # Dependências
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── Dockerfile              # Container Docker
```

### 4.2 Padrões de Nomenclatura

**Arquivos e Diretórios**:
- **PascalCase**: Componentes React (`CarForm.tsx`)
- **camelCase**: Hooks, funções (`useCarsTable.tsx`)
- **kebab-case**: Assets, CSS (`app-layout.css`)
- **lowercase**: Diretórios (`components/`, `services/`)

**Variáveis e Funções**:
```typescript
// camelCase para variáveis e funções
const carData = {...};
const handleSubmit = () => {...};

// PascalCase para componentes e tipos
const CarComponent = () => {...};
interface CarFormData {...}

// SCREAMING_SNAKE_CASE para constantes
const API_BASE_URL = 'http://localhost:8000';
const CAR_STATUS_OPTIONS = [...];
```

### 4.3 Barrel Exports

```typescript
// components/index.ts
export { default as CarForm } from './CarForm';
export { default as CarTable } from './CarTable';
export { default as Layout } from './Layout';

// Usage
import { CarForm, CarTable } from '../components';
```

---

## 🧩 Componentes e Padrões

### 5.1 Anatomia de um Componente React

```tsx
import React, { useState, useEffect, memo } from 'react';
import { Card, Button } from 'antd';
import type { Car } from '../types';

// Props Interface
interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
  className?: string;
}

// Component Implementation
const CarCard: React.FC<CarCardProps> = memo(({ 
  car, 
  onEdit, 
  onDelete,
  className 
}) => {
  // Local State
  const [isHovered, setIsHovered] = useState(false);

  // Side Effects
  useEffect(() => {
    console.log('CarCard mounted for:', car.placa);
  }, [car.placa]);

  // Event Handlers
  const handleEditClick = () => {
    onEdit(car);
  };

  const handleDeleteClick = () => {
    onDelete(car.id_veiculo);
  };

  // Render
  return (
    <Card
      className={className}
      title={car.placa}
      extra={
        <div>
          <Button onClick={handleEditClick}>Editar</Button>
          <Button danger onClick={handleDeleteClick}>
            Excluir
          </Button>
        </div>
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s',
      }}
    >
      <p><strong>Modelo:</strong> {car.modelo}</p>
      <p><strong>Ano:</strong> {car.ano}</p>
      <p><strong>Status:</strong> {car.status}</p>
    </Card>
  );
});

// Display Name (for debugging)
CarCard.displayName = 'CarCard';

export default CarCard;
```

### 5.2 Padrões de Componentes

#### **Presentational vs Container Components**

```tsx
// Presentational Component (Stateless)
interface CarListProps {
  cars: Car[];
  loading: boolean;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
}

const CarList: React.FC<CarListProps> = ({ 
  cars, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  if (loading) return <Spin size="large" />;
  
  return (
    <div>
      {cars.map(car => (
        <CarCard 
          key={car.id_veiculo}
          car={car}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

// Container Component (Stateful)
const CarListContainer: React.FC = () => {
  const { cars, loading, updateCar, deleteCar } = useCarStore();

  return (
    <CarList
      cars={cars}
      loading={loading}
      onEdit={updateCar}
      onDelete={deleteCar}
    />
  );
};
```

#### **Higher-Order Components (HOC)**

```tsx
// HOC para loading
function withLoading<T extends object>(
  Component: React.ComponentType<T>
) {
  return (props: T & { loading?: boolean }) => {
    if (props.loading) {
      return <Spin size="large" />;
    }
    return <Component {...props} />;
  };
}

// Usage
const CarFormWithLoading = withLoading(CarForm);
```

#### **Render Props Pattern**

```tsx
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<Car[]> url="/api/cars">
  {(cars, loading, error) => {
    if (loading) return <Spin />;
    if (error) return <div>Erro: {error.message}</div>;
    return <CarList cars={cars || []} />;
  }}
</DataFetcher>
```

### 5.3 Custom Hooks

```tsx
// useLocalStorage Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// useDebounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// useApi Hook
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

---

## 🗄️ Gerenciamento de Estado

### 6.1 Zustand Store Architecture

```typescript
// store/carStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Car, CarFormData } from '../types';
import { carService } from '../services/api';
import { toast } from 'react-toastify';

// Store Interface
interface CarStore {
  // State
  cars: Car[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCars: () => Promise<void>;
  addCar: (data: CarFormData) => Promise<void>;
  updateCar: (id: number, data: CarFormData) => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Store Implementation
export const useCarStore = create<CarStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        cars: [],
        loading: false,
        error: null,

        // Async Actions
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
            toast.success('Carro cadastrado com sucesso!');
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
            toast.success('Carro atualizado com sucesso!');
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
            toast.success('Carro excluído com sucesso!');
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

        // Sync Actions
        setError: (error: string | null) => set({ error }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'car-storage', // LocalStorage key
        partialize: (state) => ({ cars: state.cars }), // Only persist cars
      }
    ),
    { name: 'CarStore' } // DevTools name
  )
);
```

### 6.2 Estado Local vs Global

#### **Quando usar Estado Local (useState)**
- Estado específico do componente
- Dados temporários (formulários)
- Estados de UI (modais, loading local)

```tsx
const CarForm = () => {
  const [formData, setFormData] = useState<CarFormData>({
    placa: '',
    modelo: '',
    ano: new Date().getFullYear(),
    status: 'DISPONIVEL'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
};
```

#### **Quando usar Estado Global (Zustand)**
- Dados compartilhados entre componentes
- Estado da aplicação
- Cache de dados da API

```tsx
const CarList = () => {
  const { cars, loading, fetchCars } = useCarStore();
  
  useEffect(() => {
    fetchCars();
  }, []);
};
```

### 6.3 Padrões de Gerenciamento de Estado

#### **Flux/Redux Pattern (aplicado no Zustand)**

```
┌─────────────┐    Action    ┌─────────────┐    Update    ┌─────────────┐
│    View     │─────────────▶│    Store    │─────────────▶│    State    │
│             │              │             │              │             │
└─────────────┘              └─────────────┘              └─────────────┘
       ▲                                                          │
       │                                                          │
       └──────────────────────── Re-render ◄─────────────────────┘
```

#### **Immer para Imutabilidade**

```typescript
import { produce } from 'immer';

// Sem Immer (manual)
const updateCarManual = (cars: Car[], id: number, updates: Partial<Car>) => {
  return cars.map(car => 
    car.id_veiculo === id 
      ? { ...car, ...updates }
      : car
  );
};

// Com Immer (mais legível)
const updateCarWithImmer = (cars: Car[], id: number, updates: Partial<Car>) => {
  return produce(cars, draft => {
    const car = draft.find(c => c.id_veiculo === id);
    if (car) {
      Object.assign(car, updates);
    }
  });
};
```

---

## 🌐 Comunicação HTTP e APIs

### 7.1 Cliente HTTP (Axios)

```typescript
// services/api.ts
import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';

// Base Configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Handle global errors
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 500) {
      // Show global error message
      console.error('Server Error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Service Functions
export const carService = {
  // GET /api/car/
  getAll: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>('/car/');
    return response.data;
  },

  // GET /api/car/{id}/
  getById: async (id: number): Promise<Car> => {
    const response = await api.get<Car>(`/car/${id}/`);
    return response.data;
  },

  // POST /api/car/
  create: async (data: CarFormData): Promise<Car> => {
    const response = await api.post<Car>('/car/', data);
    return response.data;
  },

  // PUT /api/car/{id}/
  update: async (id: number, data: CarFormData): Promise<Car> => {
    const response = await api.put<Car>(`/car/${id}/`, data);
    return response.data;
  },

  // DELETE /api/car/{id}/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/car/${id}/`);
  },

  // GET /api/car/?search={query}
  search: async (query: string): Promise<Car[]> => {
    const response = await api.get<Car[]>('/car/', {
      params: { search: query }
    });
    return response.data;
  },
};

export default api;
```

### 7.2 Error Handling

```typescript
// types/api.ts
interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

// utils/errorHandler.ts
export const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data?.message || 'Dados inválidos';
      case 401:
        return 'Não autorizado';
      case 403:
        return 'Acesso negado';
      case 404:
        return 'Recurso não encontrado';
      case 422:
        return 'Dados de validação inválidos';
      case 500:
        return 'Erro interno do servidor';
      default:
        return data?.message || 'Erro desconhecido';
    }
  } else if (error.request) {
    // Network error
    return 'Erro de conexão. Verifique sua internet.';
  } else {
    // Other error
    return error.message || 'Erro inesperado';
  }
};

// Hook for API calls
export const useApiCall = <T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err as AxiosError);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
};
```

### 7.3 Caching e Performance

```typescript
// utils/cache.ts
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

export const apiCache = new ApiCache();

// Enhanced service with caching
export const carServiceWithCache = {
  getAll: async (useCache: boolean = true): Promise<Car[]> => {
    const cacheKey = 'cars:all';
    
    if (useCache) {
      const cached = apiCache.get<Car[]>(cacheKey);
      if (cached) return cached;
    }
    
    const data = await carService.getAll();
    apiCache.set(cacheKey, data, 2 * 60 * 1000); // 2 minutes
    return data;
  },

  create: async (data: CarFormData): Promise<Car> => {
    const result = await carService.create(data);
    // Invalidate cache after mutation
    apiCache.delete('cars:all');
    return result;
  },
};
```

### 7.4 Retry e Circuit Breaker

```typescript
// utils/retry.ts
interface RetryOptions {
  maxRetries: number;
  delay: number;
  backoff?: boolean;
}

export const withRetry = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: RetryOptions = { maxRetries: 3, delay: 1000 }
) => {
  return async (...args: T): Promise<R> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === options.maxRetries) {
          break;
        }
        
        const delay = options.backoff 
          ? options.delay * Math.pow(2, attempt)
          : options.delay;
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  };
};

// Circuit Breaker Pattern
class CircuitBreaker {
  private failures = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private nextAttempt = Date.now();

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure(): void {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// Usage
const circuitBreaker = new CircuitBreaker(3, 30000);

export const resilientCarService = {
  getAll: () => circuitBreaker.execute(() => 
    withRetry(carService.getAll, { maxRetries: 2, delay: 500 })()
  ),
};
```

---

## 🧭 Roteamento e Navegação

### 8.1 React Router DOM 7.6.3

```tsx
// App.tsx
import { 
  createBrowserRouter, 
  RouterProvider, 
  Outlet,
  Navigate 
} from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { Cars } from './pages/cars';
import { CarRegister } from './pages/CarRegister';
import { CarEdit } from './pages/CarEdit';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense } from 'react';

// Lazy Loading Components
const LazyCarAnalytics = lazy(() => import('./pages/CarAnalytics'));

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/cars" replace />,
      },
      {
        path: 'cars',
        children: [
          {
            index: true,
            element: <Cars />,
          },
          {
            path: 'register',
            element: <CarRegister />,
          },
          {
            path: 'edit/:id',
            element: <CarEdit />,
            loader: async ({ params }) => {
              // Data loading before component renders
              const car = await carService.getById(Number(params.id));
              return { car };
            },
          },
          {
            path: 'analytics',
            element: (
              <Suspense fallback={<div>Carregando...</div>}>
                <LazyCarAnalytics />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <div>Página não encontrada</div>,
      },
    ],
  },
]);

// App Component
const App = () => {
  return <RouterProvider router={router} />;
};
```

### 8.2 Navegação Programática

```tsx
// hooks/useNavigation.ts
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const goToCars = () => navigate('/cars');
  const goToCarRegister = () => navigate('/cars/register');
  const goToCarEdit = (id: number) => navigate(`/cars/edit/${id}`);
  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  const isCurrentPath = (path: string) => location.pathname === path;
  const getCurrentCarId = () => params.id ? Number(params.id) : null;

  return {
    navigate,
    location,
    params,
    goToCars,
    goToCarRegister,
    goToCarEdit,
    goBack,
    goHome,
    isCurrentPath,
    getCurrentCarId,
  };
};

// Component Usage
const CarActions = ({ carId }: { carId: number }) => {
  const { goToCarEdit, goToCars } = useNavigation();

  return (
    <div>
      <Button onClick={() => goToCarEdit(carId)}>
        Editar
      </Button>
      <Button onClick={goToCars}>
        Voltar à Lista
      </Button>
    </div>
  );
};
```

### 8.3 Route Guards e Proteção

```tsx
// components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  fallback = <Navigate to="/login" />
}) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <div>Acesso negado</div>;
  }

  return <>{children}</>;
};

// Router with Protection
const protectedRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'cars/register',
        element: (
          <ProtectedRoute requiredPermission="cars:create">
            <CarRegister />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
```

### 8.4 Breadcrumbs Dinâmicos

```tsx
// hooks/useBreadcrumbs.ts
interface BreadcrumbItem {
  title: string;
  path?: string;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Início', path: '/' }];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let title = segment;
      let path = currentPath;

      // Custom titles based on route
      switch (segment) {
        case 'cars':
          title = 'Carros';
          break;
        case 'register':
          title = 'Cadastrar';
          path = undefined; // Current page, no link
          break;
        case 'edit':
          title = 'Editar';
          path = undefined;
          break;
        default:
          // Check if it's an ID
          if (/^\d+$/.test(segment)) {
            title = `#${segment}`;
            path = undefined;
          }
      }

      breadcrumbs.push({ title, path });
    });

    return breadcrumbs;
  }, [location.pathname, params]);
};

// Component
const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();

  return (
    <Breadcrumb>
      {breadcrumbs.map((crumb, index) => (
        <Breadcrumb.Item key={index}>
          {crumb.path ? (
            <a onClick={() => navigate(crumb.path!)}>
              {crumb.title}
            </a>
          ) : (
            crumb.title
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
```

---

## 🎨 Interface e UX/UI

### 9.1 Design System e Tokens

```typescript
// theme/tokens.ts
export const tokens = {
  // Colors
  colors: {
    primary: {
      50: '#e6f4ff',
      100: '#bae7ff',
      500: '#004281', // Main brand color
      900: '#002849',
    },
    semantic: {
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#1677ff',
    },
    neutral: {
      white: '#ffffff',
      gray50: '#f0f2f5',
      gray100: '#e8eaed',
      gray500: '#8c8c8c',
      gray900: '#262626',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  // Borders
  borders: {
    radius: {
      sm: '4px',
      base: '6px',
      lg: '8px',
      full: '9999px',
    },
    width: {
      thin: '1px',
      base: '2px',
      thick: '4px',
    },
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // Breakpoints
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px',
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};
```

### 9.2 Responsive Design

```css
/* styles/responsive.css */

/* Mobile First Approach */
.container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

/* Small devices (576px and up) */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  .sidebar {
    display: block;
  }
  
  .mobile-menu {
    display: none;
  }
}

/* Large devices (992px and up) */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }
}

/* Extra large devices (1200px and up) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

```tsx
// hooks/useResponsive.ts
import { useState, useEffect } from 'react';

interface BreakpointValues {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export const useResponsive = (): BreakpointValues => {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        sm: width >= 576,
        md: width >= 768,
        lg: width >= 992,
        xl: width >= 1200,
      });
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
};

// Component Usage
const ResponsiveCarGrid = () => {
  const { md, lg } = useResponsive();
  
  const columns = lg ? 4 : md ? 3 : 1;
  
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
      }}
    >
      {cars.map(car => (
        <CarCard key={car.id_veiculo} car={car} />
      ))}
    </div>
  );
};
```

### 9.3 Acessibilidade (a11y)

```tsx
// components/AccessibleButton.tsx
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  variant = 'primary',
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`btn btn--${variant}`}
      type="button"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
};

// Accessible Form
const AccessibleCarForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form role="form" aria-labelledby="form-title">
      <h2 id="form-title">Cadastro de Carro</h2>
      
      <div className="form-group">
        <label htmlFor="placa" className="required">
          Placa do Veículo
        </label>
        <input
          id="placa"
          name="placa"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.placa}
          aria-describedby={errors.placa ? "placa-error" : undefined}
        />
        {errors.placa && (
          <div id="placa-error" role="alert" className="error-message">
            {errors.placa}
          </div>
        )}
      </div>
      
      <button type="submit" aria-describedby="submit-help">
        Cadastrar Carro
      </button>
      <div id="submit-help" className="help-text">
        Pressione Enter ou clique para cadastrar o carro
      </div>
    </form>
  );
};

// Skip Navigation
const SkipNavigation = () => (
  <a 
    href="#main-content" 
    className="skip-nav"
    onFocus={(e) => e.target.style.display = 'block'}
    onBlur={(e) => e.target.style.display = 'none'}
  >
    Pular para conteúdo principal
  </a>
);
```

### 9.4 Microinterações e Animações

```css
/* animations.css */

/* Loading Animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Slide In */
@keyframes slideInFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.slide-in-right {
  animation: slideInFromRight 0.3s ease-out;
}

/* Hover Effects */
.card {
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Button Interactions */
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.btn:active::before {
  width: 300px;
  height: 300px;
}
```

```tsx
// hooks/useAnimations.ts
import { useSpring, animated } from '@react-spring/web';

export const useFadeIn = (trigger: boolean) => {
  return useSpring({
    opacity: trigger ? 1 : 0,
    transform: trigger ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 },
  });
};

export const useSlideIn = (trigger: boolean) => {
  return useSpring({
    transform: trigger ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 220, friction: 20 },
  });
};

// Animated Components
const AnimatedCarCard = ({ car, visible }: { car: Car; visible: boolean }) => {
  const fadeStyle = useFadeIn(visible);
  
  return (
    <animated.div style={fadeStyle}>
      <CarCard car={car} />
    </animated.div>
  );
};

const AnimatedModal = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  const backdropStyle = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { duration: 200 },
  });
  
  const modalStyle = useSpring({
    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  return (
    <animated.div style={backdropStyle} className="modal-backdrop">
      <animated.div style={modalStyle} className="modal-content">
        {children}
      </animated.div>
    </animated.div>
  );
};
```

---

## 🔒 Segurança Frontend

### 10.1 Validação de Entrada

```typescript
// utils/validation.ts
import { z } from 'zod';

// Schema Definitions
export const carSchema = z.object({
  placa: z
    .string()
    .min(1, 'Placa é obrigatória')
    .max(10, 'Placa deve ter no máximo 10 caracteres')
    .regex(/^[A-Z]{3}-?[0-9]{4}$/, 'Formato de placa inválido'),
  
  modelo: z
    .string()
    .min(1, 'Modelo é obrigatório')
    .max(100, 'Modelo deve ter no máximo 100 caracteres')
    .trim(),
  
  ano: z
    .number()
    .int('Ano deve ser um número inteiro')
    .min(1900, 'Ano deve ser maior que 1900')
    .max(new Date().getFullYear() + 1, 'Ano não pode ser futuro'),
  
  status: z.enum([
    'DISPONIVEL',
    'ALUGADO',
    'EM_MANUTENCAO',
    'RESERVADO',
    'INDISPONIVEL',
    'FORA_DE_CIRCULACAO'
  ]),
});

export type CarFormData = z.infer<typeof carSchema>;

// Validation Hook
export const useFormValidation = <T>(schema: z.ZodSchema<T>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: unknown): data is T => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errorMap[err.path.join('.')] = err.message;
          }
        });
        setErrors(errorMap);
      }
      return false;
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field];
  };

  const hasErrors = (): boolean => {
    return Object.keys(errors).length > 0;
  };

  return { validate, getFieldError, hasErrors, errors };
};
```

### 10.2 Sanitização de Dados

```typescript
// utils/sanitization.ts
import DOMPurify from 'dompurify';

// HTML Sanitization
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
};

// Input Sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// SQL Injection Prevention (for query parameters)
export const sanitizeQueryParam = (param: string): string => {
  return param
    .replace(/['"\\;]/g, '') // Remove quotes and semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multiline comments start
    .replace(/\*\//g, ''); // Remove multiline comments end
};

// XSS Prevention
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Custom Input Component with Sanitization
const SafeInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
}> = ({ value, onChange, type = 'text' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    onChange(sanitized);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      maxLength={type === 'email' ? 254 : 255} // Prevent DoS
    />
  );
};
```

### 10.3 Autenticação e Autorização

```typescript
// context/AuthContext.tsx
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const { user, token } = response.data;
      
      // Store token securely
      localStorage.setItem('authToken', token);
      setUser(user);
    } catch (error) {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) || false;
  };

  const isAuthenticated = !!user;

  // Token validation on app start
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authService.validateToken(token)
        .then(setUser)
        .catch(() => localStorage.removeItem('authToken'));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      hasPermission,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 10.4 Content Security Policy (CSP)

```typescript
// utils/security.ts

// CSP Header Configuration
export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Only for development
    'https://apis.google.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Ant Design
    'https://fonts.googleapis.com',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
  ],
  'connect-src': [
    "'self'",
    process.env.REACT_APP_API_URL || 'http://localhost:8000',
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
};

// Generate CSP string
export const generateCSP = (): string => {
  return Object.entries(cspConfig)
    .map(([directive, sources]) => {
      const sourceList = sources.join(' ');
      return sourceList ? `${directive} ${sourceList}` : directive;
    })
    .join('; ');
};

// Secure Headers for Development
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
```

---

## ⚡ Performance e Otimização

### 11.1 Bundle Analysis e Code Splitting

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'antd-vendor': ['antd'],
          'router-vendor': ['react-router-dom'],
          
          // Feature chunks
          'car-pages': [
            './src/pages/cars/Cars.tsx',
            './src/pages/CarRegister.tsx',
            './src/pages/CarEdit.tsx',
          ],
          
          // Utility chunks
          'utils': [
            './src/utils/constants.ts',
            './src/utils/validation.ts',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd'],
  },
});

// Dynamic Imports for Lazy Loading
const LazyCarAnalytics = lazy(() => 
  import('./pages/CarAnalytics').then(module => ({
    default: module.CarAnalytics
  }))
);

const LazyReports = lazy(() => 
  import('./pages/Reports')
);

// Route-based Code Splitting
const router = createBrowserRouter([
  {
    path: '/analytics',
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <LazyCarAnalytics />
      </Suspense>
    ),
  },
  {
    path: '/reports',
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <LazyReports />
      </Suspense>
    ),
  },
]);
```

### 11.2 Memoização e Otimizações React

```tsx
// components/OptimizedCarList.tsx
import { memo, useMemo, useCallback } from 'react';

interface CarListProps {
  cars: Car[];
  searchTerm: string;
  sortBy: 'placa' | 'modelo' | 'ano';
  onCarEdit: (car: Car) => void;
  onCarDelete: (id: number) => void;
}

// Memoized Car Item
const CarItem = memo<{
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
}>(({ car, onEdit, onDelete }) => {
  // Memoize event handlers to prevent re-renders
  const handleEdit = useCallback(() => {
    onEdit(car);
  }, [car, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(car.id_veiculo);
  }, [car.id_veiculo, onDelete]);

  return (
    <Card
      title={car.placa}
      extra={
        <Space>
          <Button onClick={handleEdit}>Editar</Button>
          <Button danger onClick={handleDelete}>Excluir</Button>
        </Space>
      }
    >
      <p>Modelo: {car.modelo}</p>
      <p>Ano: {car.ano}</p>
      <p>Status: {car.status}</p>
    </Card>
  );
});

// Optimized List Component
const OptimizedCarList: React.FC<CarListProps> = memo(({
  cars,
  searchTerm,
  sortBy,
  onCarEdit,
  onCarDelete,
}) => {
  // Memoize filtered and sorted data
  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars;

    // Filter by search term
    if (searchTerm) {
      filtered = cars.filter(car =>
        car.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by selected field
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'placa':
          return a.placa.localeCompare(b.placa);
        case 'modelo':
          return a.modelo.localeCompare(b.modelo);
        case 'ano':
          return b.ano - a.ano; // Descending
        default:
          return 0;
      }
    });
  }, [cars, searchTerm, sortBy]);

  // Memoize event handlers
  const handleCarEdit = useCallback((car: Car) => {
    onCarEdit(car);
  }, [onCarEdit]);

  const handleCarDelete = useCallback((id: number) => {
    onCarDelete(id);
  }, [onCarDelete]);

  return (
    <div className="car-list">
      {filteredAndSortedCars.map(car => (
        <CarItem
          key={car.id_veiculo}
          car={car}
          onEdit={handleCarEdit}
          onDelete={handleCarDelete}
        />
      ))}
    </div>
  );
});
```

### 11.3 Virtualização para Listas Grandes

```tsx
// components/VirtualizedCarTable.tsx
import { FixedSizeList as List } from 'react-window';

interface VirtualizedCarTableProps {
  cars: Car[];
  height: number;
  itemHeight: number;
}

const CarRow: React.FC<{
  index: number;
  style: React.CSSProperties;
  data: Car[];
}> = ({ index, style, data }) => {
  const car = data[index];

  return (
    <div style={style} className="car-row">
      <div className="car-cell">{car.placa}</div>
      <div className="car-cell">{car.modelo}</div>
      <div className="car-cell">{car.ano}</div>
      <div className="car-cell">{car.status}</div>
    </div>
  );
};

const VirtualizedCarTable: React.FC<VirtualizedCarTableProps> = ({
  cars,
  height,
  itemHeight,
}) => {
  return (
    <div className="virtualized-table">
      <div className="table-header">
        <div className="header-cell">Placa</div>
        <div className="header-cell">Modelo</div>
        <div className="header-cell">Ano</div>
        <div className="header-cell">Status</div>
      </div>
      
      <List
        height={height}
        itemCount={cars.length}
        itemSize={itemHeight}
        itemData={cars}
      >
        {CarRow}
      </List>
    </div>
  );
};

// Usage for large datasets
const LargeCarList = () => {
  const { cars } = useCarStore();

  // Only virtualize if we have many items
  if (cars.length > 100) {
    return (
      <VirtualizedCarTable
        cars={cars}
        height={600}
        itemHeight={60}
      />
    );
  }

  return <RegularCarTable cars={cars} />;
};
```

### 11.4 Image Optimization e Lazy Loading

```tsx
// components/LazyImage.tsx
import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+',
  className = '',
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load actual image when in view
  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        onError?.();
      };
      img.src = src;
    }
  }, [isInView, isLoaded, src, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        transition: 'opacity 0.3s ease',
        opacity: isLoaded ? 1 : 0.7,
      }}
    />
  );
};

// CSS for smooth loading
// .lazy-image.loading {
//   filter: blur(2px);
// }
// 
// .lazy-image.loaded {
//   filter: none;
// }
```

### 11.5 Service Worker e Caching

```typescript
// public/sw.js
const CACHE_NAME = 'car-management-v1';
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache First for static assets
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
    return;
  }

  // Network First for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(request);
        })
    );
    return;
  }

  // Stale While Revalidate for other requests
  event.respondWith(
    caches.match(request).then(response => {
      const fetchPromise = fetch(request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse.clone());
        });
        return networkResponse;
      });

      return response || fetchPromise;
    })
  );
});

// Service Worker Registration
// src/serviceWorkerRegistration.ts
export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};
```

---

Este documento fornece uma base sólida e completa para sua defesa acadêmica, cobrindo todos os aspectos técnicos e conceituais do desenvolvimento frontend moderno. Continue estudando cada seção para dominar completamente os conceitos apresentados.