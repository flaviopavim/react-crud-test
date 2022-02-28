import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { createConnection } from "typeorm";

import { Desenvolvedores } from './../src/desevolvedores.entity';
import { Niveis } from './../src/niveis.entity';

const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //connect to database
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test_react",
    entities: [
        Desenvolvedores,
        Niveis,
    ],
    synchronize: true,
    logging: true
  });
  

  app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
  });

}
bootstrap();