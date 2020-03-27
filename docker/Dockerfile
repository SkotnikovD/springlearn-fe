FROM node:12.7-alpine AS build
WORKDIR /ang_app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build /ang_app/dist/spring-learn-fe /usr/share/nginx/html
