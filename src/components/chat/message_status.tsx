import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

type messageStatusPropsType = {
  status: string;
};

const MessageStatus: React.FC<messageStatusPropsType> = ({ status }) => {
  return (
    <div>
      {status === "sent" && <BsCheck className="text-lg" />}
      {status === "delivered" && <BsCheckAll className="text-lg" />}
      {status === "read" && <BsCheck className="text-lg text-icon-ack" />}
    </div>
  );
};

export default MessageStatus;
