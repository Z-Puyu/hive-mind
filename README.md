# Orbital 2023 Milestone I

## Team Name

HiveMind

## Proposed Level of Achievement

Apollo 11

## Motivation

For students with sensitive nerves of aesthetics, note-taking during lessons can be fraught with frustrating moments:

- To insert additional remarks, one has to resolve to either **messy scribblings** or **random post-it** notes along page margins.
- To mark out a linkage between concepts from different chapters, one has to populate the notebook with **long-winded arrows** and **unsightly symbols** to simulate a hyperlink.
- To just beautify the notes contents, one has to spend **tonnes of time** designing and polishing the layout and formatting of note-taking.
- Even for digital note-taking, the aesthetic sensibilities of many would get rackled frequently by **unintuitive** editor UI, **misaligned** mathematical expressions, **ugly** tables and unstable text formatting that **goes hay-wire** with the insertion of a small illustration.

Similar situations like the above make us wonder: why does notes-taking — an important task of so many students — have to be so redundantly troublesome and inefficient? Thus, we wish to create a Web-based note-taking application that is simple to use and integrated with many popular features from the various text editors.

In the process, we hope to explore and learn the intricacies behind user interface and interaction design. In particular, we would like to make sense of what defines an *intuitive* UI, and how the various features of good interaction are implemented in code.

## Aim

By building a collaborative note-editing web-application with intuitive UI and navigation, we hope to alleviate students’ pain in doing repetitive and redundant refinement work in formatting or typesetting their notes, as well as enabling high-quality note templates to be circulated and readily accessible among peers.

## User Stories

1. As a student, I want to consolidate my learning and ensure that my understanding is correct by cross-referencing with others or group audit.
2. As a student, I want to replicate the structure with which other people have organised their notes, so that I can polish and condense my own notes more efficiently.
3. As a student, I want to hyperlink contents from different sections in my notes so that I can easily cross-refer between them during revision.
4. As a student, I want to insert additional annotations, exam tips and remarks during revision without disrupting the original structure and formatting of my notes.
5. As a student who learns better with visual guides, I want to borrow others’ aesthetic illustrations, graphs and tables to improve my own notes.
6. As a science-major student, I want a notes editor with built-in support for $\LaTeX$ so that I can typeset large amounts of mathematics with ease.
7. As a perfectionistic student, I want the page layout, paragraphs, remarks, illustrations and equations in my notes to be aesthetically formatted without me having to make much effort.
8. As a lazy student, I don't see the point of writing my own notes from scratch, and want to collectively build a set of notes with my peers.

## Case Study on Existing Note-taking Tools

We conducted a case study on the various mainstream note-taking tools to learn about their features, advantages and pitfalls.

1. Google Docs
   - Pros
     1. Light-weight, fully accessible as long as one has a Google account.
     2. Easy to set up for collaborative editing and group audit.
   - Cons
     1. Requires network connection to save changes.
     2. Incapable of writing complex mathematics because only a small selected set of mathematical symbols is accessible.
     3. Inefficient to typeset equations — the user has to manually search for and click on the symbols from the drop-down GUI menus, instead of typing $\LaTeX$ commands directly.
2. Microsoft Word
   - Pros
     1. Nearly zero learning cost - every Windows user knows how to use it.
   - Cons
     1. Buggy text display on screen and potential crash may cause loss of work progress.
     2. Notoriously ugly look of typesetting of mathematical expressions.
     3. Incomplete support for $\LaTeX$ such that the user often has to guess which commands are available.
3. Overleaf
   - Pros
     1. Light-weight, web-based editor with project management features.
     2. Full-fledged support for $\LaTeX$ with the ability of importing third-party packages.
     3. Widely used in academia.
   - Cons
     1. Insufficient code highlighting and auto-formatting options, which potentially makes the code messy when writing complex mathematics.
     2. Does not support real-time rendering but instead re-renders the whole document for every re-compilation.
