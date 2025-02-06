export const IconName = [
  "home",
  "user",
  "users",
  "layout",
  "layers",
  "folder",
  "database",
  "info",
  "",
] as const;

export type IconNameType = (typeof IconName)[number];
export interface IconPropTypes {
  name: string;
  size?: number;
}
