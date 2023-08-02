
FROM node:16.13.0
ENV PORT=80
COPY .
WORKDIR .
RUN npm install
EXPOSE 80
CMD [ "npm run test" ]
