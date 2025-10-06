# Etapa 1: Construcción
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Descargar dependencias primero para aprovechar la caché
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y construir el proyecto
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copiamos el JAR desde la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Copiamos el archivo .env si existe
COPY .env .env

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
