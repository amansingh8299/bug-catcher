import { useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
function App() {
    const [count, setCount] = useState(0);

    const [code, setCode] = useState("");

    const [review, setReview] = useState("");
    useEffect(() => {
        prism.highlightAll();
    }, []);

    async function reveiwCode() {
        try {
            setReview("Loading...");
            const response = await axios.post(
                "http://localhost:3000/ai/get-review",
                { code }
            );
            setReview(response.data);
        } catch (error) {
            setReview("Something went wrong...");
        }
    }
    return (
        <>
            <main>
                <div className="left">
                    <div className="code">
                        <Editor
                            value={code}
                            onValueChange={(code) => setCode(code)}
                            highlight={(code) =>
                                prism.highlight(
                                    code,
                                    prism.languages.javascript,
                                    "javascript"
                                )
                            }
                            padding={10}
                            style={{
                                fontFamily: '"Fira Code", monospace',
                                fontSize: 16,
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                height: "100%",
                                width: "100%",
                                background: "#1e1e1e",
                                color: code ? "#ffffff" : "#757575", // Normal text is white, placeholder is gray
                            }}
                            placeholder="Place your code here..."
                        />
                    </div>
                    <div onClick={reveiwCode} className="review">
                        Review
                    </div>
                </div>
                <div className="right">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {review}
                    </Markdown>
                </div>
            </main>
        </>
    );
}

export default App;
