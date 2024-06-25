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

Create a function `pastebin(string,path)` that puts a string at a URL so you can easily reduce context. Host it at https://io.actionschema.com (later also add other io functionality like uploading files/blobs easily to a good openapi, and e.g. file conversion)

Add ratelimit `middleware.ts` to reader, web, and bin.

Create a function `generateSdk(openapiUrl)` that responds with a string containing a typescript SDK for that api.

Also add GitHubs openapi to Myelin.

Write all files using Myelin one-by-one.

Ensure `editRepo` and `setRepo` can also create files by using URLs that respond with content (to reduce context size)

Put oauth in the designated endpoints, not in main...

POC: Deploy and test oauth via a GPT that uses `deploy.actionschema.com/openapi.json`

<!--

Having this will be huge. After this:

- try generalising further over oauth2 and add services such as discord, slack, etc
- think about how i can allow people to walkthrough making an AI app very easily (also their own oauth apps)
- connect this with writing code, do a POC for
  - an agent making a new project
  - an agent making a pr to an existing project

-->

# ⚠️⚠️⚠️ Work in progress ⚠️⚠️⚠️

OpenAPI spec:

- user-based oauth2 for github and vercel
- `/{owner}/{repo}/{branch}` => files (proxy => github.actionschema.com)
- `/status/{owner}/{repo}` => status
- `/set(repo,files,poll:boolean)` => status
- `/edit(repo,path,changes,poll:boolean)` => status

This is one of the components of devin, except that this one is api-based, serverless, and pre-deployed.

Other components are:

- github reader / summariser
- web reader / crawler / summariser
- web search
- openapi self-play
- human
- auth
- toolbelt

Having this in an agent is extremely powerful, I'd expect it to be able to increase my coding productivity a lot because of massive testing and research capabilities.

Github useful endpoints:

repos/list-commits
repos/list-branches
repos/get-commit
repos/compare-commits
repos/get-content

maybe:

repos/list-deployments (to check vercel deployment status, could also be done
with vercel)
repos/get-deployment-status
git/create-commit
issues/list-for-repo
issues/list-comments
issues/list-comments-for-repo
reactions/list-for-issue-comment
issues/get

# useful vercel endpoints

projects

- getProjects - Retrieve a list of projects
- createProject - Create a new project
- createProjectEnv - Create one or more environment variables
- updateProject - Update an existing project
- getProjectDomains - Retrieve project domains by project by id or name
- getProjectDomain - Get a project domain
- updateProjectDomain - Update a project domain
- removeProjectDomain - Remove a domain from a project
- addProjectDomain - Add a domain to a project
- verifyProjectDomain - Verify project domain
- getProject - Find a project by id or name

domains

- buyDomain - Purchase a domain
- checkDomainPrice - Check the price for a domain
- checkDomainStatus - Check a Domain Availability
- getDomainTransfer - Get domain transfer info.
- getDomainConfig - Get a Domain's configuration
- getDomain - Get Information for a Single Domain
- getDomains - List all the domains
- createOrTransferDomain - Register or transfer-in a new Domain
- patchDomain - Update or move apex domain
- deleteDomain - Remove a domain by name

dns

- getRecords - List existing DNS records
- createRecord - Create a DNS record
- updateRecord - Update an existing DNS record
- removeRecord - Delete a DNS record

# useful github endpoints

repos/create-for-authenticated-user
