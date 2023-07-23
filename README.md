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

To ensure that the editor keeps track of the order of TeXBoxes correctly, we assign each TeXBox a unique ID, so that the editor identifies each element to be rendered using this ID instead of an array index which changes frequently under the drag-and-drop setting.

##### Automatic Numbering of Headings

An important feature that makes an editor feels "smart" is the ability to automatically index all headings and sub-headings in a properly formatted way. In our case, since we expect people who regularly use $\LaTeX$ to use our application, we also wish to implement this in a way which is similar to the original $\LaTeX$ logic.

Imitating the behaviour of $\LaTeX$, we configured 5 different header levels - namely **Part, Chapter, Section, Sub-section** and **Sub-sub-section**, in the order of descending importance and font sizes. Among these, parts are labelled using **Roman** numerals, while the others follow the format of `chapter + "." + section + "." + subsection + "." subsubsection` for indexing (so in the form like Section 1.3 or Sub-sub-section 1.4.3.2).

We achieve auto-numbering of these headers using the following way: every time the top-level nodes of the document updates, a utility function will fire, which interates all top-level nodes and retrieve all headers from there. After that, the function iteratively set the node properties of these header nodes to label them with the correct indexes. As such, the auto-indexing will be compatible with drag-and-drop.

Doing this has its pitfalls: the order of the headings does not necessarily change when the document nodes alter. For example, appending a new paragraph to the end of the document does not add new headings nor shift existing ones around. However, our utility function will still fire nonetheless to re-calculate the headers' indexes which will essentially be identical. Therefore, we have compromised some efficiency due to these redundant calculations.

On the other hand, we still decided to keep it this way despite this known issue because we realise that a more efficient algorithm may grow in syntax complexity drastically, which makes it more bug-prone and less easy to debug. Meanwhile, despite the redundancies, our original algorithm is still bounded by $O(n)$, so the marginal benefit of optimising would be minimal.

Regarding theorems, definitions, examples and problems, the numbering of these blocks is achieved with a similar algorithm but with a small tweak. For each of the theorem blocks retrieved from the document nodes, we will locate the first **section header** before it. If this theorem is the $n$-th theorem block in that section, its index is determined by `sectionIndex + n`. So for instance, the 2nd theorem under section 1.3 is labelled as Theorem 1.3.2, and the 5th problem under section 2.2 is labelled as Problem 2.2.5.

#### [Potential Addtions]

Here we list a few good-to-have features:

1. Syntax highlighting for code blocks which support different programming languages.

2. Smoother animations during dragging and dropping blocks.

3. "Transfer Station" which hosts temporary copies of blocks deemed potentially useful by the user, such that the user can retrieve them directly from the station to paste in the appropriate position without needing to browse back and forth to search for the blocks. 

4. Ability to chain up neighbouring blocks and move them around together.

However, it is unlikely that we have sufficient time to implement these nice features due to their complexity and the fact that our team have to prioritise on other essential functionalities of the application first.

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

In the newest version, we have also added support for more environments for displayed mathematics, so that the user can input things like systems of equations, matrices and multi-line expressions with ease.

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

By now, we have mostly finished migrating to MUI framework. Additionally, we also implemented some animations which add semantic indications to these UI components. For example, a floating tooltip will appear when the user hovers the cursor on a button in the editor's toolbar containing a short description of the button's function and its hotkey; hovering the cursor on the drag-and-drop event listener will change its opacity, while the cursor changes to the grabbing form to hint user interactions; select menu items and various buttons will change colours based on the current state of activation to serve as a better visual guide to the user.

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

We have also made use of the $\LaTeX$ rendering mechanism to add an optional proof section for theorem blocks, which can be activated with a slash command.

### Hyperlink between Notes Components

#### [Proposed]

Concepts in different chapters may have interconnections with one another, and therefore it is useful to be able to quickly cross-refer back and forth between these related concepts while revising using the notes. Thus, we plan to implement hyperlinks in HiveMind to allow the user to set markers to related components, so that later the user can simply click on the marker to jump between the various parts.

For example, the user can set up a marker at a formula, and set up another marker at the definition from which the formula is derived, so that when the first marker is clicked, it will lead the user to the location of the definition.

Ideally, a marker should be able to be set at an arbitrary number of locations. This means that the user can link ten different equations with one marker, such that when this marker is activated, it calls out a menu where the user can select which location to jump to. The user can annotate each of the locations with a custom tag to serve as a brief description of the contents over at the referenced position.

