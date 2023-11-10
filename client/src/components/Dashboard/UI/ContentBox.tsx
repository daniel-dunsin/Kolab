import React, { ReactElement } from "react";

interface Props {
  children?: ReactElement | ReactElement[];
  header: string;
  headerSize: "small" | "large";
  maxHeight?: number;
}

const ContentBox = ({ headerSize, children, header, maxHeight }: Props) => {
  return (
    <article className="max-w-full bg-white p-[.8rem] rounded-xl shadow-md">
      <header>
        <h2
          style={{
            fontSize: headerSize === "large" ? "20px" : "17px",
          }}
          className="font-medium mb-2"
        >
          {header}
        </h2>
      </header>

      <div
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
          overflowY: "scroll",
        }}
      >
        {children}
      </div>
    </article>
  );
};

export default ContentBox;
