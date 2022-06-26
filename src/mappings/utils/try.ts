import logger, { logError } from './logger';

export function safelyTry(handler: any) {
  try {
    handler();
  } catch (e) {
    logError(e, (e) => logger.warn(`[[${handler.name}]]: Reason: ${e.message}`));
  }
}
