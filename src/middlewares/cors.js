import cors from 'cors';

export default function useCors(app, config) {
  app.use(cors(config));
}