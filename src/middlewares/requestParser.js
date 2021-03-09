import bodyParser from 'body-parser';

export default function useRequestParsing(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};