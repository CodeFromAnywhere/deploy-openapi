// Find vercel project by name: getProject

// List vercel project deployments: getDeployments

// Get vercel deployment status, wait until it's done: getDeployment
export const GET = async (request: Request) => {
  return new Response("Placeholder" + request.url);
};
