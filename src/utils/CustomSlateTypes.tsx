import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type FormattedPlainText = {
  text: string;
  bold?: true;
  italic?: true;
  roman?: true;
};

export type ParagraphElem = {
  type: "paragraph" | null;
  children: (CustomElement | CustomText)[];
};

export type CodeBlockElem = {
  type: "code-block" | null;
  children: CustomText[];
};

export type InlineMathElem = {
  type: "inline-math" | null;
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