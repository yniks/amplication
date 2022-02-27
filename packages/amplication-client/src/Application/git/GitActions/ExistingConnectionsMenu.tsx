// import SelectMenu from "../SelectMenu/SelectMenu";
// import SelectMenuButton from "../SelectMenu/SelectMenuButton";
import {
  EnumButtonStyle,
  SelectMenu,
  SelectMenuItem,
  SelectMenuList,
  SelectMenuModal,
} from "@amplication/design-system";
import React from "react";
import { GIT_ORGANIZATION_FOR_DISPLAY } from "../SyncWithGithubPage";
import "./ExistingConnectionsMenu.scss";
import { GitOrganizationMenuItemContent } from "./GitOrganizationMenuItemContent";
type Props = {
  gitOrganizations: GIT_ORGANIZATION_FOR_DISPLAY[];
  selectedGitOrganization: GIT_ORGANIZATION_FOR_DISPLAY | null;
  onAddGitOrganization: () => void;
  onSelectGitOrganization: (
    organization: GIT_ORGANIZATION_FOR_DISPLAY,
    index: number
  ) => void;
};

export default function ExistingConnectionsMenu({
  gitOrganizations,
  selectedGitOrganization,
  onAddGitOrganization,
  onSelectGitOrganization,
}: Props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Select organization:</span>
        <SelectMenu
          title={selectedGitOrganization?.name || ""}
          buttonStyle={EnumButtonStyle.Primary}
        >
          <SelectMenuModal>
            <SelectMenuList>
              <>
                {gitOrganizations.map((organization, i) => (
                  <SelectMenuItem
                    selected={selectedGitOrganization?.id === organization.id}
                    key={organization.id}
                    onSelectionChange={() => {
                      onSelectGitOrganization(organization, i);
                    }}
                  >
                    <GitOrganizationMenuItemContent org={organization} />
                  </SelectMenuItem>
                ))}
                <div
                  style={{
                    backgroundColor: "#22273c",
                    borderBottom: "none",
                    width: "100%",
                    display: "flex",
                  }}
                  className="select-menu_item "
                >
                  <hr style={{ width: "100%" }} />
                </div>

                <SelectMenuItem
                  onSelectionChange={() => {
                    onAddGitOrganization();
                  }}
                >
                  <span>Add another organization</span>
                </SelectMenuItem>
              </>
            </SelectMenuList>
          </SelectMenuModal>
        </SelectMenu>
      </div>
    </div>
  );
}
