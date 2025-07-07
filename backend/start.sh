#!/bin/bash
set -e

echo "🚀 Iniciando Django Backend..."

# Espera o banco de dados ficar disponível
echo "⏳ Aguardando banco de dados..."
python wait-for-db.py

# Executa migrações
echo "🗃️ Executando migrações..."
python manage.py migrate

# Inicia o servidor
echo "🌐 Iniciando servidor Django..."
python manage.py runserver 0.0.0.0:8000