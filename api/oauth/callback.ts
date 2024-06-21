/*
To get oauth2 working:

1. make an oauth app on the service, and manually fill get/fill in these details:

- Github App ID
- Authorizaton callback url
- Github client secret

2. Ensure the callback url is working. github directs the user to it with `?code={YOURCODE}`.
*/

export const json = (data: any) => {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const client_id = process.env.client_id;
  const client_secret = process.env.client_secret;

  if (!client_id || !client_secret) {
    return new Response("Couldn't get client id + secret");
  }

  if (!code) {
    return new Response("Please give a code");
  }

  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: JSON.stringify({
      // the secret needs to be in the back...
      client_id,
      client_secret,
      code,
    }),
  }).then(
    (res) =>
      res.json() as Promise<{
        access_token?: string;
        token_type?: "bearer";
        scope?: string;
        error?: string;
      }>,
  );
  return json(result);
};
