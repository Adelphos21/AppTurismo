# Imagen base ligera
FROM node:20-alpine

# Crear y establecer directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias (solo las de producción)
RUN npm install --omit=dev

# Copiar el resto del código del orquestador
COPY . .

# Copiar archivo de entorno si quieres usarlo dentro del contenedor
# (opcional: puedes omitirlo y pasar las variables en docker-compose)
COPY .env .env

# Exponer el puerto en el que corre el orquestador
EXPOSE 8081

# Comando de inicio
CMD ["npm", "start"]
