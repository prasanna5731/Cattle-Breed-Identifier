import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    name: "PashuDrishti API Server",
    status: "active",
    message: "Indian Cattle & Buffalo Breed Recognition System API is running successfully.",
    endpoints: {
      health: "/api/healthz",
      breeds: "/api/breeds",
      stats: "/api/stats",
      analyze: "/api/analyze (POST)"
    }
  });
});

app.use("/api", router);

// Custom 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: `Not Found: ${req.method} ${req.url} is not a valid endpoint.`,
  });
});

// Custom global error-handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  req.log.error({ err, url: req.url }, "Express global error handler triggered");
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "An internal server error occurred",
  });
});

export default app;
