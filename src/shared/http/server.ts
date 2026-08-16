import { env } from "@config/env";
import { App } from "./App";

class Server {
  private readonly appInstance: App;

  constructor() {
    this.appInstance = new App();
  }

  public async start(): Promise<void> {
    const fastifyServer = this.appInstance.getFastifyInstance();

    try {
      await fastifyServer.listen({
        port: env.PORT,
        host: "0.0.0.0",
      });

      console.log(
        `🚀 API Architecture Study running on http://localhost:${env.PORT}`,
      );
    } catch (err) {
      fastifyServer.log.error(err);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
