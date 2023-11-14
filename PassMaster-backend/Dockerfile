# Utilisation de l'image Maven officielle pour le développement
FROM maven:3.8.4-openjdk-17-slim AS development

# Définir le répertoire de travail
WORKDIR /app

# Copier le code source et le fichier pom.xml de l'application Spring Boot
COPY . .

# Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Commande pour lancer l'application Spring Boot en mode développement
CMD ["mvn", "spring-boot:run"]
