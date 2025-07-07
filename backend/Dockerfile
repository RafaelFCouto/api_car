# Dockerfile
FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY execute-migrations.sh /app/execute-migrations.sh
RUN chmod +x /app/execute-migrations.sh


COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]