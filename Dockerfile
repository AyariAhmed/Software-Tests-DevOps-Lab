FROM node:16.13.1 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM node:16.13.1
WORKDIR /app
COPY package.json .
RUN npm set-script prepare "" && npm install --only=production
COPY --from=build /app/config ./config
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD npm run start:prod

