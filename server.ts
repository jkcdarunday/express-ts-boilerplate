import cors from 'cors';
import express from 'express';
import config from './config';
import routes from './routes';
import errorHandler from './lib/error-handler.ts';
import logger from './lib/logger.ts';

const app = express();

app.use(cors({ origin: new RegExp(config.CORS.allowedOriginPattern) }));

routes.setup(app);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    const port = config.APP.PORT;
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}
