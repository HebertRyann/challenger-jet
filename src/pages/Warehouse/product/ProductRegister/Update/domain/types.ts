export type TypeTabNameEnableOrDisable = {
  keyTab: string;
  name: string;
  active: boolean;
};

export type TypeEntityWithIdAndName = {
  id: string;
  name: string;
  parent_id: string | null;
};
