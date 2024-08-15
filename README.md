# POC GPT oAuth2

Follow https://www.youtube.com/watch?v=6HFp0ISO4XI and test it

POC: Deploy and test oauth via a GPT that uses `deploy.actionschema.com/openapi.json`

# Accept text/html

What if `vercel.json` could also serve good HTML?

See https://claude.ai/chat/58147786-3fd5-4c98-b955-29c461220033

What if every endpoint has a postprocessor, saying if "accept" is "text/html", then generate a HTML that shows the form and the result of the current input?

https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values

This would already create a simplistic frontend for every GET endpoint. What if this is a wrapper around an openapi? The cool thing is that the instructions can be made dynamic this way. `html.actionschema.com/{openapiUrl}/{operationId}?{queryParams}`

1. Convert any openapi into an openapi with only HTML output

- suffixing `.html` to the path
- changing body and headers into query params

2. Cache the HTML template in a way that it gets provided the data as template variables. The form should do a GET action so there's no need to do a dynamic js update of the page.
3. Have another endpoint that creates a HTML Layout (Header and Menu) one time for any openapi and caches the result forever.

If I have this, it can probably be added as a catch-all in `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/index.html",
      "destination": "/api/html.ts"
    },
    {
      "source": "/",
      "destination": "/api/html.ts"
    },
    {
      "source": "/:path*.html",
      "destination": "/api/html.ts"
    }
  ]
}
```

`html.ts` may simply call https://html.actionschema.com/{url}?{searchParams} and respond with the proper HTML.

Hmmm ok. Not sure yet what the best way is to implement. Super cool idea though... It'd be amazing if people could add this as a middleware/postprocessor with the custom instructions being optional.

<!--
This is a great way to make any api much more visible to humans. And ActionSchema can just link to all these websites, the goal being super easy adoption.

If it would also allow for OAuth by some sort of cookie system that overwrites need of authorization header, making a new app becomes mega easy.

Also curious how this would compare or potentially link with htmx, maybe there's something there.
-->

NB: TIMEBOX THIS. Look at into middlewares for 1 hour, if it's good, let's create tiny module.

# TODO

Also add GitHubs openapi to Myelin.

Write all files using Myelin one-by-one.

Ensure `editRepo` and `setRepo` can also create files by using URLs that respond with content (to reduce context size)

Put oauth in the designated endpoints, not in main...

<!--

Having this will be huge. After this:

- try generalising further over oauth2 and add services such as discord, slack, etc
- think about how i can allow people to walkthrough making an AI app very easily (also their own oauth apps)
- connect this with writing code, do a POC for
  - an agent making a new project
  - an agent making a pr to an existing project

-->

# ⚠️⚠️⚠️ Work in progress ⚠️⚠️⚠️