#### [Current Progress]

While our original plan seemed reasonable, we soon discovered that some parts of it were not as practical as we expected. For instance, we wished that one single hyperlink marker could link up any number of parts in a set of notes, but in practice, such a system over-complicates the mechanics of note-editing. In particular, it requires highly complex state management to build the hyperlinks, which appears not very efficient. Moreover, it poses another challenge to implement the user interfaces for such a system as there could be too many markers associated to one hyperlink to be displayed succintly. As such, although we still think it is a good idea to have a system like what we originally proposed, we decided to simplify the implementation details and build a simpler version first.

Currently, the user can insert *bookmarks* which are read-only inline elements beside sections deemed as important. We spent some extra care designing the display of the bookmark. Each bookmark has three attributes: **a title**, **a destination** and **a custom description**. By default, every bookmark has a title which will be displayed. The destination is an optional attribute which refers to the section to which the bookmark is linked. For example, if bookmark A has a destination of bookmark B, then the former will be displayed as "Refer to bookmark B" and the latter, "Refer to bookmark A". Finally, if a bookmark has a custom description, that description will take the highest priority as its display name. By doing so, we have created a display mechanism for the bookmarks with three layers of fallbacks, which enables more dynamic user control over the appearance of the bookmarks.

Double-clicking on a bookmark calls up a configuration menu where the user can customise all three attributes by simply editing in the corresponding input fields. The destination section has an extra filter which will display all matching bookmarks from a drop-down menu filtered based on the current user input. For example, if the user has typed in "abc" in the input, then only bookmarks whose titles start with "abc" will show up for selection. This allows the user to locate and select the target bookmark faster.

The linkage relation is by default **symmetric**, meaning that once bookmark A is defined with its destination as bookmark B, bookmark B will automatically be updated to have bookmark A as its destination as well. This means that clicking on these two bookmarks allows the user to quickly toggle back and forth between the two sections.

#### [Potential Additions]

We could continue exploring to see whether there is an efficient way to upgrade the bookmark linkage such that an arbitrary number of bookmarks can be linked.

Furthermore, a new inspiration derived from working on the bookmark and hyperlink feature is an **index page** for notes. Based on the headings present in the current notes, we could build a mechanism that auto-generates an index page at the very beginning of the document, where each entry is hyperlinked with the corresponding heading. This hyperlink should behave very similar to the current bookmark feature we have implemented.

### GUI-based Illustration Maker

#### [Proposed]

Making beautiful graphs and diagrams with $\LaTeX$ can have a very steep learning curve, but it provides a high degree of precision which is hard to emulated with other illustration makers. Therefore, we propose to build a GUI-based illustration maker inside the editor of HiveMind which hides the specific $\LaTeX$ code behind an abstraction barrier and allows the user to generate aesthethic illustrations with a more visual interface. This illustration maker should be applicable to at least the following items:

- Matrices
- Tables
- 2D graphs
- Geometric diagrams

#### [Current Progress]

This has been a particularly challenging feature to build throughout the project, and while we have managed to implement the core functionalities, the overall result has not been satisfactory.

##### Matrix Builder

The matrix builder has been implemented the most comprehensively. The user can type in the size of the matrix and fill in the entries in a grid, while the output will be displayed in a preview box in real time. We managed to add three quality-of-life improvements to this seemingly simple system which aim to suit some niche but important demands for people who need to input matrices frequently. First, the matrix builder offers an option to generate a grid for an *augmented* matrix, which can be toggled on and off with a switch. Second, there is a select menu from which the user can *change the delimiters* of the matrix between parentheses, square brackets, curly braces, modulus and norm. Third, we provide a series of buttons to instantly perform some special matrix transformations, which are:

- Produce an identity matrix of the given size.

- Produce a zero matrix of the given size.

- Change the current matrix to an upper- or lower-triangular matrix.

- Change the current matrix to a diagonal matrix.

- Transpose the current matrix.

After the user is done with creating the matrix, clicking on the insert button will add the matrix as a display math block into the editor. While it is still fully possible to type in a matrix manually using the `array` environments of $\LaTeX$, the matrix builder offers a more visual framework to create matrices more efficiently.

##### Function Plotter

