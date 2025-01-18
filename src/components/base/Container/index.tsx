import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto flex w-full max-w-7xl flex-col">{children}</div>;
};

export default Container;
