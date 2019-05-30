# Using an Node image
FROM node:12
# Setting the working directory
WORKDIR /usr/src/app

#Copy package.json
COPY package*.json ./

# Install depedencies
RUN npm install

# Copy all files
COPY . .

# Expose 3000 available
EXPOSE 3000

ENV NAME PROD

CMD [ "node", "server.js" ]