import { NextResponse } from "next/server";

const MODEL_PRIORITY = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-2.5-pro",
  "gemini-pro-latest",
];

async function findAvailableModel(apiKey) {
  for (const model of MODEL_PRIORITY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}?key=${apiKey}`
      );
      if (response.ok) {
        return model;
      }
    } catch (e) {
      continue;
    }
  }
  return MODEL_PRIORITY[0]; // fallback to first model
}

export async function POST(req) {
  const { rawText, apiKey } = await req.json();

  if (!rawText || !apiKey) {
    return NextResponse.json(
      { error: "Missing rawText or apiKey" },
      { status: 400 }
    );
  }

  const systemInstructionText = `You are an expert resume and CV parsing assistant. You will be given a raw text version of a resume or CV.
Your task is to extract and  return a standardized JSON object representing the candidate's career information.
    
    Follow these guidelines strictly:
    For "experience" and "projects", extract the bullet points into the "responsibilities" and "details" arrays respectively.
    If a field is missing, use an empty string "" or an empty array [].
     Detect if the text is a CV (includes sections like "Publications", "Research", etc.) or a Resume.
    Your response must be a single valid JSON object with this exact schema:
    {
     "type": "resume" | "cv",
     "personalInfo": { "name": "", "email": "", "phone": "", "linkedin": "", "website": "" },
      "summary": "",
      "experience": [ { "company": "", "title": "", "dateRange": "", "responsibilities": [""] } ],
      "education": [ { "degree": "", "date": "" } ],
     "skills": [""],
     "projects": [ { "name": "", "details": [""] } ],
     "certifications": [""],
      "volunteering": [""]
    }
    
    Output ONLY the JSON — no markdown, text, or explanations`;

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: rawText }],
              },
            ],
            systemInstruction: {
              parts: [{ text: systemInstructionText }],
            },
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );
      function cleanJson(parsed) {
        const cleanText = (text) =>
          text
            .replace(
              /\b(seeking|applying|position at|role at|company|hiring)\b.*$/gi,
              ""
            )
            .trim();

        if (parsed.summary) {
          parsed.summary = cleanText(parsed.summary);
        }
        if (Array.isArray(parsed.experience)) {
          parsed.experience = parsed.experience.map((exp) => ({
            ...exp,
            responsibilities: Array.isArray(exp.responsibilities)
              ? exp.responsibilities.map(cleanText)
              : [],
          }));
          return parsed;
        }
      }

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates[0].content.parts[0].text;
        try {
          const parsedJson = cleanJson(JSON.parse(jsonText));
          return NextResponse.json(parsedJson);
        } catch (e) {
          console.error("Failed to parse JSON from Gemini response:", e);
          return NextResponse.json(
            { error: "Failed to parse JSON from AI response." },
            { status: 500 }
          );
        }
      }

      if (response.status === 503 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Gemini API unavailable, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json(
        {
          error: `Gemini API failed: ${
            errorData.error?.message || "Unknown error"
          }`,
        },
        { status: response.status }
      );
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Network error, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
        continue;
      }
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
