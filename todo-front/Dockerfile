FROM node:21-alpine as build
WORKDIR /app 
COPY . .
RUN npm ci 
RUN npm run build 

FROM nginx:1.25-alpine 
COPY --from=build /app/dist /usr/share/nginx/html

