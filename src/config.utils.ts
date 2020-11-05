export function getEnvVar(
  name: string,
  fallback?: string,
  options: { requiredInProduction?: boolean; isProduction?: boolean } = {
    requiredInProduction: false,
    isProduction: false,
  }
): string {
  if (process.env[name]) {
    return process.env[name];
  }

  const isRequired = !options.isProduction || !options.requiredInProduction;

  if (fallback && isRequired) {
    return fallback;
  }

  throw new Error(`Missing env var ${name}`);
}

export function itIsInProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
