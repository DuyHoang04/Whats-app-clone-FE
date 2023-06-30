import React, { useEffect, useRef } from "react";
import {
  CoordinatesType,
  ContextMenuPropsType,
} from "@/types/context_menu_type";

const ContextMenu: React.FC<ContextMenuPropsType> = ({
  options,
  coordinates,
  contextMenu,
  setContextMenu,
}) => {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetElement = event.target as Element;

      if (targetElement.id !== "context_opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(targetElement) &&
          !targetElement.classList.contains("bg-photopicker-overlay-background")
        ) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.addEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement>,
    callback: () => void
  ) => {
    e.stopPropagation();
    setContextMenu(false);
    callback(); // khi click thì chạy hàm call
  };

  console.log(contextMenu);
  console.log(coordinates);

  return (
    <>
      {contextMenu && (
        <div
          className={`bg-dropdown-background fixed py-2 z-[100] rounded-lg`}
          ref={contextMenuRef}
          style={{
            top: coordinates.y,
            left: coordinates.x,
          }}
        >
          <ul>
            {options.map(({ name, callback }) => (
              <li
                key={name}
                onClick={(e) => handleClick(e, callback)}
                className="px-5 py-2 cursor-pointer hover:bg-background-default"
              >
                <span className="text-white">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
