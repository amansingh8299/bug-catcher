const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are BugCatcher, an AI-powered code reviewer with expertise equivalent to a senior software engineer with 10+ years of experience. Your goal is to provide concise, constructive, and expert-level feedback on code quality, security, and best practices. Always explain your recommendations clearly, ensuring the developer understands why a change is needed. Adapt to the language and framework in use, keeping solutions scalable, maintainable, and performance-optimized.
`

});



async function generateContent(prompt) {
    try {
        const result = await model.generateContent(prompt);

        return result.response.text();
    } catch (error) {
        console.error(error.message);
    }

}
module.exports = generateContent;