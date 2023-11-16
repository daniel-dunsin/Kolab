import React, { HTMLAttributes, ReactElement } from "react";

interface BaseProps<ChildrenType = any> {
  children?: ChildrenType | ReactElement | ReactElement;
  InnerProps?: HTMLAttributes<any>;
}

interface TableLayoutProps extends BaseProps {}

export const TableLayout = ({ children, InnerProps }: TableLayoutProps) => {
  return (
    <section
      {...InnerProps}
      className={`w-full rounded-md border-t-2 border-x-2 border-b-0 max-w-full overflow-x-scroll shadow-md ${InnerProps?.className}`}
    >
      {children}
    </section>
  );
};

interface TableHeaderProps extends BaseProps {}

export const TableHeader = ({ children, InnerProps }: TableHeaderProps) => {
  return (
    <header
      {...InnerProps}
      className={`min-w-fit rounded-t-md bg-primary text-white flex items-center ${InnerProps?.className}`}
    >
      {children}
    </header>
  );
};

interface TableHeaderEntryProps extends BaseProps<string> {
  width: number;
}

export const TableHeaderEntry = ({
  width,
  InnerProps,
  children,
}: TableHeaderEntryProps) => {
  return (
    <h3
      {...InnerProps}
      className={`${InnerProps?.className} text-left font-medium text-[1rem] flex-1 p-2 cursor-pointer`}
      style={{
        width: width,
        minWidth: width,
        maxWidth: width,
      }}
    >
      {children}
    </h3>
  );
};

interface TableRowsContainerProps extends BaseProps {}

export const TableRowsContainer = ({
  InnerProps,
  children,
}: TableRowsContainerProps) => {
  return (
    <div
      {...InnerProps}
      className={`flex flex-col w-full min-w-fit bg-white ${InnerProps?.className}`}
    >
      {children}
    </div>
  );
};

interface TableRowProps extends BaseProps {}

export const TableRow = ({ children, InnerProps }: TableRowProps) => {
  return (
    <div
      {...InnerProps}
      className={`${InnerProps?.className} min-w-fit border-b-[1.5px] flex`}
    >
      {children}
    </div>
  );
};

interface TableRowEntryProps extends BaseProps<string> {
  width: number;
}

export const TableRowEntry = ({
  children,
  width,
  InnerProps,
}: TableRowEntryProps) => {
  return (
    <div
      {...InnerProps}
      className={`${InnerProps?.className} text-left font-medium flex-1 p-2 cursor-pointer`}
      style={{
        width: width,
        minWidth: width,
        maxWidth: width,
      }}
    >
      {children}
    </div>
  );
};
