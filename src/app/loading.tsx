import React from "react";
import { LoaderIcon } from "./svg/svg";

const Loading: React.FC = () => {
  return (
    <div className="pageLoad fixed inset-0 bg-skyBlue flex justify-center items-center z-20">
      <LoaderIcon className="w-28" />
    </div>
  );
};

export default Loading;
