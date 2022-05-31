import 'dotenv/config';
import * as configFile from 'config';
import * as PostgresConnectionStringParser from 'pg-connection-string';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let typeOrmConfig: TypeOrmModuleOptions;
let connectionOptions = null;
if (process.env.DATABASE_URL) {
  connectionOptions = PostgresConnectionStringParser.parse(
    process.env.DATABASE_URL,
  );
}

const dbConfig = configFile.get('db');
if (connectionOptions) {
  typeOrmConfig = {
    type: dbConfig.type,
    host: connectionOptions.host || dbConfig.host,
    port: connectionOptions.port || dbConfig.port,
    username: connectionOptions.user || dbConfig.username,
    password: connectionOptions.password || dbConfig.password,
    database: connectionOptions.database || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  };
} else {
  typeOrmConfig = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  };
}
export { typeOrmConfig };
