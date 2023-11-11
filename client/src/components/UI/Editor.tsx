import React, { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props extends ReactQuillProps {}

const Editor = ({ ...props }: Props) => {
  return <ReactQuill theme="snow" {...props} />;
};

export default Editor;
