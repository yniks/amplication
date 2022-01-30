import React from "react";

import classNames from "classnames";

import "./Icon.scss";

type IconSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

export type IconProps = {
  icon: string;
  size?: IconSize;
  className?: string;
};

const CLASS_NAME = "amp-icon";

export function Icon(props: IconProps) {
  return (
    <i
      className={classNames(CLASS_NAME, props.className, {
        [`${CLASS_NAME}--size-${props.size}`]: props.size,
      })}
    >
      {props.icon}
    </i>
  );
}
