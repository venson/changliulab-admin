import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import { Button, CommonInputProps, useInput } from "react-admin";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import pako from "pako";

import "bytemd/dist/index.css";
import "./src/markdown.css";
import { bytesToBase64 } from "@/common/utils/base64";
import { MouseEventHandler, ReactEventHandler, forwardRef, useImperativeHandle } from "react";
import { resolve } from "path";

const plugins = [
  gfm(),
  math(),
  mermaid(),
];
export type MarkdownInputProps = CommonInputProps & { html: string };

const textEditor = new TextEncoder();
const MdInput = forwardRef((props: MarkdownInputProps, ref) => {
  const { html } = props;
  const { field } = useInput(props);
  const { field: markdownHtml } = useInput({ ...props, source: html });
  const markdownDom = document.getElementsByClassName("bytemd-preview");
  // console.log(markdownDom);
  // const domInnerHtml =
  const saveHtml = async () => {
    return new Promise((resolve, reject) => {
    const markdownInnerHtml = markdownDom && markdownDom[0].innerHTML;
    const htmlPako = pako.deflate(textEditor.encode(markdownInnerHtml));
    markdownHtml.onChange(bytesToBase64(htmlPako));
    console.log('save markdown to html')
    });
  };
  // const saveHtml = () => {
  //   const markdownInnerHtml = markdownDom && markdownDom[0].innerHTML;
  //   const htmlPako = pako.deflate(textEditor.encode(markdownInnerHtml));
  //   markdownHtml.onChange(bytesToBase64(htmlPako));
  //   console.log('save markdown to html')
  // };
  useImperativeHandle(ref, () => ({
   saveHtml
  }));

  // console.log(field);
  return (
    <div className="text-left w-full">
      <Editor
        value={field.value}
        plugins={plugins}
        // mode="split"
        onChange={(v) => {
          field.onChange(v);
        }}
        // uploadImages={uploadImages}
      />
      <Button onClick={saveHtml} label="Save Markdown"></Button>
    </div>
  );
});
export default MdInput;
