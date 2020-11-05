import { getEnvVar, itIsInProduction } from "./config.utils";

const env = {};

describe("getEnvVar()", () => {
  beforeEach(() => {
    process.env = env;
  });
  afterEach(() => {
    process.env = env;
  });

  it("gets the env value when provided", () => {
    process.env.FOO = "foo";
    expect(getEnvVar("FOO", "bar")).toEqual("foo");
  });

  it("gets the env value when not provided", () => {
    process.env.FOO = "foo";
    expect(getEnvVar("FOO", undefined)).toEqual("foo");
  });

  it("does not get foo requested env", () => {
    process.env.FOO = "";
    expect(
      getEnvVar("FOO", "bar", {
        requiredInProduction: false,
        isProduction: false,
      })
    ).toEqual("bar");
  });

  it("should enforce production stick checking", () => {
    process.env.FOO = "foo";
    expect(
      getEnvVar("FOO", undefined, {
        requiredInProduction: true,
        isProduction: true,
      })
    ).toEqual("foo");
  });

  it("should throw error when not available", () => {
    process.env.FOO = undefined;
    expect(() => {
      getEnvVar("BAZ", undefined, {
        requiredInProduction: true,
        isProduction: true,
      });
    }).toThrowError(/Missing env/);
  });

  it("should returns fallback", () => {
    process.env.FOO = undefined;
    expect(
      getEnvVar("BAZ", "baz", {
        requiredInProduction: false,
        isProduction: false,
      })
    ).toEqual("baz");
  });
});

describe("itIsInProduction", () => {
  beforeEach(() => {
    process.env = env;
  });
  afterEach(() => {
    process.env = env;
  });

  it("should returns true", () => {
    process.env.NODE_ENV = "production";
    expect(itIsInProduction()).toBeTruthy();
  });

  it("should returns false", () => {
    process.env.NODE_ENV = "tests";
    expect(itIsInProduction()).toBeFalsy();
  });
});