Originally, we planned to make use of the `tikz` $\LaTeX$ package to build our function plotter. Unfortunately, however, this package is not compatible with MathJax which is essential to display $\LaTeX$ in the browser. This almost put us into a dead end as most libraries for creating charts and diagrams focus on Microsoft-style illustrations rather than mathematically precise and professional graphs.

Luckily, there is still a library which we have found to be usable, which is **Mafs.js**. However, this library is far from being optimal for our use case as what it does is to map a **JavaScript function** to a mathematical plot, and so we have to find a way to first convert $\LaTeX$ syntaxes into a JavaScript function.

During our search, we finally decided to use **Cortex.js** and in particular, its **ComputeEngine** library. The logic of Cortex.js is to represent a mathematical operation with a tuple containing the names of the operator and the operands. For instance, the JavaScript function `Math.sin(x)` or equivalently in $\LaTeX$, `\sin(x)` is represented using `["sin", "x"]`. Naturally, these tuples can be nested in to what is known as a **MathJSON** object to represent composed functions. For example, the MathJSON object `["add", ["multiply", ["divide", 1, "x"], ["sin", "x"]], 5]` represents the function `Math.sin(x) / x + 5`. By using MathJSON as a bridge, we can convert a user input string written in $\LaTeX$ into an executable JavaScript function, which can be then passed in to Mafs.js to plot the function.

While we managed to get the plotter working, there are huge pitfalls with the current implementation. The evaluation of a MathJSON object is extremely expensive as we have to recursively replace of occurrences of `"x"` in the nested tuple with the value to be substituted in. For any mathematical expression with reasonable complexity, the corresponding MathJSON can already have a very high degree of nesting, not to mention the sheer number of values we have to substitute into the MathJSON to plot the graph. As a result, the behaviour of our function plotter has been very slow and laggy, and so far we have not found a viable alternative to implement it.

Moreover, the internal implementation details of the Math.js library has determined that it only accepts pure strings as label texts, which means there is no way we can label the plotted functions with accurate mathematical texts. Due to these prominent issues, we decided to postpone the implementation for geometric diagram maker indefinitely.

### Project Management System

#### [Proposed]

The project manager of HiveMind is inspired by Overleaf. Instead of behaving like conventional document managers that group files into folders, the project management in HiveMind is done via tags.

The user first create some custom tags, and then assign the tags to the projects to indicate some shared characteristics among them. For example, a user might want to tag all his maths notes with "Math" and all his physics notes with "Physics". The advantage of using tags is that the same project can be placed to a number of different groups. For instance, the notes for computational genomics may appear under "CS", "Math", "Statistics" and "Biology" tags such that clicking on any of the four groups is able to access the project.

#### [Current Progress]

We chose to use Firestore to build our back-end server for data storage.

##### User Authentication:

Currently, we have built the authentication page. The user can choose to register and log in with an e-mail and a password, or sign in with a Google account. To register a new account, the user inputs his or her user name, an e-mail address and a password. 

We have implemented validation rules for user registration as follows:

1. The user name may be identical to someone else's.

2. However, the user e-mail must be **unique** to every user, a registered e-mail cannot be used by a new user again.

3. The password must contain at least 8 characters, including at least one alphabet and at least one number.

4. The user needs to repeat the password to check if two password inputs match.

If the user input does not pass the validation checks, the registration will fail and a helper text will be displayed under the input field. After submitting validated registration data, a verification e-mail will be sent to the registered e-mail address. Once the user has verified the e-mail address, he or she can then enter the application's dashboard.

After successful registration, the user will be automatically signed in. Afterwards, the user can use the registered e-mail and password to log in any time. If the user forgets his or her password, he or she can request a password-reset e-mail be sent to a designated e-mail address.

The user's avatar and user name will be displayed in a badge in the navigation bar. Clicking it will direct the user to his or her profile settings where he or she can edit the user name, change the avatar icon or add a short personal description.

We store all the user information under the "users" collection in Firestore. When a user logs in, we first query the database for documents under the collection which has the same ID as the current user credential (for Google sign-in) ot the same user e-mail (for regular e-mail and password sign-in). If such documents do not exist, we follow up by adding a new document containing the current user's information to the "users" collection. If the user has successfully logged in, we will redirect him or her to the Dashboard. Otherwise, the website will alert the user with an error message.

##### Project Manager:

