import { Request } from 'express';
import { ErrorResponse } from '../lib/error-handler.ts';

export async function getStatus(req: Request) {
    const name = req.query.name ?? 'World';

    return { name }
}

export async function deleteStatus(req: Request) {
    throw new ErrorResponse('Not implemented', 501, 'Someone tried to call delete status')
}
