FROM node:7.8.0-alpine

ARG ROOT_URL

COPY . .

# Build for production.

ENV REACT_APP_ROOT $ROOT_URL

RUN yarn &&\
    npm run build --production
RUN npm install -g serve
CMD serve -s build