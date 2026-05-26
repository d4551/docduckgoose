import { Elysia } from "elysia";

export interface PluginRouteAppRegistration {
  readonly ownerId: string;
  readonly app: PluginRouteApp;
}

export interface PluginRouteApp {
  handle(request: Request): Response | Promise<Response>;
}

const pluginApps: PluginRouteAppRegistration[] = [];

export const clearPluginRoutes = (): void => {
  pluginApps.splice(0, pluginApps.length);
};

export const createPluginRouteApp = (): Elysia => new Elysia();

export const registerPluginRouteApp = (ownerId: string, app: PluginRouteApp): void => {
  const next = pluginApps.filter((registration) => registration.ownerId !== ownerId);
  next.push({ ownerId, app });
  pluginApps.splice(0, pluginApps.length, ...next);
};

export const listPluginRouteApps = (): readonly PluginRouteAppRegistration[] =>
  [...pluginApps].sort((left, right) => left.ownerId.localeCompare(right.ownerId));

export const dispatchPluginRoute = async (request: Request): Promise<Response | null> => {
  for (const registration of listPluginRouteApps()) {
    const response = await registration.app.handle(request);
    if (response.status !== 404) {
      return response;
    }
  }
  return null;
};
