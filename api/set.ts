/*
- Auth with GitHub and Vercel
- Create a Github repo: `gh repo create {repo}` (maybe also description, website, etc)
- Initialise repo folder `mkdir {repo} && git init && git remote add https://github.com/{org}/{repo}.git`
- Copy files in {repo} (from api)
- Create project on vercel: `vercel git connect`
- Vercel buy and set domain (ditch cloudflare/namecheap, for this)
*/
export const GET = async (request: Request) => {
  //
  return new Response("404");
};
