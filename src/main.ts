import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API Test')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
 
  await app.listen(process.env.PORT_SERVER);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();