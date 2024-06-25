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
  const {
    owner,
    repo,
    changes,
    isPr,
    pollForDeployment,
    originalBranchName,
    prBranchName,
    prDescription,
    prTitle,
  }: EditBody = await request.json();
  const Authorization = request.headers.get("Authorization");
  const octokit = new Octokit({ auth: Authorization });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users();
  console.log({ login });
  return { login };
};
