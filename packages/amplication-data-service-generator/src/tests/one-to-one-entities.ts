import { EnumDataType } from "../models";
import { Entity } from "../types";
const MAN_ID = "MenId";
const WOMAN_ID = "WomenId";
const MANS_WOMAN_FIELD_ID = "womenFieldId";
const WOMANS_MAN_FIELD_ID = "manFieldId";
export const MAN: Entity = {
  displayName: "Man",
  id: MAN_ID,
  pluralDisplayName: "Men",
  name: "Man",
  fields: [
    {
      id: "053e75d0-9f02-4142-8f61-46fbdbaa71bd",
      permanentId: "053e75d0-9f02-4182-8f61-46fbdbaa71b1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      dataType: EnumDataType.Lookup,
      displayName: "Woman",
      id: "womanFieldId",
      name: "woman",
      permanentId: MANS_WOMAN_FIELD_ID,
      required: false,
      searchable: true,
      unique: true,
      properties: {
        relatedEntityId: WOMAN_ID,
        relatedFieldId: WOMANS_MAN_FIELD_ID,
        allowMultipleSelection: false,
      },
    },
  ],
  permissions: [],
};

export const WOMAN: Entity = {
  displayName: "Women",
  id: WOMAN_ID,
  name: "Women",
  fields: [
    {
      id: "053e75d0-9f02-4182-8f61-46fbdbaa31bd",
      permanentId: "053e75d0-9f02-4182-8f61-46fbdbaa71b1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      dataType: EnumDataType.Lookup,
      displayName: MAN.displayName,
      id: MAN_ID,
      permanentId: WOMANS_MAN_FIELD_ID,
      name: "man",
      required: false,
      searchable: true,
      unique: true,
      properties: {
        relatedEntityId: MAN_ID,
        relatedFieldId: MANS_WOMAN_FIELD_ID,
        allowMultipleSelection: false,
      },
    },
  ],
  permissions: [],
  pluralDisplayName: "Womans",
};
