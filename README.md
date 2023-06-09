# Orbital 2023 Milestone II

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
     1. Unable to render complex mathematics with detailed typesetting adjustments. For example, in most Markdown editors, 
        `$\int\! f(x) \,\mathrm{d}x$` would get incorrectly rendered as $\int !f(x) ,\mathrm{d}x$.
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
- Second, the design philosophy behind Slate.js coincides with our project in many ways. One prominent instance is that Slate.js organises rich text components into different nodes, which are then packed into a tree structure based on their subsetting relationship. This highly resembles our idea of a modular editor consisting of different movable parts of contents.

With the extremely flexible components and methods provided by Slate.js, we quickly managed to transform the functionalities we have been experimenting on into a working prototype. Now we shall introduce the various functionalities implemented:

##### TeXBox:

Paragraphs, headings and special text blocks like code blocks or quotes are packaged into modular containers known as **TeXBoxes**. On start-up, the editor is initialised with a single TeXBox containing an empty paragraph. All new paragraphs created by inserting line breaks will be automatically wrapped in a new TeXBox, and pressing Backspace at the start of a TeXBox will merge it with the previous TeXBox just like any normal text editor.

We do realise that sometimes there is a need for the user to insert a *soft break* (e.g. when writing code blocks, the user would not want to have every line of code in a separate box), so we also provide support for those use cases. To break a line without instantiating a new TeXBox, the user just needs to hold *Shift* or *Ctrl* while pressing Enter.

We have also implemented a variety of formatting options and a toolbar, which works just like any othe rich text editor. For example, to bold some texts, the user just needs to select those texts and press the "boldface" button in the toolbar. The currently supported formatting options are: **boldface**, *italic*, <u>underline</u>, <s>strike-through</s>, `inline code`, <a>link</a> and $\LaTeX \textrm{-rendered mathematics}$. These formats, except $\LaTeX$, can be composed onto one another freely, so a user can easily write <a><strong><i><u><s><code>some underlined inline code struck through and wrapped into a link with a boldface italic font</code></s></u></i></strong></a>, which can be more than a bit tiring to achieve in a markdown document like this (you have to nest 6 HTML tags to get it properly displayed but pressing 6 buttons will do the trick with our application).

Beside these inline rich-text formatting, we have also implemented special formatting options to block-level contents, including, `code block`, block quote, theorems, definitions, remarks and displayed mathematics. These also have their respective tooltip buttons in the toolbar to switch between different blocks. However, we realise that it is troublesome to frequently click on buttons to switch between block types, so we have added support for **slash commands**. The user can choose to, without leaving the keyboard, type in a **backslash** followed by a code snippet for the target block type, and press enter to instantly toggle the current TeXBox to the desired block type (More on this in section **Intuitive and Smooth User-Interface Interactions**).

We have also built rendering logic for heading blocks. We categorise headings into Part, Chapter, Section, Subsection and Sub-subsection, which are in line with the original heading options provided by $\LaTeX$. However, these have not been formally added into the editor for the time being, as we are still fine-tuning the indexing behaviour.

We have considered implementing support for different fonts into our application so that the user can freely choose the font to use from those installed in his or her device. However, we eventually decided to abort this idea. This is because most fonts *do not have sufficient support for mathematical and other scientific symbols*, which means even if we allow users to change the font of normal texts, these fonts will not be able to be applied to $\LaTeX$ rendering, causing a **unsightly inconsistency** between fonts of texts and mathematics just like you have seen in this document. So we resolved to fixing the font used in our editor ― but what font should we use then? There are two fonts that offer comprehensive support for scientific symbols, namely *Times New Roman* and *STIX Two*. We have chosen to use Times New Roman because it is the default font used by $\LaTeX$.

##### Drag-and-drop:

All top-level blocks of the document, i.e. TeXBoxes, are **draggable**. This means that should the user wishes to re-order the paragraphs, instead of copying and pasting big chunks of texts cautiously, he or she can just drag a TeXBox to the desired location in the document and drop it there. 

This mechanism has been implemented using **dnd-kit**. We chose to use this package instead of writing our own logic because of two reasons:

