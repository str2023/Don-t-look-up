import { setupWorker } from 'msw';
import { handlers } from './mocks/mock';

const worker = setupWorker(...handlers);

worker.start();
