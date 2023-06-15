import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { Dispatch, SetStateAction } from "react";

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
  id: string;
  type: "paragraph" | null | string;
  children: Descendant[];
};

export type CodeBlockElem = {
  id: string;
  type: "code-block" | null | string;
  children: Descendant[];
};

export type CodeElem = {
  id: string;
  type: "code" | null | string;
  children: Descendant[];
};

export type QuoteElem = {
  id: string;
  type: "quote" | null | string;
  children: Descendant[];
};

export type MathElem = {
  id: string;
  type: "math" | null | string;
  inline: boolean;
  children: Descendant[];
};

export type LinkElem = {
  id: string;
  type: "link" | null | string;
  url: string;
  children: Descendant[];
};

export type HeadingElem = {
  id: string;
  type: "heading" | null | string;
  level: "part" | "chapter" | "section" | "subsection" | "subsubsection";
  children: Descendant[];
};

export type CommandElem = {
  id: string;
  type: "cmd" | null | string;
  onSelect: (bool: boolean) => void;
  children: Descendant[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomElement =
  | ParagraphElem
  | CodeBlockElem
  | LinkElem
  | MathElem
  | CodeElem
  | QuoteElem
  | HeadingElem
  | CommandElem;

export type CustomText = FormattedPlainText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
};