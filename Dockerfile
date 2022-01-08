FROM alpine:latest
ARG PORT
EXPOSE ${PORT}
WORKDIR /usr/app
RUN apk --no-cache add nodejs npm
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
