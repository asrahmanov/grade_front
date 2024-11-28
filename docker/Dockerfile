FROM node:16  as build-stage

WORKDIR /app
COPY . ./
RUN npm install -f
RUN npm run build

FROM registry-gitlab.fstravel.com/fun-sun/base-image:nginx_alpine_Base_from_all as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY docker/nginx.conf /etc/nginx/nginx.conf