FROM node:8.4.0

# Create app directory
WORKDIR /server

# Install packages
COPY package.json .
COPY package-lock.json .

RUN npm install

# Copy source
COPY index.js .
COPY app/ /server/app/
COPY database/ /server/database/

EXPOSE 3333

CMD ["npm", "start"]