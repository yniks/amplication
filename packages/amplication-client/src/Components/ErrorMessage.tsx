import { Icon } from "@amplication/design-system";
import classNames from "classnames";
import React from "react";
import "./ErrorMessage.scss";
type Props = {
  errorMessage: string | string[] | undefined | null;
  className?: string;
};

const CLASS_NAME = "amp-error-message";

export const ErrorMessage = ({ errorMessage, className }: Props) => {
  return (
    <div className={classNames(CLASS_NAME, className)}>
      <Icon icon="alert_circle" />
      {errorMessage}
    </div>
  );
};
