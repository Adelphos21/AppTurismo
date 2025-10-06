# Imagen base oficial de Python
FROM python:3.13-slim

# Variables de entorno para optimizar el contenedor y evitar escritura de bytecode
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependencias del sistema necesarias para mysqlclient (usando MariaDB)
RUN apt-get update \
    && apt-get install -y \
    build-essential \
    pkg-config \
    libmariadb-dev \
    libssl-dev \
    libffi-dev \
    && apt-get clean

# Crear el directorio de la app
WORKDIR /app

# Copiar pyproject.toml y poetry.lock
COPY pyproject.toml poetry.lock* /app/

# Instalar poetry y las dependencias de Python
RUN pip install --upgrade pip \
    && pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-root

# Copiar el código fuente de la aplicación
COPY . /app/

# Copiar el archivo .env
COPY .env /app/.env

# Exponer el puerto 8000
EXPOSE 8000

# Comando para iniciar Django
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
