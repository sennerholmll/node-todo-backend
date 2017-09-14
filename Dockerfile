FROM node:8.4.0

USER node

# Create app directory
WORKDIR /server

# Install packages
COPY package.json .
COPY package-lock.json .

RUN npm install --production

# Copy source
COPY app/ ./app/
COPY test/ ./test/
COPY runtest .

EXPOSE 3333

CMD ["npm", "start"]