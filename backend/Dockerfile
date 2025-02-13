FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY . .

RUN ./gradlew clean build

ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/app/app.jar"]