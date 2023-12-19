import React from "react";
import { Alert, AlertColor, AlertTitle } from "@mui/material";

export type NotificationProps = {
  type: AlertColor, 
  message: string
};
const Notification: React.FC<NotificationProps> = ({type, message}) => {
  const capitalize = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Alert severity={type}>
      <AlertTitle>
        <b>{capitalize(String(type))}</b>
      </AlertTitle>
      {message}
    </Alert>
  );
};

export default Notification;