On Firestore, we created a "userProjects" collection, which contains all users that have been registered with our application. Each user points to a sub-collection named "projects" where all the projects owned by the user are stored. Once the user is directed to the Dashboard, he or she will see the project manager. The application will send a request to the database to retrieve the data of all of the user's projects and display them as entries of a vertical list. 

Currently, every entry will display the file name, tags, owner's user name and the date of last update of the project, and the projects are ranked in order of last update time by default. Alternatively, the user can also rank the projects by file name or owner's user name. Clicking on the corresponding table heading cell switches between ascending and descending ranking. Clicking on the entry will re-direct the user to the editor page with the corresponding project loaded. All changes of project contents thereafter will be automatically saved in real time to the database.

The user can click on the "Create New Project" button to set up a new project, which pops up a window for the user to enter the project name. On pressing "confirm" button, the application will first check the validity of the project name. If the project name is empty or is the same as another existing project, the webpage will alert the user with a message. Otherwise, the new project will be created successfully and its data will be send to the database.

The user can also rename or delete a project by clicking on the corresponding button beside the entry in the manager. When renaming, the same validation process for project name applies. 

To help new users quickly learn the various features of our application, their project manager will have a default example project on successful registration.

##### Tag Management

The user may group several projects together using **tags**. To create a new tag, the user needs to click on the "New Tag" button and gives the tag a unique name and a colour. After the tags have been created, the user selects the projects to be grouped together by clicking the check boxes beside the project names, and click on the desired tags from a drop-down menu to apply them to (or toggle them off) the selected projects.

Once successfully associated, the tags will be displayed beside the projects' name. There is a tag management panel to the left of the project manager, where the user can select one or more tags, so that only the projects containing the selected tags get displayed. 

#### [Potential Additions]

There are some notable additions that we could make to the project management system, for example:

1. The user should be able to export the projects, for example as PDFs.

2. The time stamp displayed for each project should be more precise to minutes instead of just dates.

Furthermore, we would continue building on the authentication process. We plan to add other login methods such as Facebook and Github. 

There are a few potentially complex features that could be added to the project manager. For instance, since our editor supports $\LaTeX$ input, it would be good if a user can import $\LaTeX$ source code, which can then be converted to a project.

It would also be good if the user can export $\LaTeX$ source code directly from an existing project so as to transfer the notes to other platforms such as Overleaf.

Regarding project management, we could add a functionality which allows the user to mark certain projects as "important" so that these projects will always be pinned to the top of the project manager regardless of ranking rules.

### Collaborative Note-taking

#### [Proposed]

What is the point of taking down notes for everything on your own, if your peers are also taking notes for the very same contents? In our everyday experiences, we realise that a large part of notes contents would appear to be very similar among different students taking a certain course. For example, the notes on the epsilon-delta definition of limits would be exactly the same for all students learning calculus. This means that instead of each making his or her own notes, it suffices for all these students to share one set of notes.

Thus, we propose to incorporate collaborative editing into HiveMind. Users may create and share collectively owned projects to co-edit or conduct group audit, allowing higher efficiency in note-taking as a group. At the same time, this also allows one to take reference or gain insights from the notes written by someone else, after which he or she may find it helpful to copy over the section to his or her own notes.

##### [Current Progress]

We divided the work of this feature into two major parts: first, the user should be able to search for and share a project with other users so that they have the access to edit the same project; second, changes from different users should get synchronised in real time on every collaborator's front-end.

##### Project Sharing

In the dashboard, the user can select a project and click on the "Share" button to grant other users access to editing it. To search for a user, one can either type in the user name or the user's registered e-maill in the search box. Once an input is detected, the application iterates through all user data in Firestore and retrieve the entries with (partially) matching user names and e-mail addresses.

The retrieved users will then be displayed in a drop-down menu under the search box. Clicking on a user will add the user to the collaborator list for the currently selected project. After confirmation, all users in the collaborator list will have access to the project, and the project will show up in their dashboards for them to view and edit it.

##### Group Editing

The group editing feature has not been implemented up to our original expectation due to the internal constraint of the Slate.js library which we have used to build our editor.

Slate.js does not provide built-in support for syncing contents across different instances of its editor, and thus we have to build the synchronisation mechanism on our own. We were faced with two options: we could choose to reload the document nodes once after some fixed time interval, so that the newest contents from Firestore will be retrieved and updated for the current collaborative project; alternatively, we can also monitor the operations applied to the project such as inserting texts or moving paragraphs, and send these operations to the other collaborators and apply them concurrently.

