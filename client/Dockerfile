FROM node:7.8.0-alpine


COPY . .

# Build for production.
RUN yarn &&\
    npm run build --production
RUN npm install -g serve
CMD serve -s build