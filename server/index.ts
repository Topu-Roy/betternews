import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { env } from "@/utils/env";
import type { ErrorResponseType } from "@/shared/types";
import { auth } from "@/lib/auth";

const app = new Hono();

app.get("/", c => {
  return c.text("Hello Hono!");
});

// Auth
app.get("/api/auth/*", c => auth.handler(c.req.raw));
app.post("/api/auth/*", c => auth.handler(c.req.raw));

app.onError((err, c) => {
  function isFormError() {
    if (err.cause) {
      if (typeof err.cause === "object") {
        if ("form" in err.cause) {
          return err.cause.form === true;
        }
      }
    }
  }

  if (err instanceof HTTPException) {
    const errorResponse =
      err.res ??
      c.json<ErrorResponseType>(
        {
          error: err.message,
          success: false,
          isFormError: isFormError() ?? false,
        },
        err.status
      );

    return errorResponse;
  }

  return c.json<ErrorResponseType>(
    {
      error: env.NODE_ENV === "production" ? "Internal Server Error" : (err.stack ?? err.message),
      success: false,
      isFormError: isFormError() ?? false,
    },
    500
  );
});

export default app;
