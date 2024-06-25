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
export const POST = async (request: Request) => {
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

  return { login };
  // Get the SHA of the base branch: git/get-ref

  // Create the new branch: git/create-ref

  // Implement the changes: repos/delete-file + repos/create-or-update-file-contents

  // For creating a pull request: pulls/create
};
