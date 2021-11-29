import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
  .setTitle('Api Tallos')
  .setDescription('Api de mensageria da Tallos')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const port = 3000;
  await app.listen(port, () => console.log(`Estamos online na porta ${port}`));
}
bootstrap();
