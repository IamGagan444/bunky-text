import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      "Create a list of three open-ended engngin questions formatted as a single string. Each question should be separated by '||' this questions are for an annonumos social messaging platform, like Quooh.me and should be suitable for diaverse audience. avoid personal and sensetive topics, focusing instead universal theme that encourage friendly interaction . for example, your output should be strucured like this : 'whats a hobby you recently started?||if you could have any dinner with historical figure, who whould it be?||whats a simple thing that make you happy?. ensure the questions are enterguing, foaster curosity and contibute to a posetive and welcoming conservetional  enviroment. ";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ suggestion: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate suggestion" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
