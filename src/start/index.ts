"use strict";

import { Config } from "../config";
import express from "express";
import initGraph from "../graphql";
import { IAppContext } from "../types/app";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

import initServices from "../services";
import initDb from "../model";
import { setContext } from "../middlewares/context";


export default async function start(config: Config) {
  try {
    const appContext: IAppContext = {};
    appContext.db = await initDb(config.db);
    appContext.services = await initServices(appContext);
    const graph = initGraph(appContext);

    await graph.start();
    const app = express();
    app.use(express.urlencoded({ extended: true }));

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(graph, {
        context: setContext,
      })
    );

    app.use("/health", (req, res) => {
      res.status(200).send("All is green!!!");
    });

    app.listen(config.app.port, () => {
      console.log(
        `🚀  Server ready at http://localhost:${config.app.port}/graphql`
      );
    });
  } catch (err) {
    console.error(err);
  }
}
