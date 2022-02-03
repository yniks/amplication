import { Button, EnumButtonStyle } from "@amplication/design-system";
import React from "react";
import PendingChanges from "./PendingChanges";
import "./PendingChangesBar.scss";

const CLASS_NAME = "pending-changes-bar";

type Props = {
  applicationId: string;
  closeFunction: () => void;
};
//TODO algin the icon to the title
const PendingChangesBar = ({ applicationId, closeFunction }: Props) => {
  return (
    <div className={CLASS_NAME}>
      <div>
        <Button
          buttonStyle={EnumButtonStyle.Clear}
          icon="close"
          onClick={closeFunction}
        />
      </div>
      <h2>Pending Changes</h2>
      <PendingChanges applicationId={applicationId} />
    </div>
  );
};

export default PendingChangesBar;
