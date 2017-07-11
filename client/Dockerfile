FROM node:7.8.0-alpine

ARG ROOT_URL

COPY . .

# Build for production.

ENV PUBLIC_URL $ROOT_URL

RUN yarn &&\
    npm run build --production
RUN npm install -g serve
CMD serve -s build