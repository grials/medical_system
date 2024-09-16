FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Install deps for production only
COPY ./package.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
RUN mkdir -p /usr/src/app/public

CMD npm run start:prod
