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

/**
 * TO TRY: http://github.com/login/oauth/authorize?response_type=code&client_id=Ov23li2FVyYV9zqL6oJI&redirect_uri=https://deploy.actionschema.com/oauth/callback
 */
export const GET = async (request: Request) => {
  const url = new URL(request.url);
  console.log({ url });
  const code = url.searchParams.get("code");
  const client_id = process.env.client_id;
  const client_secret = process.env.client_secret;

  if (!client_id || !client_secret) {
    return new Response("Couldn't get client id + secret");
  }

  if (!code) {
    return new Response("Please give a code");
  }

  try {
    // comes from OpenAPI
    const redirect_uri = "https://deploy.actionschema.com/oauth/callback";
    const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`;

    console.log({ tokenUrl });
    const result = await fetch(tokenUrl, {
      method: "POST",

      // //not sure if body or params
      // body: JSON.stringify({
      //   client_id,
      //   // the secret needs to be in the back...
      //   client_secret,
      //   code,
      //   redirect_uri,
      // }),

      headers: {
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log({ status: res.status, message: res.statusText });
      return res.status;
    });
    /*as Promise<{
          access_token?: string;
          token_type?: "bearer";
          scope?: string;
          error?: string;
        }>;*/
    console.log({ result });
    // NB: Not sure if this is the way.
    return json(result);
  } catch (e) {
    return json("Not found...." + e);
  }
};
