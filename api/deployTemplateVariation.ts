/**this is what i really need*/
export const POST = (context: {
  templateUrl: string;
  name: string;
  changes: {}[];
}) => {
  /**
- createRepo(name, templateUrl)
- createProject(repoUrl, environment variables)
- editRepo(changes)
- deploy
*/

  // where the project is hosted.
  const url = "";
  return new Response(JSON.stringify({ url }));
};

/** This is the #1 thing I should demo, after Anthropic releases tool use on their website. */
export const deployAnthropicArtifact = (context: {
  code: string;
  type: string;
}) => {
  const { type, code } = context;
  if (type === "react") {
    //sdk.self("deployTemplateVariation",{ templateUrl: "https://github.com/CodeFromAnywhere/anthropic-react-artifact-template", name, changes: [{path:"src/page.tsx",content:code}] })
  } else if (type === "html") {
    //sdk.self("deployTemplateVariation",{ templateUrl: "https://github.com/CodeFromAnywhere/vercel-template", name, changes: [{path:"public/index.html",content:code}] })
  }
};