4. Vim/VSCode + TeXLive/MiKTeX
   - Pros
     1. Extremely flexible and customisable due to a large number of available plugins which enable a variety of fancy features.
     2. Full-fledged support for $\LaTeX$ with the ability of importing third-party packages.
     3. Support user-defined code snippets, which tremendously boosts the speed of typesetting.
     4. Extensive code highlighting and auto-formatting options.
   - Cons
     1. Fairly steep learning curve.
     2. Difficult to set up collaborative projects.
5. Markdown Editors (e.g. Typora)
   - Pros
     1. Easy to learn while still producing overall aesthetic documents.
     2. Simple syntaxes which allows efficient note-taking.
     3. Considerable amount of support for $\LaTeX$.
   - Cons
     1. Unable to render complex mathematics with detailed typesetting adjustments. For example, in this very Markdown document, 
        `$\int\! f(x) \,\mathrm{d}x$` would get incorrectly rendered as $\int\! f(x) \,\mathrm{d}x$.
     2. Difficult to set up collaborative projects.
6. Notion
   - Pros
     1. Very easy and efficient to adjust the order of paragraphs by dragging and dropping blocks.
     2. Support direct input of $\LaTeX$ code to typeset mathematics with real-time preview and rendering.
     3. A variety of custom blocks to cater to different types of notes.
   - Cons
     1. For people with experience in using $\LaTeX$, inserting inline mathematics is anti-intuitive as Notion uses its own custom hotkey combination to activate inline math mode instead of the standard $\LaTeX$ syntax.
     2. Does not support auto-completion of $\LaTeX$ commands.
     3. The equation block is flagged with the `displaymath` environment from $\LaTeX$ by default, which disables a lot of typesetting options.
     4. Uses KaTeX to provide support for rendering mathematics, which is less flexible because KaTeX only contains a limited number of $\LaTeX$ packages and disallows user-imported packages.

## Scope of Project

HiveMind is a **website application** for note-taking which provides extensive support for $\LaTeX$ to typeset not only most of the mathematics a student would need, but also plain texts using just standard $\LaTeX$ commands, so that there should be nearly zero learning cost in transitioning to HiveMind from any other $\LaTeX$ editor. Additionally, both inline and displayed mathematics should get rendered in real time as the user types in $\LaTeX$, so as to make typesetting mathematics as seamless and smooth as typing regular texts.

We envision HiveMind to be a modular editor. This means that every title, paragraph, equation, remark, theorem, definition, proof, problem... i.e., all parts and pieces that combine together to form the document for your notes, should be a component that can be freely moved and placed to any location in the document by simply dragging and dropping. We thus decided to study the features of Notion and emulate its block feature.

Regarding the tool to render $\LaTeX$ into webpage, we can use either KaTeX or MathJax which are both well-designed JavaScript libraries for displaying mathematics in the browser. With much research and contemplation, we eventually decided to use MathJax due to its better extensibility with third-party $\LaTeX$ packages.

## Features

### Modular Note-editing

#### [Proposed]

Inspired by Notion, we propose to make HiveMind a modular editor.

Inside every project the user has created in HiveMind, the main editor contains a list of editable components known as TeXBoxes. We name it as such because these are essentially text-boxes we see in editors like Microsoft Word, but their inner contents are rendered by $\LaTeX$ rather than as plain texts. By double-clicking on a TeXBox, the user can edit the contents inside it, and by click and hold on a TeXBox, the user can move the mouse to drag the TeXBox to some other location in the document, and release to drop the TeXBox there. This way, the user can adjust the order of paragraphs in a document as easily as moving a post-it note.

Beside plain texts, every TeXBox may also contain inline mathematics (or other inline scientific notations). Similar to a TeXBox, double-clicking on these inline components calls out a pop-up input area to edit the $\LaTeX$ statements corresponding to the mathematics displayed.

Graphs, tables, code blocks and other types of components in the notes should be able to get shifted around using the same drag-and-drop logic.

#### [Current Progress]

We employed **Slate.js** to implement the notes editor. This decision was made based on two main reasons:

