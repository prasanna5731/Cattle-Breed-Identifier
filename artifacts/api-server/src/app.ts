import path from "path";
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

app.use("/api", router);

// Serve frontend static assets in production
const frontendPath = path.resolve(process.cwd(), "artifacts/pashu-drishti/dist/public");
app.use(express.static(frontendPath));

// Fallback all other GET requests to index.html for SPA routing
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      next();
    }
  });
});

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
