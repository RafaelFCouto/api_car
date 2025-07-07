#!/usr/bin/env python3
import os
import time
import MySQLdb
from MySQLdb import OperationalError

def wait_for_db():
    """Espera o banco de dados ficar disponível"""
    db_settings = {
        'host': os.getenv('DB_HOST', 'db'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', 'cmzl2025'),
        'database': os.getenv('DB_NAME', 'api_car_db'),
        'port': int(os.getenv('DB_PORT', '3306'))
    }
    
    max_retries = 30
    retry_count = 0
    
    print("Aguardando banco de dados ficar disponível...")
    
    while retry_count < max_retries:
        try:
            connection = MySQLdb.connect(**db_settings)
            connection.close()
            print("✅ Banco de dados conectado com sucesso!")
            return True
        except OperationalError as e:
            retry_count += 1
            print(f"⏳ Tentativa {retry_count}/{max_retries} - Erro: {e}")
            time.sleep(2)
    
    print("❌ Falha ao conectar com o banco de dados após 30 tentativas")
    return False

if __name__ == "__main__":
    wait_for_db()