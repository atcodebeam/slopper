FROM node:22-alpine
WORKDIR /app
COPY index.html server.js favicon.svg og.png ./
EXPOSE 3000
CMD ["node", "server.js"]
