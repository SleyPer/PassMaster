# Utilisation de l'image Node.js pour le développement
FROM node:18 AS development

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install -g node-pre-gyp
RUN npm install

# Copier le code source de l'application
COPY . .

# Exposer le port 4200 pour le serveur de développement Angular
EXPOSE 4200

# Commande pour lancer le serveur de développement
CMD ["npm", "start"]
