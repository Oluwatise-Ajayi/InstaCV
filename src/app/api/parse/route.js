import { NextResponse } from 'next/server';

const MODEL_PRIORITY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest',
  'gemini-2.5-pro',
  'gemini-pro-latest'
];

async function findAvailableModel(apiKey) {
  for (const model of MODEL_PRIORITY) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}?key=${apiKey}`);
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
    return NextResponse.json({ error: 'Missing rawText or apiKey' }, { status: 400 });
  }

  const systemInstructionText = `You are an expert resume parsing assistant. Analyze the provided text and extract all relevant resume information. Your response MUST be ONLY a valid JSON object. Do not include any text before or after the JSON, and do not use markdown backticks or formatting. The JSON structure MUST strictly follow this schema:
{
  "personalInfo": { "name": "", "email": "", "phone": "", "linkedin": "" },
  "summary": "",
  "workExperience": [ { "company": "", "role": "", "startDate": "", "endDate": "", "description": "" } ],
  "education": [ { "institution": "", "degree": "", "endDate": "" } ],
  "skills": []
}
If a piece of information is not found in the text, you MUST use an empty string "" for string fields or an empty array [] for array fields.`;

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: rawText }]
          }],
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          generationConfig: {
            responseMimeType: "application/json",
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates[0].content.parts[0].text;
        console.log("Raw JSON Text:", jsonText);
        try {
            const parsedJson = JSON.parse(jsonText);
            return NextResponse.json(parsedJson);
        } catch (e) {
            console.error('Failed to parse JSON from Gemini response:', e);
            return NextResponse.json({ error: 'Failed to parse JSON from AI response.' }, { status: 500 });
        }
      }

      if (response.status === 503 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Gemini API unavailable, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json({ error: `Gemini API failed: ${errorData.error?.message || 'Unknown error'}` }, { status: response.status });

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Network error, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}