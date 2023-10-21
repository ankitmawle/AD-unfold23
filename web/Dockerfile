FROM node:18
# Create app directory
WORKDIR /

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3300
CMD [ "node", "index.js" ]