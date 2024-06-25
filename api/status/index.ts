import { Octokit, App } from "octokit";
type EditBody = {
  owner: string;
  repo: string;
  originalBranchName: string;
  isPr: boolean;
  prBranchName: string;
  prTitle: string;
  prDescription: string;
  changes: {
    path: string;
    action: "update" | "delete";
    url?: string;
    contents?: string;
  }[];
  pollForDeployment: boolean;
};

/**

*/
export const GET = async (request: Request) => {
  try {
    //const Authorization = ""

    const Authorization = new URL(request.url).searchParams.get("auth");
    const octokit = new Octokit({ auth: Authorization || "test" });
    // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    const res = await octokit.rest.users.getAuthenticated({});

    const login = res?.data?.login;
    console.log({ login, Authorization });

    return new Response(JSON.stringify(login));
  } catch (e) {
    return new Response("Pls login", { status: 403 });
  }
};
