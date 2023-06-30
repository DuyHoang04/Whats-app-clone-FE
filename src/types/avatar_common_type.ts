export type avatarPropsType = {
  type: string;
  image: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  setSelectFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
};

export interface ContextMenuCoordinates {
  x: number;
  y: number;
}

export type showContextMenuType =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>;