After some contemplation, we resolved that the first option was not feasible as changes could occur very frequently from multiple sources under a collaborative project setting. If we were to update these changes in real time, this would lead to an extremely expensive algorithm, compromising efficiency greatly. On the other hand, if we only refresh the editor after some fixed time interval - say once every 5 seconds - that would severely affect the smoothness of the collaboration.

Therefore, we decided to do the following: when a user applies some change to the document, we detect the type of operation for that change and send it over to all the other users in the collaborator list. Once the operation is received by the other users, it will immediately be applied to their copies of the document. The advantage of this is that compared to monitoring the entire document contents - which could be very extensive - syncing only single operations across multiple editor instances is a *low-cost* operation, which allows us to synchronise contents between different collaborators efficiently in real time.

To achieve this, we incorporated **Socket.io** into our application and built a server with **Express.js** to send and receive data in real time. The detected operations will be sent to the server first, and after the server receives the data, it then broadcasts the data to all other connected users. At the user's side, we first examine the **source** of the incoming data by keeping track of the project's user ID and document ID. If the user ID and document ID are the same for the incoming data and the local project, then we know that the operations contained in the incoming event have occured in the current project. On top of that, if the user ID from the incoming data differs from the current user who received the data, we know that the data is a *remote* change and should be applied to the current document. Otherwise, the user who receives the data is the same as the user who sends it, meaning the change is a *local* one and has already been updated, so it should not be double-counted.

##### [Potential Additions]

In most other collaborative editors, features like decorated cursors to indicate the presence of collaborators and commenting are commonplace. However, these are complex mechanisms which we lack the time to implement from scratch.

We did find a third-party library called *slate-yjs* which incorporates *Y.js* into Slate.js to achieve synchronisation and various decorative features for collaborative editing. However, this library has made significant changes to the structure of the editor component from the original Slate.js and it is therefore difficult to include it into our application without doing a major overhaul. In the future, however, we may rebuild the application using this framework to provide better support for collaborative editing.

## Tech Stack

1. React.js
2. JavaScript, TypeScript
3. Firebase
4. Node.js
5. Slate.js
6. MathJax
7. $\LaTeX$

## Problems Encountered and How We Fixed Them

With both members as complete novices in software development, our team has had a hard time during the initial stages of our project. Though we had to spend much extra time tackling all kinds of issues we have encountered, these have later turned into invaluable learning experiences for us. Here we document several notable and major problems that appeared in the process of our project development.

### The Pain of Re-building the Wheels

Our project aims to tackle a relatively niche issue: **increasing the modularity of digital note-editing with comprehensive** $\LaTeX$ **support.** The one immediate problem we had to face was: there is little resource online that is directly relevant to our development. Most people who need large amount of $\LaTeX$ typesetting will just use a $\LaTeX$ editor or choose to write in Markdown anyways. Therefore, there are very few examples for such a note editor from which we can take reference. As such, we had no choice but to learn from and emulate other types of applications like a regular rich-text editor, which proved to be of great pain.

Our inexperience also led us to being *overly (or naïvely) confident* to the extent that we believed we could achieve our targeted outcome by building everything using plain React alone. We simplistically thought that one contentEditable `<div>` would suffice for building an editor, but the mechanism behind a simple editor appeared far more complicated than it seemsed. We then resolved to using the content-editable Node package, but later realised that a simple and light-weight package like this could not cover our needs at all. As a result, by Milestone 1, only a very small fraction of our plan has been implemented, which was barely kept from breaking apart. It was by then that we realised that we urgently need to seek for a **comprehensive framework** which specifically targets editor development, and we finally found *Slate.js*.

The advantages of Slate.js have been discussed in earlier sections so we shall skip them here. Nevertheless, what happened afterwards proved one important thing to us: *it is always better to adopt a ready-to-use tool than to build the wheels from scratch.* Even if the library does not fit your needs 100%, it would still be way more efficient to improvise using existing tools than to construct everything on our own. 

We managed to rebuild our application from the previous mini-demo within only half a day. Since then, we finally have had a stable foundation for our application that can be easily extended with new functionalities.

### Dilemmas in Design Decisions

We had wished that we could always find the "best" or the "ideal" way to implement every single functionality for our application, but we have been proven wrong. There are times where every possible implementation brings along some seemingly "unacceptable" pitfalls.

