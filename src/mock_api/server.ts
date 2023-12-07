import { createServer, Model, Response } from "miragejs";
import { poems } from "./data/";

export function makeServer({ environment = "development" } = {}) {
  const storedData = localStorage.getItem("mirage-data");
  const initialData = storedData ? JSON.parse(storedData) : { poems };

  const server = createServer({
    environment,
    models: {
      poem: Model,
    },

    seeds(server) {
      server.db.loadData(initialData);
    },

    routes() {
      this.namespace = "/poetriumph.com/api/v1";

      this.get(
        "/poems",
        (schema) => {
          const poems = schema.all("poem");
          return poems.models;
        },
        { timing: 2000 }
      );

      this.post("/poems", (schema, request) => {
        const newPoem = JSON.parse(request.requestBody);
        newPoem.isLiked = false;
        const addedPoem = schema.create("poem", newPoem);

        localStorage.setItem(
          "mirage-poem-data",
          JSON.stringify(schema.db.dump())
        );

        return new Response(201, {}, addedPoem);
      });

      this.patch("/poems", (schema, request) => {
        const { id, isLiked } = JSON.parse(request.requestBody);
        const updatedPoem = schema.db.poems.update(id, { isLiked });
        localStorage.setItem(
          "mirage-poem-data",
          JSON.stringify(schema.db.dump())
        );
        return updatedPoem;
      });

      this.del("/poems/:id", (schema, request) => {
        const { id } = request.params;
        const targetPoem = schema.find("poem", id);
        if (targetPoem) {
          targetPoem.destroy();
          localStorage.setItem(
            "mirage-poem-data",
            JSON.stringify(schema.db.dump())
          );
          return new Response(204);
        } else {
          return new Response(404, { message: "poem not found" });
        }
      });
    },
  });

  return server;
}
