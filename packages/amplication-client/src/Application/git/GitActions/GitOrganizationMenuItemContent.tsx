import React from "react";
import { githubOrgImageUrl } from "../../../util/github";
import { GIT_ORGANIZATION_FOR_DISPLAY } from "../SyncWithGithubPage";

type Props = {
  org: GIT_ORGANIZATION_FOR_DISPLAY;
};
export const GitOrganizationMenuItemContent = ({ org }: Props) => {
  return (
    <>
      <img
        src={githubOrgImageUrl(org.name)}
        style={{ width: 24, height: 24, marginRight: 8 }}
        alt="Git organization"
      />
      {org.name}
    </>
  );
};
