import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerFacilitator = ({ children, ...props }: ContainerProps) => {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col" {...props}>
      {children}
    </div>
  );
};

export default ContainerFacilitator;
