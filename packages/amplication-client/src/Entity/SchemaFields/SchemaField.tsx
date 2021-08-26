import React from "react";
import { capitalCase } from "capital-case";
import { ToggleField, TextField } from "@amplication/design-system";
import EntitySelectField from "../../Components/EntitySelectField";
import EnumSelectField from "../../Components/EnumSelectField";
import RelatedEntityFieldField from "../RelatedEntityFieldField";
import RelationAllowMultipleField from "../../Components/RelationAllowMultipleField";
import { Schema } from "@amplication/data";
import OptionSet from "../OptionSet";

type Props = {
  propertyName: string;
  propertySchema: Schema;
  disabled?: boolean;
  applicationId: string;
  entityDisplayName: string;
  isSystemData?: boolean;
};

export const SchemaField = ({
  propertyName,
  propertySchema,
  disabled,
  applicationId,
  entityDisplayName,
  isSystemData,
}: Props) => {
  const fieldName = `properties.${propertyName}`;
  const label = propertySchema.title || capitalCase(propertyName);
  console.log(propertySchema);

  if (propertySchema.enum) {
    console.log({ propertySchema });

    if (propertySchema.enum.every((item) => typeof item === "string")) {
      return (
        <EnumSelectField
          label={label}
          name={fieldName}
          disabled={disabled}
          options={propertySchema.enum as string[]}
        />
      );
    } else {
      throw new Error(
        `Enum members of unexpected type ${JSON.stringify(propertySchema.enum)}`
      );
    }
  }
  switch (propertySchema.type) {
    case "string": {
      return <TextField name={fieldName} label={label} disabled={disabled} />;
    }
    case "integer":
    case "number": {
      return (
        <TextField
          type="number"
          name={fieldName}
          label={label}
          disabled={disabled}
        />
      );
    }
    case "boolean": {
      return <ToggleField name={fieldName} label={label} disabled={disabled} />;
    }
    case "array": {
      if (!propertySchema.items) {
        throw new Error("Array schema must define items");
      }

      switch (propertySchema.items.type) {
        case "object": {
          return (
            <OptionSet label={label} name={fieldName} isDisabled={disabled} />
          );
        }
        default: {
          throw new Error(
            `Unexpected propertySchema.items.type: ${propertySchema.type}`
          );
        }
      }
    }
    default: {
      switch (propertySchema?.$ref) {
        case "#/definitions/EntityId": {
          return (
            <EntitySelectField
              label={label}
              name={fieldName}
              disabled={disabled}
              applicationId={applicationId}
            />
          );
        }
        case "#/definitions/EntityFieldId": {
          return (
            <RelatedEntityFieldField entityDisplayName={entityDisplayName} />
          );
        }
        case "#/definitions/RelationAllowMultiple": {
          return (
            <RelationAllowMultipleField
              fieldName={fieldName}
              isDisabled={disabled}
              entityDisplayName={entityDisplayName}
            />
          );
        }
      }

      throw new Error(`Unexpected propertySchema.type: ${propertySchema.type}`);
    }
  }
};
