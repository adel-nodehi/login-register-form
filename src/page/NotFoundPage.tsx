import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      page not found. <Link to="/">back to home (click)</Link>
    </div>
  );
};

export default NotFoundPage;
