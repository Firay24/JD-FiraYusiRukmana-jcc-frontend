import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col" {...props}>
      {children}
    </div>
  );
};

export default Container;