- First, we wish the mechanism to be complex enough to be able to sustain smooth user interactions. As such, using a mature package with pre-engineered methods would be much less bug-prone than building our own logic from scratch, especially considering our lack of experience with such mechanisms. We can instead make minor tweaks using the pre-existing methods to more easily achieve our desired behaviour.

- Second, dnd-kit allows all draggable components to be wrapped in its context provider. This means we can easily build a universal mechanism which is general enough to be extended onto every component we add to our application, thus reducing repetitive work. These context providers can then be nested, which means we can achieve different drag-and-drop behaviours for different blocks by simply overriding certain properties or methods without the need to write separate logic.

To ensure that the editor keeps track of the order of TeXBoxes correctly, we assign each TeXBox with a unique ID, so that the editor identifies each element to be rendered using this ID instead of an array index which changes frequently under the drag-and-drop setting.

#### [Future Plan]

On to the next phase, we should continuously incorporate more formatting options into our editor. The most important items include (ordered and unordered) lists and proofs. Other than those, text colouring and shading might also be useful functionalities to add in.

We should finish building the indexing mechanics for heading blocks as soon as possible. The indexes of headings should be static so as to be compatible with our drag-and-drop feature, meaning that no matter how the user decides to re-order the headings, their indexes should always stay in numerical order (i.e. dragging "Chapter 1" and placing it after "Chapter 3" will only change the texts in the titles and not the numbering).

The theorems and definitions should be implemented with a similar behaviour and have their indexes automatically generated based on their locations in the document. For instance, if the user inserts a definition block under Section 1.2, the definition will have a default title of "Definition 1.2.x" where *x* is the number of definitions in the same section before this new definition plus one, and dragging and dropping theorems and definitions should not disrupt this numbering.

#### [Potential Addtions]

Here we list a few good-to-have features:

1. Syntax highlighting for code blocks which support different programming languages.

2. Smoother animations during dragging and dropping blocks.

3. "Transfer Station" which hosts temporary copies of blocks deemed potentially useful by the user, such that the user can retrieve them directly from the station to paste in the appropriate position without needing to browse back and forth to search for the blocks. 

4. Ability to chain up neighbouring blocks and move them around together.

### Intuitive and Smooth User-Interface Interactions

#### [Proposed]

It is great pain when one has to frequently switch between the keyboard and the mouse while editing a long document like lecture notes. Not only does it slow down typing, but it also disrupts the note-taking and thinking processes. Therefore, we aim to build the logic for the user interface such that only a minimal, if any, number of actions need to be completed with the mouse. Ideally, the user should not need to leave the keyboard during the whole process of note-editing except to re-order the modular components. For instance, the following features will be implemented:

1. The user can switch between neighbouring TeXBoxes by Ctrl + Up and Ctrl + Down key combinations. The hotkeys are designed as such because TeXBoxes are arranged as a vertical array.
2. When the caret reaches either inline or displayed mathematics, the $\LaTeX$ input area will pop up automatically either on top or below the selected mathematics. Intuitively, the user can press Up or Down keys respectively to enter the input area. Otherwise, the user can continue to move the caret away.
3. After editing in the $\LaTeX$ input area, the user can click the confirm button, press Enter, or click anywhere outside of the input area to exit it, which would also set the caret right after the mathematics automatically.
4. Special actions such as opening a new $\LaTeX$ environment to insert displayed equations, making new sections or titles should be binded to either hotkeys or slash commands.

#### [Current Progress]

##### $\LaTeX$ Rendering and Display:

$\LaTeX$ rendering is of particular importance to our application so we decided to first tackle the various interactions with it. We have spent much time and effort contemplating and experimenting in order to find out the best way to implement it for the optimal user experience. In the very initial implementation, an input box will pop up and get focused when inserting an inline math component for the user to type in $\LaTeX$ code, and the rendered result will be displayed in the TeXBox. 

