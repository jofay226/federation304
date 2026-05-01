FROM node:20-alpine 

WORKDIR /post-service

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 4001

CMD sh -c "sleep 5 && npx prisma migrate dev --name init && npm run dev"