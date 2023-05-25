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

## Case Study on Existing Note-taking Tools: What Can Be Learnt and How Can We Do Better?

We conducted a case study on the various mainstream note-taking tools to learn about their features, advantages and pitfalls.

1. Google Docs
	- Pros
    	1. Light-weight, fully accessible as long as one has a Google account.
    	2. Easy to set up for collaborative editing and group audit.
	- Cons
		1. Requires network connection to save changes.
		2. Incapable of writing complex mathematics because only a small selected set of mathematical symbols is accessible.
		3. Inefficient to typeset equations — the user has to manually search for and click on the symbols from the drop-down GUI menus, instead 				   of typing $\LaTeX$ commands directly. 
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
		1. For people with experience in using $\LaTeX$, inserting inline mathematics is anti-intuitive as Notion uses its own custom hotkey combination 		    to activate inline math mode instead of the standard $\LaTeX$ syntax.
		2. Does not support auto-completion of $\LaTeX$ commands.
		3. The equation block is flagged with the `displaymath` environment from $\LaTeX$ by default, which disables a lot of typesetting options.
		4. Uses KaTeX to provide support for rendering mathematics, which is less flexible because KaTeX only contains a limited number of $\LaTeX$ 	              packages and disallows user-imported packages.

## Scope of Project

HiveMind is a **website application** for note-taking which provides extensive support for $\LaTeX$ to typeset not only most of the mathematics a student would need, but also plain texts using just standard $\LaTeX$ commands, so that there should be nearly zero learning cost in transitioning to HiveMind from any other $\LaTeX$ editor. Additionally, both inline and displayed mathematics should get rendered in real time as the user types in $\LaTeX$, so as to make typesetting mathematics as seamless and smooth as typing regular texts.

We envision HiveMind to be a modular editor. This means that every title, paragraph, equation, remark, theorem, definition, proof, problem... i.e., all parts and pieces that combine together to form the document for your notes, should be a component that can be freely moved and placed to any location in the document by simply dragging and dropping. We thus decided to study the features of Notion and emulate its block feature.

Regarding the tool to render $\LaTeX$ into webpage, we can use either KaTeX or MathJax which are both well-designed JavaScript libraries for displaying mathematics in the browser. With much research and contemplation, we eventually decided to use MathJax due to its better extensibility with third-party $\LaTeX$ packages.

## Features

### Modular Note-editing

#### [Proposed]

Inspired by Notion, we propose to make HiveMind a modular editor.

Inside every project the user has created in HiveMind, the main editor contains a list of editable components known as TeXBoxes. We name it as such because these are essentially text-boxes we see in editors like Microsoft Word, but their inner contents are rendered by $\LaTeX$ rather than as plain texts. By double-clicking on a TeXBox, the user can edit the contents inside it, and by click and hold on a TeXBox, the user can move the mouse to drag the TeXBox to some other location in the document, and release to drop the TeXBox there. This way, the user can adjust the order of paragraphs in a document as easily as moving a post-it note.

Every TeXBox again may also contain some editable components known as TeXBlocks. These blocks contain inline mathematics (or other inline scientific notations). Similar to a TeXBox, double-clicking on a TeXBlock calls out a pop-up input area to edit the $\LaTeX$ statements corresponding to the mathematics displayed in the TeXBlock. The user can also use the drag-and-drop mechanism to move a TeXBlock to any location within the document.

Graphs, tables, code blocks and other types of components in the notes should be able to get shifted around using the same logic.

#### [Current Progress]

Currently, we have been experimenting with TeXBoxes containing only plain texts to build our proof-of-concept. The editor is initialised with a single TeXBox which accepts new input. When the user press the Enter key, a new TeXBox will be instantiated right after the current TeXBox and get automatically focused.

We are yet to test out the drag-and-drop mechanism and the deletion of TeXBoxes.

### Intuitive and Smooth User-Interface Interactions

#### [Proposed]

It is great pain when one has to frequently switch between the keyboard and the mouse while editing a long document like lecture notes. Not only does it slow down typing, but it also disrupts the note-taking and thinking processes. Therefore, we aim to build the logic for the user interface such that only a minimal, if any, number of actions need to be completed with the mouse. Ideally, the user should not need to leave the keyboard during the whole process of note-editing except to re-order the modular components. For instance, the following features will be implemented:

1. The user can switch between neighbouring TeXBoxes by Ctrl + Up and Ctrl + Down key combinations, and switch between neighbouring TeXBlocks by Ctrl +      Right and Ctrl + Left key combinations. The hotkeys are designed as such because TeXBoxes are arranged as a vertical array, while TeXBlocks conform to    the left-to-right orientation of writing.
2. When the caret reaches either inline or displayed mathematics, the $\LaTeX$ input area will pop up automatically either on top or below the selected      mathematics. Intuitively, the user can press Up or Down keys respectively to enter the input area. Otherwise, the user can continue to move      the caret away.
3. After editing in the $\LaTeX$ input area, the user can click the confirm button, press Enter, or click anywhere outside of the input area to exit it,      which would also set the caret right after the mathematics automatically.
4. Special actions such as opening a new $\LaTeX$ environment to insert displayed equations, making new sections or titles should be binded to either        hotkeys or slash commands.

#### [Current Progress]

The various UI components are yet to be implemented as of Milestone I, but we have been experimenting with auto-focusing of input areas and hotkey bindings.

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

With the help of a few Node packages, this feature is already implemented. Now as the user types in the input area, the mathematics rendered by MathJax will synchronise with the $\LaTeX$ statements typed.

#### [Potential Additions]

On top of the current design, we can improve further such that the rendered mathematics only updates when the $\LaTeX$ statements in the input area is legal and complete. Otherwise, the mathematics displayed remains the same as before the change in $\LaTeX$ code. This prevents the user from seeing flashes of incomplete rendering or error messages from $\LaTeX$ compiler.

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

1. React
2. JavaScript, TypeScript
3. Node.js
4. MathJax
5. $\LaTeX$

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

