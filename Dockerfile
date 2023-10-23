FROM node:alpine

#Set working directory
WORKDIR /app

#Copy package.json to working directory
COPY . .

#Install dependencies
RUN npm install 

#Expose port 3000
EXPOSE 3000

#Default command
CMD ["npm","start"]