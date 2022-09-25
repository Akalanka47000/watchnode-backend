FROM node:16-alpine

WORKDIR /app

COPY . .

RUN sudo apt install tesseract-ocr
RUN sudo apt install libtesseract-dev

RUN yarn install
RUN yarn build

CMD ["node", "dist/app.js"]

EXPOSE 3000