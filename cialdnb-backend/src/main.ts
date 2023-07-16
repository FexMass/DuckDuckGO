import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search/search.module';

/**
 * This is the entry point of the Nest.js application. It imports and creates an instance of the SearchModule.
 * It also configures the application with CORS settings and defines the port on which the application listens.
 */

async function bootstrap() {
  // Create a Nest.js app instance by passing the root module (SearchModule)
  const app = await NestFactory.create(SearchModule);

  // Enable Cross-Origin Resource Sharing (CORS) with specific settings
  app.enableCors({
    // Define which request headers are allowed
    allowedHeaders: ['content-type'],

    // Define the origin for which CORS is enabled
    origin: 'http://localhost:5173',

    // Define whether or not the response can be exposed when the credentials flag is true.
    credentials: false,
  });

  // The app listens for incoming requests on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
