import { BaseEditor, Descendant } from "slate";
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
  children: Descendant[];
};

export type CodeBlockElem = {
  type: "code-block" | null | string;
  children: Descendant[];
};

export type InlineMathElem = {
  type: "inline-math" | null | string;
  children: Descendant[];
};

export type LinkElem = {
  type: "link" | null | string;
  url: string;
  children: Descendant[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomElement = ParagraphElem | CodeBlockElem | InlineMathElem | LinkElem;

export type CustomText = FormattedPlainText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
};