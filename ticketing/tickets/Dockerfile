FROM node:alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --only=prod
RUN npm audit fix --force
COPY . .
CMD ["npm", "start"]