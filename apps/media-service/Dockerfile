# Étape 1 : Build de l'application
FROM node:23-alpine AS builder

WORKDIR /app

# Copier les fichiers de config à la racine
COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code (apps + libs)
COPY apps ./apps
COPY libs ./libs
COPY .env .env

# Build uniquement l'API Gateway
RUN npx nest build media-service

# Étape 2 : Run
FROM node:23-alpine

WORKDIR /app

# Copier les node_modules et le build depuis l'étape builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

# Commande de démarrage
CMD ["node", "dist/apps/media-service/src/main.js"]