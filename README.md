# Sistema de Gestão de Carros - Full Stack

Este projeto é uma aplicação full-stack para gerenciamento de carros, construída com React (frontend) e Django (backend), orquestrada com Docker.

## 🏗️ Arquitetura

```
api_car/
├── frontend/                    # React + TypeScript + Ant Design
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── backend/                     # Django + MySQL
│   ├── api_car/
│   ├── app_car/
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml           # Orquestração de todos os serviços
└── README.md
```

## 🚀 Início Rápido

### Pré-requisitos
- **Docker Desktop** instalado e rodando
- **Git** para clonar o projeto
- Portas 3000, 8000 e 3306 disponíveis

### Comando Único (Recomendado)

```bash
# Clonar o projeto
git clone [URL_DO_REPOSITORIO]
cd api_car

# Executar o sistema
./start.sh
```

### Ou manualmente

```bash
cd api_car
docker-compose up --build
```

### Acesso ao Sistema

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin

### Desenvolvimento Local

#### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📋 Serviços

### 🗄️ Database (MySQL)

- **Container**: `mysql-db`
- **Porta**: 3306
- **Database**: `api_car_db`
- **Usuário**: `root`
- **Senha**: `cmzl2025`

### 🐍 Backend (Django)

- **Container**: `django-backend`
- **Porta**: 8000
- **Framework**: Django 5.2.1 + DRF 3.16.0
- **Features**:
  - API REST para CRUD de setores
  - CORS habilitado para frontend
  - Interface admin Django

### ⚛️ Frontend (React)

- **Container**: `react-frontend`
- **Porta**: 3000
- **Stack**: React 19 + TypeScript + Ant Design
- **Features**:
  - Interface responsiva
  - Componentes reutilizáveis
  - Integração completa com API

## 🔧 Comandos Úteis

### Docker

```bash
# Iniciar serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Reconstruir containers
docker-compose up --build

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f [service_name]

# Executar comando em container
docker-compose exec backend python manage.py migrate
docker-compose exec frontend npm install
```

### Django

```bash
# Migrations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Criar superusuário
docker-compose exec backend python manage.py createsuperuser

# Shell Django
docker-compose exec backend python manage.py shell
```

### React

```bash
# Instalar nova dependência
docker-compose exec frontend npm install [package]

# Build para produção
docker-compose exec frontend npm run build
```

## 📡 API Endpoints

### Setores (Cars)

- `GET /api/car/` - Listar todos os setores
- `POST /api/car/` - Criar novo setor
- `GET /api/car/{id}/` - Buscar setor por ID
- `PUT /api/car/{id}/` - Atualizar setor
- `DELETE /api/car/{id}/` - Deletar setor

### Estrutura de Dados

```json
{
  "id_veiculo": 1,
  "placa": "SETOR-01",
  "modelo": "Descrição do setor",
  "ano": 100,
  "status": "DISPONIVEL"
}
```

## 🛠️ Tecnologias

### Frontend

- React 19.1.0
- TypeScript
- Ant Design 5.26.3
- Vite 7.0.0
- Zustand (estado)
- Axios (HTTP)

### Backend

- Django 5.2.1
- Django REST Framework 3.16.0
- MySQL 8.0
- django-cors-headers

### DevOps

- Docker & Docker Compose
- Multi-stage builds
- Volume persistence
- Network isolation

## 🔒 Configurações de Segurança

### CORS

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Database

- Senhas via variáveis de ambiente
- Rede isolada entre containers
- Volumes persistentes

## 📊 Monitoramento

### Logs

```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Health Check

```bash
# Backend
curl http://localhost:8000/api/car/

# Frontend
curl http://localhost:3000
```

## 🚀 Deploy

### Produção

1. Ajustar variáveis de ambiente
2. Configurar HTTPS
3. Usar volumes externos para dados
4. Configurar backup automático

### Staging

```bash
# Usar docker-compose.staging.yml
docker-compose -f docker-compose.staging.yml up --build
```

## 🤝 Contribuição

1. Clone o repositório
2. Crie sua branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Add nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando Docker, React(vite), Django e MySQL**
