// Vercel buy and set domain (ditch cloudflare/namecheap, for this)
export const GET = async (request: Request) => {
  return new Response("Placeholder" + request.url);
};
