FROM node:16.13.0-alpine3.13
WORKDIR /usr/src/app
COPY . .
RUN yarn
ENV USE_CACHE=true
CMD ["yarn", "dev"]

# docker kill $(docker ps -q); docker system prune; docker build -t nodejs_student_manager .; docker run -dp 3000:3000 nodejs_student_manager

