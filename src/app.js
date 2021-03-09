import express from 'express';
import axios from 'axios'
import moment from 'moment';

import useLogging from './middlewares/logger.js';
import useRequestParser from './middlewares/requestParser.js';
import useCors from './middlewares/cors.js';

let status, firstErrorTime, mailSent = false;

const formatDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

async function watchURL() {
  const result = await axios.get('https://dev.fractal-it.fr:8443/fake_health_test?dynamic=true')
  const receivedStatus = result.data.status;
  const now = moment();
  const formattedNowOutput = now.format('hh:mm:ss');
  // console.log('Received status', receivedStatus)

  if ((!status || status === "ok") && receivedStatus === 'error') {
    firstErrorTime = now;
  } else if (status === "error" && receivedStatus === 'ok') {
    firstErrorTime = null;
    mailSent = false;
    console.log(formattedNowOutput, 'Status à ok de nouveau');
  } else if (status === 'error' && receivedStatus === 'error') {
    const elapsedTime = now.diff(firstErrorTime, 'seconds');
    if (elapsedTime > 30 && !mailSent) {
      console.log(formattedNowOutput,'Status à error depuis au moins 30s');
      mailSent = true;
    }
  }

  status = receivedStatus;
}

export default async function application(logger, corsConfig) {
  const app = express();

  useLogging(app, logger);
  useRequestParser(app);
  useCors(app, corsConfig);

  setInterval(watchURL, 1000);

  app.get('/status', (req, res) => {
    res.status(200).json({
      status
    });
  })
  
  return app;
}
