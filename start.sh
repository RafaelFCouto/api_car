#!/bin/bash

echo "Iniciando o Sistema de Carros..."
echo "Construindo e iniciando containers..."

# Para todos os containers se existirem
docker-compose down 2>/dev/null

# Constrói e inicia todos os serviços
docker-compose up --build -d

echo "Aguardando serviços iniciarem..."
sleep 10

echo "Sistema iniciado com sucesso!"
echo ""
echo "Acesse as seguintes URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   API Doc:  http://localhost:8000/api/docs/"
echo ""
echo "Para ver os logs:"
echo "   docker-compose logs -f"
echo ""
echo "Para parar:"
echo "   docker-compose down"