- First, Slate.js is a relatively new library for making rich text editors with a very active user community, which means that it offers better support for more modern rich text functionalities and it is easier to find up-to-date resources and guide regarding the features we wish to implement.
- Second, the design philosophy behind Slate.js coincides with our project in many ways. One prominent instance is that Slate.js organises rich text components into different nodes, which are packed into a tree structure based on their subsetting relationship. This highly resembles our idea of a modular editor consisting of different movable parts of contents.

With the extremely flexible components and methods provided by Slate.js, we quickly managed to transform the functionalities we have been experimenting on into a working prototype. 

On start-up, the editor is initialised with a single TeXBox containing an empty paragraph. When the user press the Enter key while the TeXBox is focused, a new TeXBox will be instantiated right after the current working TeXBox and get automatically focused. Furthermore, pressing Backspace in an empty input field will delete the current working TeXBox.

We have also implemented a variety of formatting options and a toolbar, which works just like any othe rich text editor. For example, to bold some texts, the user just needs to select those texts and press the "boldface" button in the toolbar. The currently supported formatting options are: **boldface**, *italic*, <u>underline</u>, <s>strike-through</s>, `inline code`, <a>link</a> and $\LaTeX \textrm{-rendered mathematics}$. These formats, except $\LaTeX$, can be composed onto one another freely, so a user can easily write <a><strong><i><u><s><code>some underlined inline code struck through and wrapped into a link with a boldface italic font</code></s></u></i></strong></a>, which can be more than a bit tiring to achieve in a markdown document like this (you have to nest 6 HTML tags to get it properly displayed but pressing 6 buttons will do the trick with our application).

Beside these inline rich-text formatting, we have also implemented special formatting options to block-level contents, including `code block`, block quote and displayed mathematics. These also have their respective tooltip buttons in the toolbar to switch between different blocks.

We could have implemented support for different fonts into our application so that the user can freely choose the font to use from those installed in his or her device. However, we eventually decided to abort this idea. This is because most fonts do not have sufficient support for mathematical and other scientific symbols, which means even if we allow users to change the font of normal texts, these fonts will not be able to be applied to $\LaTeX$ rendering, causing a unsightly difference between texts and mathematics just like you have seen in this document. So we resolved to fixing the font used in our editor ― but what font should we use then? There are two fonts that offer comprehensive support for scientific symbols, namely Times New Roman and STIX Two. We have chosen to use Times New Roman because it is the default font used by $\LaTeX$.

The drag-and-drop mechanism has been implemented using **dnd-kit**. We chose to use this package instead of writing our own logic because of two reasons:

- First, we wish the mechanism to be complex enough to be able to sustain smooth user interactions. As such, using a mature package with pre-engineered methods would be much less bug-prone than building our own logic from scratch, especially considering our lack of experience with such mechanisms. We can instead make minor tweaks using the pre-existing methods to more easily achieve our desired behaviour.

- Second, dnd-kit allows all draggable components to be wrapped in its context provider. This means we can easily build a universal mechanism which is general enough to be extended onto every component we add to our application, thus reducing repetitive work. These context providers can then be nested, which means we can achieve different drag-and-drop behaviours for different blocks by simply overriding certain properties or methods without the need to write separate logic.

The user can hold the mouse on any block-level component in the notes to drag it around. Meanwhile, an opaque clone will stay at the original position of the dragged component for the user to compare the paragraph ordering before and after the component is dropped. 

#### [Future Plan]

On to the next phase, we have two major tasks:

1. Incorporate more formatting options into our editor. The most important items include: (ordered and unordered) lists, proofs, definitions and theorem blocks.

2. Implement and improve the drag-and-drop mechanism on the various components in our editor. Primarily, these will include TeXBoxes, displayed mathematics, block quotes, code blocks, paragraphs, titles and theorem- and proof-like blocks. 

#### [Potential Addtions]

Here we list a few good-to-have features:

1. Syntax highlighting for code blocks which support different programming languages.

2. Smooth animations during dragging and dropping blocks.

