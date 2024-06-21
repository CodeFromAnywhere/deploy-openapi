# ⚠️⚠️⚠️ Work in progress ⚠️⚠️⚠️

OpenAPI spec:

- user-based oauth2 for github and vercel
- /get/{repo} => files (proxy => github.actionschema.com)
- /status/{repo} => status[] or status
- /set(repo,files,poll:boolean)=>status
- /edit(repo,path,changes,poll:boolean)=>status

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
