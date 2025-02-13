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
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");

    const [review, setReview] = useState("");
    useEffect(() => {
        prism.highlightAll();
    }, []);

    async function reveiwCode() {
        try {
            setReview("Loading...");
            setLoading(true);
            // Check if code is empty
            if (!code || code.trim() === "" || code.length === 0) {
                setReview("Please enter some code...");
                setLoading(false);
                return;
            }
            const response = await axios.post(
                "https://bugcatcher-thfb.onrender.com/ai/get-review",
                { code }
            );
            setLoading(false);
            setReview(response.data);
        } catch (error) {
            setLoading(false);
            setReview("Something went wrong...");
            console.error(error.message);
        }
    }
    return (
        <>
            <main>
                <Header/>
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
                        {/* {loading ? <Spinner /> : review} */}
                        {review}
                    </Markdown>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