The most prominent instance is when we were implementing rendering logic for displayed mathematics. As a jargon for mathematical typesetting, "displayed mathematics" refers to mathematics which occupies its own lines which are disjoint from regular text flow. Examples of displayed mathematics include

$$
\lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n = \sum_{n = 0}^\infty \frac{1}{n!} = \mathrm{e}
$$

and other kinds of often complex mathematical expressions.

You will notice that although displayed mathematics seem to occupy separate "paragraphs", they in reality carry semantic meanings and act as some part of speech in a full sentence. Thus, it is justified to implement displayed mathematics as **nested blocks** within a paragraph. 

However, an issue soon emerged. We noticed that if a paragraph ends with displayed mathematics, an empty line will appear after the mathematics, which makes the gap after that paragraph inconsistently wider. What was worse was that we soon realised that there was practically no solution for it because it was caused by an inherent constraint of Slate.js. Slate.js uses an **empty string** to indicate the end of a top-level block, and since our displayed mathematics took away the full width of the block, Slate.js had to insert that empty string to the next line, leading to the empty line problem.

We then considered re-building the displayed mathematics as its own top-level blocks. However, because the mathematics serves as a part of a complete sentence, this would cause one sentence to be fragmented into three different blocks, which was aesthetically weird. Moreover, as our editor needed to include blocks for theorems, definitions, remarks, solutions and proofs, it would not make sense if those blocks have to split up whenever displayed mathematics needs to be inserted.

Eventually, we decided to compromise. We judged that issues due to empty lines would occur much less frequently as compared to potential broken blocks would do if we make displayed mathematics into top-level blocks. The encounter with such a dilemma has taught us that we often have to weigh the pitfalls between several non-ideal implementations and choose one, rather than to seek a "perfect" solution that is impractical.

### Bugs with the Bookmark Feature

In the features section, we mentioned that we wish to hyperlink important sections with bookmarks such that clicking on them allows the user to jump instantly back and forth between these sections. We planned to achieve this by associating each bookmark with a **destination**, represented by an optional property in the type declaration for the bookmark object.

Initially, we thought that it was the most straight-forward if we just implement the destination as another bookmark object. For example, when marking Bookmark B as the destination for Bookmark A, we simply assign Bookmark B to the destination property of Bookmark A, like this:

```typescript
// Type declaration
type Bookmark = {
    // Other properties
    dest: Bookmark;
};

// Bookmark A
a: Bookmark = {
    // Other properties
    dest: b,
};
```

If it worked as intended, we could then use the built-in methods of Slate.js to convert the bookmark node in the editor to a DOMNode (or an HTMLElement) and use the `scrollTo` method to perform the jump between sections.

However, we soon noticed a bug: after configuring Bookmarks A and B as such, the linkage between them could not be saved! When we closed the editor and opened it again, the hyperlink between them disappeared and clicking did not work as expected. Moreover, when we tried to re-configure them, we received error messages from time to time.

With some testing, we quickly located the problem. It was because our bookmark hyperlinks represent a **symmetric relation**, meaning that the code above would actually be:

```typescript
// Type declaration
type Bookmark = {
    // Other properties
    dest: Bookmark;
};

// Bookmark A
a: Bookmark = {
    // Other properties
    dest: b,
};

b: Bookmark = {
    // Other properties
    dest: a,
};
```

Looking at `a`, since the value `b` of its `dest` property is also a Bookmark object, `b` would contain a `dest` property whose value is `a`. This essentially reduced to an infinite loop and cyclic dependency which broke our code.

Hence, we needed another way to store the destination data. We though of using the *paths* of the corresponding bookmark nodes, which are structures provided by Slate.js representing the relative position of a node in an editor with respect to some root node. However, this idea was aborted before it was implemented, as we realised that the path of a node is mutable in our application due to the drag-and-drop mechanism.

This pointed us a direction: we require an *immutable* value to represent and record a bookmark node! We happened to have already such a value associated with every node in the editor: previously when we implement the drag-and-drop logic, the library we used requires that every draggable element should have a unique ID. Therefore, we could just use that unique ID to manage the bookmark hyperlinks. 

Through solving this bug, we have learnt the important lesson that we should always avoid cyclic references in our code, and re-use pre-existing structures to solve problems as much as possible.

