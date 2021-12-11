import {
  createServer,
  Factory,
  Model,
  Response,
  RestSerializer,
} from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    // gerar dados em massa
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      // executa a determinada factory
      server.createList("user", 200);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        /**
         * calcular, quando a página for 2 tem que ter registo
         * de 10 á 20, page = 3, de 20 á 30...
         */

        // Índex de onde começa a pegar os dados no DB
        const pageStart = (Number(page) - 1) * Number(per_page);
        // Índex de onde termina de pegar os dados no DB
        const pageEnd = pageStart + Number(per_page);

        // da lista que trazer corta com base no start-end
        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(
          200,
          {
            "x-total-count": String(total),
          },
          { users }
        );
      });
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