However, $\LaTeX$ cannot be rendered in the browser in the same way as texts and it *blocks cursor movement* (the caret will disappear when one attempts to move it across the inline mathematics). Hence, to ensure browser-compatibility such that the caret is not obstructed, we had to make the rendered inline mathematics a **read-only** block so that the caret "jumps over" it when direction keys are pressed. One severe problem this had led to was that a read-only block *cannot be selected* (actually there might be a possible walk-around but it could be highly tedious and bug-prone), so the user has to click on the block to activate the input box, and click on the paragraph after closing the input box to focus on the texts again. **This deviated from our vision of a mouse-free user experience.**

In searching for an alternative, an inspiration struck: instead of using an **inline display + hovering input box**, can we switch them and use an **inline input + hovering preview box** instead? Following this idea, we rebuilt the input mechanics for $\LaTeX$ such that the user can insert a $\LaTeX$ block by either clicking the math-mode tooltip button or pressing "\$", after which the user can directly type in $\LaTeX$ code. Since $\LaTeX$ code consists of just regular characters, it can be typed just like any other normal text. This $\LaTeX$ code then gets automatically wrapped inside an inline element, from which a hovering box will pop up to display the rendering result of the code. 

When the user completed, he or she can return to normal text mode by simply moving the caret away from the inline element containing the $\LaTeX$ code, which will then be replaced by the rendered mathematics. Note that in this implementation, the $\LaTeX$ component is no longer read-only but an **editable inline element**. This means that it can be selected and focused in the regular way. Therefore, when the user moves the caret into the inline mathematics, the $\LaTeX$ code will become visible and the preview box will appear again automatically, and mouse clicking is no longer necessary.

##### Hotkeys and Toolbar

Besides implementing $\LaTeX$ input, we have also added hotkey bindings for the text formats currently supported in our editor. The list is as follows:

- mod + b: boldface

- mod + i: italic

- mod + r: regular

- mod + u: underline

- mod + s: strike-through

