import { AppInfo } from "../../index";
import { Module } from "../../types";

const basePackageJson = {
  name: "",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: "",
  license: "ISC",
  dependencies: {
    axios: "^0.23.0",
  },
};

export function createPackageJson(
  appInfo: AppInfo,
  baseDirectory: string
): Module {
  basePackageJson.name = appInfo.name;
  return {
    code: JSON.stringify(basePackageJson),
    path: `${baseDirectory}/package.json`,
  };
}

//TODO pritter the package.json
