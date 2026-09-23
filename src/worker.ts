const SITE_HOST = 'abqwax.ing';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

function permanentRedirect(location: string): Response {
  return new Response(null, {
    status: 308,
    headers: { Location: location },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname;

    const isSiteHost = host === SITE_HOST || host === `www.${SITE_HOST}`;
    const isWorkersDev = host.endsWith('.workers.dev');

    const needsCanonicalOrigin =
      isWorkersDev || (isSiteHost && (url.protocol !== 'https:' || host !== SITE_HOST));

    if (needsCanonicalOrigin) {
      return permanentRedirect(`https://${SITE_HOST}${url.pathname}${url.search}`);
    }

    if (/^\/404(\/|\.html)?$/i.test(path)) {
      const notFound = await env.ASSETS.fetch(
        new Request(new URL('/404', url.origin), request),
      );
      const headers = new Headers(notFound.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(notFound.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
    }

    if (/\.html$/.test(path)) {
      let normalized = path.replace(/\/?index\.html$/, '/');
      normalized = normalized.replace(/\.html$/, '/');
      if (!normalized.endsWith('/')) normalized += '/';
      return permanentRedirect(`${url.origin}${normalized}${url.search}`);
    }

    const lastSegment = path.slice(path.lastIndexOf('/') + 1);
    const isAssetLike = lastSegment.includes('.') || lastSegment.startsWith('_');
    if (path !== '/' && !path.endsWith('/') && !isAssetLike) {
      return permanentRedirect(`${url.origin}${path}/${url.search}`);
    }

    return env.ASSETS.fetch(request);
  },
};
