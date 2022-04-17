import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'first_project_nestjs',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true, // não usar em produção ## RECOMENDADO TAMBÉM PELO PRÓPRIO NESTJS ##
    }),
  },
];