### Lack of Sufficient User Testing

As of the current stage, our application has gone through a few rounds of user testing where we as developers as well as some of our friends as users have tried out the application. Through these testings we have managed to spot and fix a number of bugs and problems with our application.

However, through the process we have also discovered another equally important purpose of user testing, which is to open up new inspirations for areas of future improvements or alternative implementations for existing features. Compared to fixing bugs, this can be even more valuable as it helps an application to grow and upgrade in the long term.

To effectively achieve this goal, though, it requires a higher number of testers from a variety of backgrounds, as different users will have vastly contrasting habits when it comes to using an application. In this sense, our testing for the application is still lacking of sufficient testing with a focus for this area.

## Proof-of-concept and Demonstration Project

The [project poster](https://drive.google.com/file/d/1nrOBtsAm5hrHAS1ok_Vsw5_PstDqHmvf/view?usp=drive_link) and [project video](https://drive.google.com/file/d/1e7t9K8qMJnjLR59IZqi6TdiP0apbOAkV/view?usp=drive_link) can be accessed from here.

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

### Test Case Design

Since the various features of our application are very closely linked, it is difficult to isolated each component to carry out unit testing. As such, we have chosen to conduct user testing directly once a major feature has been implemented. We focus on the edge cases mainly, as the basic functionalities should already been tested during the development process based on our workflow. For each tester, we would first ask them to freely navigate the application so that we can observe how easy it is for new users to accustom to our UI. Then, we ask them to perform a series of tasks which we deem as somewhat bug-prone, to see if any issue happens. Finally, we ask for their opinions on potential improvements and additions to the application which would be useful.

We now list down a few important test cases:

#### Inline Elements

By default, selecting an inline element and click on its corresponding button will toggle the element off. However, we would like to know what happens if the inline element is:

- partially selected, or

- selected together with another inline element, or

- selected together with formatted plain texts.

To test this, we prepared a mixed sentence. The first one third was plain text, the middle one third was an inline math block while the last on third was a link. We would then select half of the link, select the math block and the link together, and select the plain texts with the math block together respectively to test for the three target issues.

#### Discontinuous Headers

Based on the expected user input, headers should be set up *sequentially* in descending order, meaning that, for example, a sub-subsection only appears directly after a subsection and not a section or a chapter (so there is supposed to be no sudden jumps between header levels). In reality, however, this may not be the case, especially with the drag-and-drop mechanism where it is perfectly legal to move a subsection header such that it is then placed right after a chapter header.

Therefore, we tested this by inserting headers with discontinuous levels and observed their indexing behaviour. We found that if a section does not have higher level headers before it (e.g. when the first header of a document is already a section), it will be labelled as **0.1**, which seems weird and unintuitive. Similar problems also happened for subsections and sub-subsections.

To solve this problem, we added fallback mechanism that will forcefully revert the index to a single number if the above happens. For instance, if the first header of a document is a section, it will be labelled as section **1** rather than section **0.1**. For subsections and sub-subsections, we will forcefully convert them to the next higher level header if they appear disconnected with the other headers. For example, if the first header after a chapter title is a subsection, it is labelled as a **section** rather than a subsection.

#### Illegal User Input

One prominent issue with the matrix builder and function plotter is illegal user input. For example, the user may input things like `y = 2z + 1` for the application to plot when it is supposed to be a function of $x$ against $y$. When using the matrix builder, some user might also accidentally try to generate an identity matrix when the matrix is not a square matrix, or to transpose an augmented matrix which is mathematically meaningless. Such behaviours should be prevented such that they do not crash the application even if they do occur.

We first tested the function plotter. We tried to let it plot `y = s` and fortunately, the libraries we used to build the plotter have built-in mechanisms to address such inputs by not allowing an output graph to be produced. Additionally, we also tested for functions containing special constants like `y = \pi` and `y = x + e`, both of which worked perfectly.

Then, we tested the matrix builder focusing on non-square matrices. As expected, if matrix transformations which are supposed to be exclusive to square matrices get applied to these non-square matrices, bugs will occur, producing incorrect results or crashing the application. As such, we have disabled these transformations when the matrix builder detects that the user has input a size for a non-square matrix.

We followed up by testing the behaviour of the matrix builder when the matrix has empty entries. In particular, we wish to make sure that the preview and exported $\LaTeX$ are still accurate despite the presence of empty entries.

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