3. "Transfer Station" which hosts temporary copies of blocks deemed potentially useful by the user, such that the user can retrieve them directly from the station to paste in the appropriate position without needing to browse back and forth to search for the blocks. 

4. Ability to merge neighbouring blocks into one block to be moved around together.

### Intuitive and Smooth User-Interface Interactions

#### [Proposed]

It is great pain when one has to frequently switch between the keyboard and the mouse while editing a long document like lecture notes. Not only does it slow down typing, but it also disrupts the note-taking and thinking processes. Therefore, we aim to build the logic for the user interface such that only a minimal, if any, number of actions need to be completed with the mouse. Ideally, the user should not need to leave the keyboard during the whole process of note-editing except to re-order the modular components. For instance, the following features will be implemented:

1. The user can switch between neighbouring TeXBoxes by Ctrl + Up and Ctrl + Down key combinations. The hotkeys are designed as such because TeXBoxes are arranged as a vertical array.
2. When the caret reaches either inline or displayed mathematics, the $\LaTeX$ input area will pop up automatically either on top or below the selected mathematics. Intuitively, the user can press Up or Down keys respectively to enter the input area. Otherwise, the user can continue to move the caret away.
3. After editing in the $\LaTeX$ input area, the user can click the confirm button, press Enter, or click anywhere outside of the input area to exit it, which would also set the caret right after the mathematics automatically.
4. Special actions such as opening a new $\LaTeX$ environment to insert displayed equations, making new sections or titles should be binded to either hotkeys or slash commands.

#### [Current Progress]

$\LaTeX$ rendering is of particular importance to our application so we decided to first tackle the various interactions with it. We have spent much time and effort contemplating and experimenting in order to find out the best way to implement it for the optimal user experience. In the very initial implementation, a input box will pop up and get focused when inserting an inline math component for the user to type in $\LaTeX$ code, and the rendered result will be displayed in the TeXBox. However, $\LaTeX$ cannot be rendered in the browser in the same way as texts and it blocks cursor movement (the caret will disappear when one attempts to move it across the inline mathematics). Hence, to ensure browser-compatibility such that the caret is not obstructed, we had to make the rendered inline mathematics a **read-only** block so that the caret "jumps over" it when direction keys are pressed. One severe problem this had led to was that a read-only block cannot be selected (actually there might be a possible walk-around but it could be highly tedious and bug-prone), so the user has to click on the block to activate the input box, and click on the paragraph after closing the input box to focus on the texts again. This deviated from our vision of a mouse-free user experience.

In searching for an alternative, an inspiration struck: instead of using an **inline display + hovering input box**, can we switch them and use an **inline input + hovering preview box** instead? Following this idea, we rebuilt the input mechanism for $\LaTeX$ such that the user can insert a $\LaTeX$ block by either clicking the math-mode tooltip button or pressing "\$", after which the user can directly type in $\LaTeX$ and preview the output in a hovering box that pops up automatically. When the user completed, he or she can return to normal text mode by pressing Enter or moves the caret away from the $\LaTeX$ code, which will then be replaced by the rendered mathematics. Note that in this implementation, the $\LaTeX$ component is no longer read-only but an editable inline element. This means that it can be selected and focused just like any other texts. Therefore, when the user moves the caret into the inline mathematics, the $\LaTeX$ code will become visible and the preview box will appear again automatically, and mouse clicking is no longer necessary.

Besides implementing $\LaTeX$ input, we have also added hotkey bindings for the text formats currently supported in our editor. The list is as follows:

- mod + B: boldface

- mod + I: italic

- mod + R: regular

- mod + U: underline

- mod + S: strike-through

