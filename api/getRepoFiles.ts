export const GET = async (request: Request) => {
  const Authorization = request.headers.get("Authorization");

  return new Response("YO");
};
