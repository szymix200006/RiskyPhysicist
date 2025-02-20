import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context';

const angularAppEngine = new AngularAppEngine();

/**
 * ✅ Netlify-compatible request handler for SSR
 */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  try {
    // Handle the request using Angular SSR
    const result = await angularAppEngine.handle(request, context);
    return result || new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('SSR Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

/**
 * ✅ Export request handler for Netlify
 */
export const handler = createRequestHandler(netlifyAppEngineHandler);