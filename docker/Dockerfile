FROM node:12.7-alpine AS build
WORKDIR /ang_app
COPY ./package.json ./
RUN npm install
RUN npm install -g @angular/cli 
COPY . .
RUN ng build --configuration=prod

FROM nginx:1.17.1-alpine
COPY --from=build /ang_app/dist/spring-learn-fe /usr/share/nginx/html