- mod + `: inline code

- mod + K: link

All of the above hotkeys have their tooltip button equivalents in the toolbar. Toggling a format with texts selected will apply the format onto the currently selected texts, whereas toggling a format with a collapsed selection will cause the proceding input from the caret position to be applied with the format.

Regarding the toolbar, we initially append it to every block in the editor, but this soon led to a problem: most text formats such as boldface and italic texts are not used at all in certain special types of blocks such as a code block, so it is redundant to still show the toolbar. Therefore, we decided to make the visibility of the toolbar conditional such that it only shows up in a text block (i.e. paragraph, heading) while it is focused. An unexpected benefit this has brought is that the editor now looks cleaner because there can only be at most one visible toolbar concurrently. 

#### [Future Plan]

We will keep updating the hotkey bindings and tooltip buttons to synchronise with new formatting options added. For $\LaTeX$ input, we wish to upgrade it such that toggling math mode with texts selected will wrap the selected texts into $\LaTeX$ environment.

Meanwhile, we are planning to split the toolbar. Currently, both text- and block-level formatting buttons are in the same toolbar. However, since the toolbar is invisible in certain special blocks such as a code block, this makes hotkey the only possible way to switch back from a special block to a text block, which compromises much flexibility. Hence, the block-toggling buttons should be placed at a separate toolbar which is always visible as long as the block is focused.

We would also continue to improve the various interactions and hotkeys with regard to webpage navigation. We expect this to be a continuous and long-term process in a sense that new interactions and UI components will be implemented wherever and whenever they are deemed appropriate.

#### [Potential Additions]

Inspired by Notion, we have found that slash commands are a very useful feature to reduce the frequency of mouse-clicking while using the application, which offers a great boost to efficiency. Besides, many custom $\LaTeX$ environments are also delimited with slash commands (\begin{...} and \end{...}), so this potentially makes it possible to integrate more $\LaTeX$ environment into our application.

### Real-time Rendering of $\LaTeX$ Contents

#### [Proposed]

One limitation to most $\LaTeX$ editors is the lack of real-time preview of the code entered. Note that in $\LaTeX$ we often need to typeset things like:

```LaTeX
\begin{align*}
    L & = \int_{1}^{2}\! \sqrt{1 + \left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2} \,\mathrm{d}x \\
      & = \int_{1}^{2}\! \sqrt{1+(2(x-1))^2} \,\mathrm{d}x \\
      & = \frac{1}{2} \int_{0}^{\tan^{-1}2}\! \sec^2\theta \sqrt{1 + \tan^2\theta} \,\mathrm{d}\theta \\
      & = \frac{1}{2} \int_{0}^{\tan^{-1}2}\! \sec^3\theta \,\mathrm{d}\theta
