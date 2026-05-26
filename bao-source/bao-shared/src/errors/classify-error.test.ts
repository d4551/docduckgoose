import { describe, expect, test } from "bun:test";
import { ERROR_SEVERITY } from "@baohaus/bao-utils/error-severity";
import { classifyError } from "./classify-error";

describe("classifyError", () => {
  test("network keyword → Network + High", () => {
    const result = classifyError({ message: "Connection refused", errorTypeName: "FetchError" });
    expect(result.category).toBe("network_error");
    expect(result.severity).toBe(ERROR_SEVERITY.High);
  });

  test("auth keyword → Unauthorized + Critical", () => {
    const result = classifyError({ message: "Invalid api_key", errorTypeName: "AuthError" });
    expect(result.category).toBe("unauthorized");
    expect(result.severity).toBe(ERROR_SEVERITY.Critical);
  });

  test("quota keyword → RateLimited + Medium", () => {
    const result = classifyError({ message: "Rate limit exceeded", errorTypeName: "QuotaError" });
    expect(result.category).toBe("RATE_LIMITED");
    expect(result.severity).toBe(ERROR_SEVERITY.Medium);
  });

  test("timeout error type → Timeout + Medium", () => {
    const result = classifyError({ message: "deadline exceeded", errorTypeName: "TimeoutError" });
    expect(result.category).toBe("timeout_error");
    expect(result.severity).toBe(ERROR_SEVERITY.Medium);
  });

  test("model+missing keyword → ServerError + High", () => {
    const result = classifyError({
      message: "Model checkpoint missing",
      errorTypeName: "LoadError",
    });
    expect(result.category).toBe("server_error");
    expect(result.severity).toBe(ERROR_SEVERITY.High);
  });

  test("modelName present without keyword match → ServerError + Medium", () => {
    const result = classifyError({
      message: "something happened",
      errorTypeName: "GenericError",
      modelName: "claude-opus-4-7",
    });
    expect(result.category).toBe("server_error");
    expect(result.severity).toBe(ERROR_SEVERITY.Medium);
  });

  test("unknown shape → Unknown + Medium fallback", () => {
    const result = classifyError({ message: "", errorTypeName: "" });
    expect(result.category).toBe("unknown_error");
    expect(result.severity).toBe(ERROR_SEVERITY.Medium);
  });
});
