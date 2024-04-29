import React, { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    console.log("\nREACHED");
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get('value') || '';
    const initialLanguage = urlParams.get('language') || 'javascript';

    setValue(initialValue);
    setLanguage(initialLanguage);
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <LanguageSelector language={language} onSelect={onSelect} />
      </div>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="50vh"
        theme="vs-dark"
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <div style={{ marginTop: "16px" }}>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;