\end{align*}
```

For long mathematics like this (which is yet to be considered as "complex"), the user has to frequently re-compile the document to preview the rendering result, which is troublesome and time-consuming as it can be slow to re-render a long document. Therefore, we realise that it is important to incorporate $\LaTeX$ such that mathematics produced would get rendered in real-time.

#### [Current Progress]

We have employed the **better-mathjax-react** Node package to help implement $\LaTeX$ rendering. After entering math mode, the mathematics rendered by MathJax as preview will synchronise with the $\LaTeX$ statements typed.

We wished to improve further such that the rendered mathematics only updates when the $\LaTeX$ statements in the input area is legal and complete. Otherwise, the mathematics displayed remains the same as before the change in $\LaTeX$ code. The intent of this proposed improvement was to prevent the user from seeing flashes of incomplete rendering or error messages from $\LaTeX$ compiler. However, "better-mathjax-react" is engineered with the technical pitfall where only static contents are allowed if we were to configure the rendering process to be such, i.e. the user will not be able to edit the $\LaTeX$ code to be rendered once it is initialised. Therefore, we had to discard this idea.

#### [Future Plan]

We would reuse the same mechanism when we implement displayed mathematics such as equation blocks. Another aspect worth taking note of is that $\LaTeX$ environments may be required or useful in other components, such as wrappings for theorems, definitions and proofs.

### Hyperlink between Notes Components

#### [Proposed]

Concepts in different chapters may have interconnections with one another, and therefore it is useful to be able to quickly cross-refer back and forth between these related concepts while revising using the notes. Thus, we plan to implement hyperlinks in HiveMind to allow the user to set markers to related components, so that later the user can simply click on the marker to jump between the various parts.

For example, the user can set up a marker at a formula, and set up another marker at the definition from which the formula is derived, so that when the first marker is clicked, it will lead the user to the location of the definition.

Ideally, a marker should be able to be set at an arbitrary number of locations. This means that the user can link ten different equations with one marker, such that when this marker is activated, it calls out a menu where the user can select which location to jump to. The user can annotate each of the locations with a custom tag to serve as a brief description of the contents over at the referenced position.

### GUI-based Illustration Maker

#### [Proposed]

Making beautiful graphs and diagrams with $\LaTeX$ can have a very steep learning curve, but it provides a high degree of precision which is hard to emulated with other illustration makers. Therefore, we propose to build a GUI-based illustration maker inside the editor of HiveMind which hides the specific $\LaTeX$ code behind an abstraction barrier and allows the user to generate aesthethic illustrations with a more visual interface. This illustration maker should be applicable to at least the following items:

- Matrices
- Tables
- 2D graphs
- Geometric diagrams

### Project Management System

#### [Proposed]

The project manager of HiveMind is inspired by Overleaf. Instead of behaving like conventional document managers that group files into folders, the project management in HiveMind is done via tags.

The user first create some custom tags, and then assign the tags to the projects to indicate some shared characteristics among them. For example, a user might want to tag all his maths notes with "Math" and all his physics notes with "Physics". The advantage of using tags is that the same project can be placed to a number of different groups. For instance, the notes for computational genomics may appear under "CS", "Math", "Statistics" and "Biology" tags such that clicking on any of the four groups is able to access the project.

### Collaborative Note-taking

#### [Proposed]

What is the point of taking down notes for everything on your own, if your peers are also taking notes for the very same contents? In our everyday experiences, we realise that a large part of notes contents would appear to be very similar among different students taking a certain course. For example, the notes on the epsilon-delta definition of limits would be exactly the same for all students learning calculus. This means that instead of each making his or her own notes, it suffices for all these students to share one set of notes.

Thus, we propose to incorporate collaborative editing into HiveMind. Users may create and share collectively owned projects to co-edit or conduct group audit, allowing higher efficiency in note-taking as a group. At the same time, this also allows one to take reference or gain insights from the notes written by someone else, after which he or she may find it helpful to copy over the section to his or her own notes.

## Tech Stack

1. React.js
2. JavaScript, TypeScript
3. Node.js
4. Slate.js
5. MathJax
6. $\LaTeX$

## Proof-of-concept

The [project poster](https://drive.google.com/file/d/1iGHT04W8h5N5H2RU6KsVlVeNxAIIhOCD/view?usp=share_link) and [project video](https://drive.google.com/file/d/11urJgv1n9FsqEqYKHdD4jG00sjB7-DRh/view?usp=share_link) can be accessed from here.

We have also deployed a [mini-demonstration project](https://hive-mind-inky.vercel.app/).

To enter the editor, press "Login" from the top navigation bar, and then click on "Editor" to view the sample page.

This project demonstrates some basic features and interactions in the notes editor of HiveMind, including:

- Click on a TeXBox to open and auto-focus to the input field for $\LaTeX$;
- Type $\LaTeX$ in the input field to see it rendered in real time;
- Press Enter in the input field to insert a new TeXBox below the current working TeXBox;
- Press Backspace in an empty TeXBox to delete it.

## Proof-of-concept

The [project poster](https://drive.google.com/file/d/1iGHT04W8h5N5H2RU6KsVlVeNxAIIhOCD/view?usp=share_link) and [project video](https://drive.google.com/file/d/11urJgv1n9FsqEqYKHdD4jG00sjB7-DRh/view?usp=share_link) can be accessed from here.

We have also deployed a [mini-demonstration project](https://hive-mind-inky.vercel.app/).

To enter the editor, press "Login" from the top navigation bar, and then click on "Editor" to view the sample page.

This project demonstrates some basic features and interactions in the notes editor of HiveMind, including:

- Click on a TeXBox to open and auto-focus to the input field for $\LaTeX$;
- Type $\LaTeX$ in the input field to see it rendered in real time;
- Press Enter in the input field to insert a new TeXBox below the current working TeXBox;
- Press Backspace in an empty TeXBox to delete it.

## Timeline and Development Plan

- **7-15 May**
  - Finalised Lift-off video and poster.
  - Learn about relevant technologies: JavaScript, TypeScript, Git.
- **15-29 May**
  - Learn about relevant technologies: React, Node.js, MathJax.
  - Experiment basic features: modular input areas, real-time $\LaTeX$ rendering, hotkey binding.
- **30 May-10 June**
  - Implement fully modular note-editing (with drag-and-drop mechanism).
  - Implement $\LaTeX$ input and rendering.
  - Implement simple hotkey binding.
- **10-20 June**
  - Implement a prototype of project manager.
  - Continue to work on hotkey binding.
  - Implement hyperlink between notes components.
- **21-26 June**
  - Implement tags into the project manager.
  - Test and fix potential bugs.
  - Prepare for Milestone II.
- **27 June-10 July**
  - Implement GUI illustration maker.
  - Work on styling of webpage.
  - Implement user account manager and login feature.
- **10 July-20 July**
  - Implement collaborative note-taking.
  - Continue working on styling of webpage.
  - (Tentative) Add more functions to the illustration maker.'
  - (Tentative) Add "export as PDF" and "export as $\LaTeX$ source code" functions to the notes editor.
- **21-24 July**
  - Test and fix potential bugs.
  - Prepare for Milestone III.

The **Project Log** is attached [here](https://docs.google.com/spreadsheets/d/1vAOZ7g_3GZcTc47UXCHAcNvJ3GAxhJOIIIlv9_ZGqss/edit#gid=0)


## Git Workflow

In this project, our team follows the following Git workflow:

- After every major feature implementation or bug fix, the updated files should be immediately commited and pushed to the respective branch.

- All new features and major changes to existing code should be experimented and implemented in a new branch first before they are merged into the main branch.

- Branches should be named succintly with the main feature they serve to implement.

- In principle, the main branch should not be commited directly.

- The README should be updated accordingly along with every major update or addition of features to prevent omission of details.

## Appendix: Coding Convention

This project is built with the following coding convention:

- Indentations are **2** spaces.
- Always use **";"** and **","** wherever applicable.
- All folders are to be named in **kebab-case**.
- All .tsx and .css files are to be named in **PascalCase** except *index.tsx*.
- *Classes* in CSS modules are to be named in **camelCase** (due to syntax conflicts with kebab-case naming).
- Each React component file should contain **one and only one** top-level component function that has **the same name** as the file.
- *Component functions*, *interfaces* and *classes* are to be named in **PascalCase** while all other *functions* and *variables* are to be named in **camelCase**.
- *Component functions* should be declared using `export default function`, while *nested functions* should be declared using `const` and Lambda expressions.
- All variables and functions should have their types **explicitly** declared whenever possible.
- Types of props for component functions are to be defined as interfaces.
- Functions passed on as props must be **declared beforehand**, rather than anonymous Lambda expressions, except functions which contain only a single statement.
- Leave one empty line between every two functions, before every return statement and after import statements.
- An empty line should also be used to separate statements when they clearly belong to different semantic blocks.
- Always write a **default branch** for switch statements.
- Use **optional chaining** instead of contional statements for null-checks.
- When an HTML tag contains more than 2 properties or the line containing the HTML tag is longer than 100 characters, each property should occupy its own line.
- Every line of code should be **within 100 characters** in length.
- The chaining operator "." **must not be at the end** of a line should a statement breaks.
- When a string concatenation statement breaks, the "+" operator should always be placed **at the end** of each line where it breaks.
- **Nested** HTML tags in return statements should be wrapped inside parentheses.
- Functions passed on as props must be **declared beforehand**, rather than anonymous Lambda expressions.
- Leave one empty line between every two functions, before every return statement and after import statements.
- An empty line should also be used to separate statements when they clearly belong to different code blocks.
- Always write a **default branch** for switch statements.
- Use **optional chaining** instead of contional statements for null-checks.