- mod + `: inline code

- mod + k: link

All of the above hotkeys have their tooltip button equivalents in the toolbar. Toggling a format with texts selected will apply the format onto the currently selected texts, whereas toggling a format with a collapsed selection will cause the proceding input from the caret position to be applied with the format.

Regarding the toolbar, we initially appended it to every block in the editor, but this soon led to a problem: most text formats such as boldface and italic texts are not used at all in certain special types of blocks such as a code block, so it is **redundant** to still show the toolbar in those blocks. Therefore, we decided to make the visibility of the toolbar conditional such that it only shows up in a text block (e.g. paragraph and heading) while it is focused. An unexpected benefit this has brought is that the editor now looks cleaner because there can only be at most one visible toolbar concurrently. 

Additionally, since the toolbar is invisible in certain special blocks such as a code block, we placed the block-toggling buttons at a separate toolbar which is always visible.

##### Slash Commands:

Inspired by Notion, we have found that slash commands are a very useful feature to reduce the frequency of mouse-clicking while using the application, which offers a great boost to efficiency. So we decided to incorporate it into our application as well.

To initiate a slash command, the user simply types a **backslash**. The reason why we chose to use a backslash ("\") rather than a slash ("/") is that many custom $\LaTeX$ environments are also delimited with slash commands (\begin{...} and \end{...}), so a $\LaTeX$ user would be more accustomed to inputing a command with a backslash. Additionally, this also potentially makes it possible to integrate more $\LaTeX$ environment into our application.

Once a backslash is typed, an inline input for commands will be triggered. At the same time, a select menu will appear right below the command input to show all the possible commands available. As the user types in the command input, the options in this menu will be **filtered** in real time such that *only commands which contain the current input will be displayed*, which behaves just like the code suggestion menu in many IDEs like VSCode.

The user can click on a command from the select menu to apply it to the currently focused block. For now, this refers to toggling the block type, but we may add other kinds of commands in the future. Alternatively, the user can also use the ArrowUp and ArrowDown keys to browse the menu and change the selected command, and press Enter to apply the selected command.

We did predict that the user may want to type something after a backslash only as regular texts instead of a command. To address such a use case, we have designed the command input such that it will only become active when the caret is next to any character of the command. Hence, when the user moves the caret away from the slash command, it will just display as normal texts. Moreover, whenever the user initiate a new command input, the editor will first iterate through all texts within the same block and *unwrap all existing command inputs into plain texts*. By doing so, we aimed to avoid potential bugs caused by multiple active commands present in the same block.

##### User Interface (UI):

We recognise that good UI design forms a major part of positive user experiences, and is therefore essential for implementing smooth user interactions. Hence, we decided to build the UI in parallel to the logic of our application, rather than adding interface styling only after a prototype has been completed. This had the following advantages:

- By drafting out the basic layout of various UI components, this helped us as developers better visualise the appearance of our application and thus predict how a user would react to the webpage, so that we could make more informed decisions on the most ideal kind of interactions to implement for the various interfaces.

- To the users who test our application, having relatively complete UI components would help simulate what the application might turn out to be in the final version, so that their experiences with the prototype would be closer to the actual product, which helps them make more concrete comments on the various features of our application. As developers, this means when we start overhauling the UI in the next phase of development, we would already have a lot more of useful information and feedbacks in mind.

Initially, we planned to design most of the UI components from scratch. However, we proved to have underestimated the complexity of UI design, which has led to problems. For instance, we created some unnecessary nesting of components which over-complicate the structure of our code. Furthermore, there were some components which were initially abstracted into stand-alone files but later discovered to be unlikely to get reused, so such abstraction barriers seem redundant. These UI components built from scratch were also unstable and prone to changes in styling, which made our application harder to maintain.

Therefore, we decided to switch to a UI library instead. We have chosen to use MUI to build our user interface. This decision was mainly because MUI by default uses Emotion to style its components, which we had already been using earlier in many of our own components, so it would be easier to migrate those components to newer versions based on MUI. Furthermore, MUI has a minimalistic design which suits the overall theme of our application's aesthetics.

#### [Future Plan]

We will keep updating the hotkey bindings and tooltip buttons to synchronise with new formatting options added. For $\LaTeX$ input, we wish to upgrade it such that toggling math mode with texts selected will wrap the selected texts into $\LaTeX$ environment.

We would also continue to improve the various interactions and hotkeys with regard to webpage navigation. We expect this to be a continuous and long-term process in a sense that new interactions and UI components will be implemented wherever and whenever they are deemed appropriate.

Regarding the UI, we would continue rebuilding all of our interface components with MUI and simplify the code structures by removing unnecessary abstractions and reducing nesting of components as much as possible. 

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

#### [Current Progress]

While our original plan seemed reasonable, we soon discovered that some parts of it were not as practical as we expected. For instance, we wished that one single hyperlink marker could link up any number of parts in a set of notes, but in practice, such a system over-complicates the mechanics of note-editing. In particular, it requires highly complex state management to build the hyperlinks, which appears not very efficient. Moreover, it poses another challenge to implement the user interfaces for such a system as there could be too many markers associated to one hyperlink to be displayed succintly. As such, although we still think it is a good idea to have a system like what we originally proposed, we decided to simplify the implementation details and build a simpler version first.

Currently, the user can insert *bookmarks* which are read-only inline elements beside sections deemed as important. We spent some extra care designing the display of the bookmark. Each bookmark has three attributes: **a title**, **a destination** and **a custom description**. By default, every bookmark has a title which will be displayed. The destination is an optional attribute which refers to the section to which the bookmark is linked. For example, if bookmark A has a destination of bookmark B, then the former will be displayed as "Refer to bookmark B" and the latter, "Refer to bookmark A". Finally, if a bookmark has a custom description, that description will take the highest priority as its display name. By doing so, we have created a display mechanism for the bookmarks with three layers of fallbacks, which enables more dynamic user control over the appearance of the bookmarks.

Double-clicking on a bookmark calls up a configuration menu where the user can customise all three attributes by simply editing in the corresponding input fields. The destination section has an extra filter which will display all matching bookmarks from a drop-down menu filtered based on the current user input. For example, if the user has typed in "abc" in the input, then only bookmarks whose titles start with "abc" will show up for selection. This allows the user to locate and select the target bookmark faster.

The destination is by default **bi-lateral**, meaning that once bookmark A is defined with its destination as bookmark B, bookmark B will automatically be updated to have bookmark A as its destination as well. This means that clicking on these two bookmarks allows the user to quickly toggle back and forth between the two sections.

#### [Future Plan]

We would continue exploring to see whether there is an efficient way to upgrade the bookmark linkage such that an arbitrary number of bookmarks can be linked.

Furthermore, a new inspiration derived from working on the bookmark and hyperlink feature is an **index page** for notes. Based on the headings present in the current notes, we could build a mechanism that auto-generates an index page at the very beginning of the document, where each entry is hyperlinked with the corresponding heading. This hyperlink should behave very similar to the current bookmark feature we have implemented.

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

#### [Current Progress]

We chose to use Firestore to build our back-end server for data storage.

##### User Authentication:

Currently, we have built the authentication page. The user can choose to register and log in with an e-mail and a password, or sign in with a Google account. To register a new account, the user inputs his or her user name, an e-mail address and a password. We have implemented simple validation rules for the user e-mail (it has to be a string in the form of <span>x@y&#8203;.z</span>) and password (it has to be at least 8 characters long). If the user input does not pass the validation checks, a helper text will be displayed under the input field.

After successful registration, the user will be automatically signed in. Afterwards, the user can use the registered e-mail and password to log in any time. If the user forgets his or her password, he or she can request a password-reset e-mail be sent to a designated e-mail address.

We store all the user information under the "users" collection in Firestore. When a user logs in, we first query the database for documents under the collection which has the same ID as the current user credential (for Google sign-in) ot the same user e-mail (for regular e-mail and password sign-in). If such documents do not exist, we follow up by adding a new document containing the current user's information to the "users" collection. If the user has successfully logged in, we will redirect him or her to the Dashboard. Otherwise, the website will alert the user with an error message.

##### Project Manager:

On Firestore, we created a "userProjects" collection, which contains all users that have been registered with our application. Each user points to a sub-collection named "projects" where all the projects owned by the user are stored. Once the user is directed to the Dashboard, he or she will see the project manager. The application will send a request to the database to retrieve the data of all of the user's projects and display them as entries of a vertical list. 

Currently, every entry will display the project name and date of last update, and the projects are ranked in order of last update time by default. Clicking on the entry will re-direct the user to the editor page with the corresponding project loaded. All changes of project contents thereafter will be automatically saved in real time to the database.

The user can click on the "Create New Project" button to set up a new project, which pops up a window for the user to enter the project name. On pressing "confirm" button, the application will first check the validity of the project name. If the project name is empty or is the same as another existing project, the webpage will alert the user with a message. Otherwise, the new project will be created successfully and its data will be send to the database.

The user can also rename or delete a project by clicking on the corresponding button beside the entry in the manager. When renaming, the same validation process for project name applies.

To help new users quickly learn the various features of our application, their project manager will have a default example project on successful registration.

#### [Future Plan]

Currently, the project manager is not very interesting as only the most basic actions about file management have been implemented. In the next phase of development, we will extend the project manager with the following additions:

1. The user should be able to rank projects differently, such as by file name or by file size. Each ranking method should also have "ascending" and "descending" options.

2. The user should be able to export the projects, for example as PDFs.

3. The time stamp displayed for each project should be more precise to minutes instead of just dates.

4. The "tag" feature should be implemented.

Furthermore, we would continue building on the authentication process. We plan to add other login methods such as Facebook and Github. There should also be a user profile page where the user can configure his or her personal credential such as avatar icon, description, user name, e-mail address etc.

#### [Potential Additions]

There are a few potentially complex features that could be added to the project manager. For instance, since our editor supports $\LaTeX$ input, it would be good if a user can import $\LaTeX$ source code, which can then be converted to a project.

It would also be good if the user can export $\LaTeX$ source code directly from an existing project so as to transfer the notes to other platforms such as Overleaf.

Regarding project management, we could add a functionality which allows the user to mark certain projects as "important" so that these projects will always be pinned to the top of the project manager regardless of ranking rules.

### Collaborative Note-taking

#### [Proposed]

What is the point of taking down notes for everything on your own, if your peers are also taking notes for the very same contents? In our everyday experiences, we realise that a large part of notes contents would appear to be very similar among different students taking a certain course. For example, the notes on the epsilon-delta definition of limits would be exactly the same for all students learning calculus. This means that instead of each making his or her own notes, it suffices for all these students to share one set of notes.

Thus, we propose to incorporate collaborative editing into HiveMind. Users may create and share collectively owned projects to co-edit or conduct group audit, allowing higher efficiency in note-taking as a group. At the same time, this also allows one to take reference or gain insights from the notes written by someone else, after which he or she may find it helpful to copy over the section to his or her own notes.

## Tech Stack

1. React.js
2. JavaScript, TypeScript
3. Firebase
4. Node.js
5. Slate.js
6. MathJax
7. $\LaTeX$

## Proof-of-concept

The [project poster](https://drive.google.com/file/d/1iGHT04W8h5N5H2RU6KsVlVeNxAIIhOCD/view?usp=share_link) and [project video](https://drive.google.com/file/d/11urJgv1n9FsqEqYKHdD4jG00sjB7-DRh/view?usp=share_link) can be accessed from here.

We have also deployed our application [here](https://hive-mind-inky.vercel.app/).

On the authentication page, use either a registered e-mail account or Google to log in and be re-directed to the dashboard. After that, create a new project to enter the editor and see the various features implemented there.

The production build now includes the following main features:

- Rich-text formatting using toolbar or hotkeys.
- Press "\$" to activate mathematical mode and input inline $\LaTeX$.
- Type a backslash to activate the slash command menu to toggle block types.
- Drag and drop the top-level blocks to re-order paragraphs.
- Animated styling to enhance user interactions.
- Auto-saving of editor contents.

Follow the example project which will be automatically generated on successful user registration to discover more.

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
  - Implement tags into the project manager (to be completed later than expected).
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

We did not have a specific Git workflow at the beginning of the project as we expected it to be light-weight and not require conscientious workflow control. However, as we approach milestone 2, we realise that the size of the project has grown tremendously with a significantly more complex code structure. For higher maintenability, we decided to set up the following Git workflow:

1. The `main` branch is **protected** and all pull requests merging to it require **code reviews** from both members of the team.

2. The `dev` branch is a non-protected branch hosting a stable working build of the application. It is the **only** branch that is allowed to be merged into `main` via pull requests.

3. Every new feature with a certain level of complexity needs to be implemented in a **separate non-protected** branch first.

4. Branches for implementing new features should be named with the feature name or a succint description, and attached with "(WIP)" at the end of branch name to indicate it is a *work-in-progress*.

5. Branches for experimenting new features and ideas should be named with a succint description and attached with "(EXP)" at the end of branch name to indicate its *experimental* nature.

6. All branches should be named in **kebab-case**.

7. When a new feature has been implemented, its work-in-progress branch should be merged into `dev` via pull requests. The code in `dev` should then be **immediately tested** to ensure that it works as expected.

8. After ensuring that the code in `dev` is without major issues, review the code and merge it with `main`. Then, the feature and experiment branches should be deleted accordingly.

9. The README shoud be updated timely to avoid any omission of details.

## Testing

To reduce the difficulty of the debugging process, we decided to run a brief test and debugging session once a feature has been changed significantly or a new functionality has been implemented, so that we aim to discover and address as many bugs as possible at an early stage. During testing, we should consider two key perspectives:

1. Does the feature/functionality work as intended on its own?
2. Does the feature/functionality interfere with other parts of the application built earlier?

Every bug spotted should be *immediately* recorded in **Github issues** with the following format:

> #### Description
> 
> A succint description of the bug.
> 
> #### Steps to Reproduce the Bug
> 
> What steps can be followed to reproduce the described bug on another device.
> 
> #### Expected Behaviour
> 
> What was expected to happen under the user's actions in place of the bug.
> 
> #### Other Useful Information
> 
> Any other information or contexts that might be relevant to the bug or useful for finding a fix.

The bug reports should then be investigated, after which a comment should be made to the original issue describing the cause of the bug. Once a bug has been fixed, we comment to the corresponding bug report issue to explain the methods and steps taken to tackle it, as well as any change in the application's behaviour after the fix. If after investigating the bug report, it is found that the bug cannot be fixed in a straightforward manner, a comment should also be made to explain the reason behind it and any applicable alternatives to avoid the bug.

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
