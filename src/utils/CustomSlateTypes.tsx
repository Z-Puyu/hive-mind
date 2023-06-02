import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type FormattedPlainText = {
  text: string;
  bold?: true;
  italic?: true;
  roman?: true;
  underline?: true;
  strikethru?: true;
  code?: true;
};

export type ParagraphElem = {
  type: "paragraph" | null | string;
  children: (CustomElement | CustomText)[];
};

export type CodeBlockElem = {
  type: "code-block" | null | string;
  children: CustomText[];
};

export type InlineMathElem = {
  type: "inline-math" | null | string;
  children: CustomText[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomElement = ParagraphElem | CodeBlockElem | InlineMathElem;

export type CustomText = FormattedPlainText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
};