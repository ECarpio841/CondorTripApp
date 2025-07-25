# Práctica Microservicios - Arquitectura aplicada a CONDORTRIP

## 1. Título

Implementación de Microservicios con Eureka y API Gateway en la app turística CONDORTRIP

## 2. Tiempo de duración

180 minutos

## 3. Fundamentos

La arquitectura de microservicios representa una evolución frente al modelo monolítico tradicional. En lugar de que una sola aplicación gestione todas las funcionalidades, esta arquitectura distribuye la lógica en servicios independientes, especializados y autónomos. Cada microservicio se centra en una responsabilidad específica, tiene su propia base de datos y puede desplegarse de manera separada, lo cual permite una mayor escalabilidad, mantenibilidad y resiliencia.

En esta práctica se aplica esta arquitectura al proyecto **CONDORTRIP**, una app móvil turística, separando funcionalidades críticas en microservicios:

* **user-service**: Manejo de usuarios, login, registro, roles y perfiles.
* **plan-service**: Creación y gestión de planes turísticos personalizados.

Componentes clave utilizados:

* **Eureka Server** como servicio de descubrimiento.
* **Spring Cloud Gateway** como punto de entrada a los microservicios.
* **Docker y Docker Compose** para contenedores y orquestación.
* **PostgreSQL** como base de datos relacional.
* **React Native** para la app móvil cliente.

## 4. Conocimientos previos

* Principios de microservicios
* Spring Boot y Java
* Docker y Compose
* PostgreSQL
* Pruebas con Postman
* React Native (Expo)

## 5. Objetivos a alcanzar

* Separar funcionalidades clave de CONDORTRIP en microservicios.
* Implementar Eureka como servicio de descubrimiento.
* Configurar API Gateway como entrada única.
* Crear operaciones CRUD RESTful.
* Contenerizar y levantar los servicios con Docker Compose.

## 6. Equipo necesario

* Computador con Fedora / Windows / Linux
* JDK 17+
* Spring Boot
* Docker Engine + Docker Compose
* PostgreSQL
* Postman
* Editor (IntelliJ / VS Code)

## 7. Material de apoyo

* [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
* [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway)
* [https://spring.io/projects/spring-cloud-netflix](https://spring.io/projects/spring-cloud-netflix)
* [https://docs.docker.com](https://docs.docker.com)

## 8. Procedimiento

### Paso 1: Crear los microservicios

* `user-service`: CRUD de usuarios, login, roles
* `plan-service`: CRUD de planes y etapas del viaje

Cada uno tiene su propia configuración, entidad, repositorio, controlador y archivo `application.yml`

### Paso 2: Crear Eureka Server

* Proyecto Spring Boot llamado `discovery-service`
* Dependencia: `spring-cloud-starter-netflix-eureka-server`

```java
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServiceApplication {}
```

### Paso 3: Crear el API Gateway

Proyecto `api-gateway` con dependencias:

* `spring-cloud-starter-gateway`
* `eureka-client`

Configuración de rutas:

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
        - id: plan-service
          uri: lb://PLAN-SERVICE
          predicates:
            - Path=/api/plans/**
```

### Paso 4: Base de datos

Cada microservicio usa su propia instancia PostgreSQL definida en `application.yml` y en Docker Compose.

### Paso 5: CRUD REST

`user-service` contiene:

* Entidad: `User`
* Repositorio JPA
* Controlador REST

`plan-service` contiene:

* Entidad: `Plan`, `PlanItem`
* Asociaciones
* Controlador y servicios REST

### Paso 6: Dockerizar microservicios

`Dockerfile` para cada servicio:

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Paso 7: Docker Compose

Archivo `docker-compose.yml` en la raíz:

```yaml
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_DB: condortrip
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    ports:
      - "5432:5432"

  discovery-service:
    build: ./discovery-service
    ports:
      - "8761:8761"

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - discovery-service

  user-service:
    build: ./user-service
    depends_on:
      - discovery-service
      - postgres

  plan-service:
    build: ./plan-service
    depends_on:
      - discovery-service
      - postgres
```

## 9. Resultados esperados

* Eureka accesible en: `http://localhost:8761`
* Gateway funcionando en: `http://localhost:8080`
* Endpoints CRUD funcionando desde Postman:

```
GET http://localhost:8080/api/users
POST http://localhost:8080/api/plans
```

* Aplicación React Native se conecta al Gateway usando la IP de red local del backend

## 10. Bibliografía

* Spring Cloud documentation. [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)
* Docker Inc. [https://docs.docker.com](https://docs.docker.com)
* Expo documentation. [https://docs.expo.dev/](https://docs.expo.dev/)
* PostgreSQL. [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
