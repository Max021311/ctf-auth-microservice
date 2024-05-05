FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .
RUN rm -rf dist node_modules .git
RUN yarn
RUN yarn build

EXPOSE 80

ENV NODE_ENV=production
ENV SERVER_PORT=80
ENV HOST=0.0.0.0

CMD ["yarn", "start"]
