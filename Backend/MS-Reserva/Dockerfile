# 1. Usamos una imagen base de Node.js
FROM node:18-slim

# 2. Crear un directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar el package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# 4. Instalar las dependencias del proyecto
RUN npm install

# 5. Copiar todo el código fuente al contenedor
COPY . .

# 6. Instalar las dependencias de desarrollo (si es necesario)
RUN npm install --only=dev

# 7. Configurar el contenedor para usar el puerto 4000
EXPOSE 4000

# 8. Definir el comando para ejecutar el servicio (en este caso, usando `tsx`)
CMD ["npm", "run", "dev"]
