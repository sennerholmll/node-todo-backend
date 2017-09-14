FROM node:8.4.0

# Run as user node
USER node
WORKDIR /home/node

# Install packages
COPY package.json .
COPY package-lock.json .

RUN npm install --production

# Copy source
COPY app ./app
COPY test/ ./test
COPY runtest .

EXPOSE 3333

CMD ["npm", "start"]