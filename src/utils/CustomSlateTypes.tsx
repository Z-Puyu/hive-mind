import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { FuncObj } from "../components/windows/GraphMaker";

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
  children: any[];
};

export type CodeBlockElem = {
  id: string;
  type: "code-block" | null | string;
  children: any[];
};

export type CodeElem = {
  id: string;
  type: "code" | null | string;
  children: any[];
};

export type QuoteElem = {
  id: string;
  type: "quote" | null | string;
  children: any[];
};

export type MathElem = {
  id: string;
  type: "math" | null | string;
  inline: boolean;
  environment?: string;
  children: any[];
};

export type LinkElem = {
  id: string;
  type: "link" | null | string;
  url: string;
  children: any[];
};

export type HeadingElem = {
  id: string;
  type: "heading" | null | string;
  level: "part" | "chapter" | "section" | "subsection" | "subsubsection";
  children: any[];
};

export type CommandElem = {
  id: string;
  type: "cmd" | null | string;
  onSelect: (bool: boolean) => void;
  children: any[];
};

export type ThmElem = {
  id: string;
  type: "thm" | null | string;
  style: "dfn" | "thm" | "remark" | "eg" | "problem";
  title?: string; 
  withProof?: true;
  children: any[];
};

export type SolnElem = {
  id: string;
  type: "soln" | null | string;
  proof?: true;
  children: any[];
};

export type BookmarkElem = {
  key: string
  id: string;
  type: "bookmark" | null | string;
  title: string;
  dest?: string;
  destTitle?: string;
  customDesc: string;
  children: any[];
};

export type FuncPlotElem = {
  id: string;
  type: "func-plot" | null | string;
  functions: FuncObj[];
  children: any[];
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomElement =
  | ParagraphElem
  | CodeBlockElem
  | LinkElem
  | MathElem
  | CodeElem
  | QuoteElem
  | HeadingElem
  | CommandElem
  | ThmElem
  | SolnElem
  | FuncPlotElem
  | BookmarkElem;

export type CustomText = FormattedPlainText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
};