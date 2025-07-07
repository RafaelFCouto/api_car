# Dockerfile para React Frontend
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar em desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]