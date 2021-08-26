import React from "react";
import { SchemaField } from "./SchemaField";
import { Schema } from "@amplication/data";

type Props = {
  schema: Schema;
  disabled?: boolean;
  applicationId: string;
  entityDisplayName: string;
};

export const SchemaFields = ({
  schema,
  disabled,
  applicationId,
  entityDisplayName,
}: Props) => {
  if (schema === null) {
    return null;
  }

  if (schema.type !== "object") {
    throw new Error(`Unexpected type ${schema.type}`);
  }
  if (schema?.properties) {
    return (
      <div>
        {Object.entries(schema.properties).map(([name, property]) => {
          if (!property) {
            throw new Error(`Missing property: ${name}`);
          }
          return (
            <div key={name}>
              <SchemaField
                propertyName={name}
                propertySchema={property as Schema}
                disabled={disabled}
                applicationId={applicationId}
                entityDisplayName={entityDisplayName}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
