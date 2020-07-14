import { Context } from 'aws-lambda';
import 'source-map-support/register';
import * as awsServerlessExpress from 'aws-serverless-express';
import app from './src/app';

const binaryMimeTypes: string[] = [];

const server = awsServerlessExpress.createServer(app, undefined, binaryMimeTypes);
export const dcs = (event: any, context: Context) => awsServerlessExpress.proxy(server, event, context);