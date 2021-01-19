/**
 * Gets configs per environment, as set by the environment variable NODE_ENV
 *
 * Note: This is checked in to version control, and is NOT intended for secrets.
 *       ONLY public config variables should be managed here.
 */

interface Configs {
  apiUrl: string;
}

const environments = {
  test: {
    apiUrl: "http://localhost:5001/evently-demo/us-central1/api/v1",
  },
  development: {
    apiUrl: "http://localhost:5001/evently-demo/us-central1/api/v1",
  },
  staging: {
    apiUrl: "ACTUAL_ENDPOINT_HERE",
  },
  production: {
    apiUrl: "ACTUAL_ENDPOINT_HERE",
  },
};

const getConfigsPerEnvironment = (): Configs => {
  const environment = process.env.NODE_ENV;
  return environments[environment];
};

export default getConfigsPerEnvironment;
