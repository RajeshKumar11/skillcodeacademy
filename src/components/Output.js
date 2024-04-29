import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "8px", fontSize: "1.5rem" }}>Output</h2>
      <button
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          backgroundColor: "#38a169",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        disabled={isLoading}
        onClick={runCode}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        style={{
          height: "15vh",
          padding: "8px",
          color: isError ? "#e53e3e" : "inherit",
          border: "1px solid",
          borderRadius: "4px",
          borderColor: isError ? "#e53e3e" : "#333",
          overflowY: "scroll",
        }}
      >
        {output ? output.map((line, i) => <div key={i}>{line}</div>) : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
