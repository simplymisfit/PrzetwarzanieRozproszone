FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/PrzetwarzanieRozproszone-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} application.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/application.jar"]