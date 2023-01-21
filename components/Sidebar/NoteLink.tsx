import React, { useState } from "react";

import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import Popup from "reactjs-popup";

interface NoteLinkProps {
  href: string;
  children: string;
  onDelete: () => void;
}

export const NoteLink: React.FC<NoteLinkProps> = ({
  children,
  onDelete,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleClickDots = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen((o) => !o);
  };

  return (
    <Link
      className="flex content-between items-center rounded-sm py-1 px-2 text-sm hover:bg-neutral-800 [&>svg]:hover:visible"
      {...props}
    >
      <span className="w-full">{children}</span>
      <HiDotsHorizontal
        className="invisible h-5 w-5 rounded-sm p-[1px] hover:bg-neutral-700"
        onClick={handleClickDots}
      />
      <Popup
        trigger={<div className="invisible" />}
        arrowStyle={{ display: "none" }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        position="right top"
      >
        <div className="w-44 bg-neutral-800 p-4 text-white">
          <button onClick={onDelete}>Delete</button>
        </div>
      </Popup>
    </Link>
  );
};
