#!/bin/sh

sleep 20

echo "✅ MySQL pronto! Aplicando migrations..."
python manage.py migrate

echo "🚀 Iniciando servidor Django..."
python manage.py runserver 0.0.0.0:8000