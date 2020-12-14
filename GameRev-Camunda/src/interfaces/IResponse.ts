export interface ILink {
  method: string;
  href: string;
  rel: string;
}

// The response has more properties but these are the one that matters
export interface IDeploymentResponse {
  links: Array<ILink>;
  id: string;
  name: string;
  deploymentTime: string;
}
