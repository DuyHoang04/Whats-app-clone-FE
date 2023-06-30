export interface CoordinatesType {
  x: number;
  y: number;
}

export type ContextMenuPropsType = {
  options: { name: string; callback: () => void }[];
  coordinates: CoordinatesType;
  contextMenu: boolean;
  setContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
