export const isHtmxFragmentRequest = (request: Request): boolean =>
  request.headers.get("hx-request") === "true";

export const selectShellOrPanel = (
  request: Request,
  panelHtml: string,
  pageHtml: string,
): string => (isHtmxFragmentRequest(request) ? panelHtml : pageHtml);
