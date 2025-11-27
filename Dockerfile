# RUN: run when build image
# ENTRYPOINT/CMD: run when container run


FROM gradle:9.2-jdk21 AS build
WORKDIR /var/www/app
COPY ./server .
RUN gradle clean build -x test

# gradle clean build -x test
# - clean: remove previous build files
# - build: compile source code, run tests, package application
# - -x test: skip tests during the build process

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /var/www/app/build/libs/server-0.0.1-SNAPSHOT.jar /app/server.jar
ENTRYPOINT ["java", "-jar", "/app/server.jar"]
