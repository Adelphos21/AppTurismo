# Imagen base oficial
FROM python:3.13-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Crear directorio de la app
WORKDIR /app

# Copiar Poetry y dependencias
COPY pyproject.toml poetry.lock* /app/
RUN pip install --upgrade pip \
    && pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-root --without dev

# Copiar código fuente
COPY . /app/

# Exponer puerto
EXPOSE 8000

# Comando para iniciar Django
CMD ["poetry", "run", "gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]

