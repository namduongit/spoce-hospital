FROM node:lts

WORKDIR /app/client

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

# If you change any file in the current directory, rebuild the entire image
COPY . . 

EXPOSE 3000
CMD ["npm", "run", "dev"]
