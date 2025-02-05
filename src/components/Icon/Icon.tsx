import { IconPropTypes } from "./Icon.type";
import {
  Database,
  Home,
  User,
  Users,
  Layout,
  Folder,
  Layers,
  Info,
} from "react-feather";

export const Icon = (props: IconPropTypes) => {
  const { size = 20, name } = props;

  return name === "home" ? (
    <Home size={size} />
  ) : name === "user" ? (
    <User size={size} />
  ) : name === "users" ? (
    <Users size={size} />
  ) : name === "layout" ? (
    <Layout size={size} />
  ) : name === "layers" ? (
    <Layers size={size} />
  ) : name === "folder" ? (
    <Folder size={size} />
  ) : name === "database" ? (
    <Database size={size} />
  ) : name === "info" ? (
    <Info size={size} />
  ) : (
    <span>icon not available</span>
  );
};
