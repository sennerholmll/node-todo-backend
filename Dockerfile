FROM node:8.4.0

# Create app directory
WORKDIR /server

# Install packages
COPY package.json .
COPY package-lock.json .

RUN npm install --production

# Copy source
COPY index.js .
COPY app/ ./app/
COPY database/ ./database/
COPY test/ ./test/
COPY runtest .

EXPOSE 3333

CMD ["npm", "start"]