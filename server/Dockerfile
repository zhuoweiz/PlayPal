#FROM openjdk:8-jdk-alpine
#ARG JAR_FILE=target/server-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]


#
# Build stage
#
FROM maven:3-jdk-8-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=build /home/app/target/server-0.0.1-SNAPSHOT.jar app.war
ENTRYPOINT ["java","-jar","/app.war"]