import React from 'react';
import './App.css';
import Editor from './Components/Editor';

const App: React.FC = () => {
  return (
    <div>
      <h1>Here is the main editor:</h1>
      <Editor />
      <h4>The following should be built on top of this framework:</h4>
      <ul>
        <li>The code input box should only pop up when the user activates maths mode;</li>
        <li>Pressing enter should trigger an event that creates a new paragraph;</li>
        <li>Incomplete LaTeX code should not be visible to the user, nor should error messages from LaTeX renderer;</li>
        <li>A LaTeX source code file should be available for download, although it should not be visible in the editor itself;</li>
        <li>For non-math texts, input and rendering should be done in exactly the same location. (Implemented using the contentEditable attribute.)</li>
      </ul>
    </div>
  );
}

export default App;
