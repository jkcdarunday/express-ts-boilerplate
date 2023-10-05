import express, { Express } from 'express';
import { handleErrors } from './lib/error-handler.ts';
import { deleteStatus, getStatus } from './controllers/status.ts';

export function setup(app: Express) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/status', handleErrors(getStatus));
    app.delete('/status', handleErrors(deleteStatus))
}

export default {
    setup
}
