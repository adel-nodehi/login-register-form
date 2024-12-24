import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface ErrorMessageProp {
  message: string | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProp> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5 rounded bg-red-50 px-2 py-1 text-red-500">
      <FontAwesomeIcon icon={faTimesCircle} className="text-lg" />

      <p className="text-sm" role="alert">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
