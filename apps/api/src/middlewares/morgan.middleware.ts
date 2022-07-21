import { Color, getMethodColor, getStatusColor } from 'utils/colors.utils';
import { HttpMethod } from 'constants/http.constant';
import chalk from 'chalk';
import morgan from 'morgan';

morgan.token('method', (req) => {
  const method = req.method as HttpMethod;
  return chalk.hex(getMethodColor(method)).bold(method);
});

morgan.token('status', (_, res) => {
  const status = res.headersSent ? res.statusCode : undefined;
  return chalk.hex(getStatusColor(status)).bold(status);
});

const customizeMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.status(req, res),
    chalk.hex(Color.PURPLE).bold(tokens.url(req, res)),
    chalk.hex(Color.GREEN).bold(tokens['response-time'](req, res) + 'ms'),
  ].join(' ');
});

export default customizeMorgan;
