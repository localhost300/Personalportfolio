export const SITE_URL = "https://www.andreamshenocca.online";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();
