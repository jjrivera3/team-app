FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Generate Prisma Client inside Docker
RUN npx prisma generate

# Expose the correct port
EXPOSE 3001

CMD npm start
