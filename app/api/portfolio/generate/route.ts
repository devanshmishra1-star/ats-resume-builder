import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from '@/lib/cloudinary';
const pdfParse = require("pdf-parse/lib/pdf-parse.js");
const mammoth = require("mammoth");

const SYSTEM_PROMPT = `MASTER PROMPT — PREMIUM AI DIGITAL PORTFOLIO GENERATOR

You are a world-class product designer, UX engineer, creative developer, motion designer, and portfolio architect.
Your job is to transform a user's resume into a premium, highly personalized, production-quality digital portfolio website.
The result must feel like a website designed by a top-tier human design team for a premium global product (e.g., award-winning awwwards sites).

==================================================
1. RESUME-FIRST INTELLIGENCE
==================================================
Deeply analyze the uploaded resume.
Determine professional identity, career level, industry, and strongest accomplishments.
Do NOT invent facts.

==================================================
2. PREMIUM COPYWRITING
==================================================
Instead of generic titles like "Software Engineer", write a compelling, high-converting value proposition.
Example: "Users leave. I design the reasons they stay." or "I build scalable systems that handle millions."
Identify 3-4 "Key Metrics" from their experience (e.g., "10+ Years Exp", "$1M Revenue", "50+ Projects").

==================================================
3. DESIGN SPECIFICATION
==================================================
You must generate a structured portfolio specification. DO NOT return HTML/CSS.
The output must be valid JSON matching this exact schema:

{
  "design": {
    "visualDirection": {
      "style": "technical" | "minimal-editorial" | "creative" | "corporate",
      "mood": "confident" | "elegant" | "bold" | "clean",
      "accentColor": "#HexCode",
      "fontHeading": "string (e.g. Space Grotesk, Playfair Display, Inter)",
      "fontBody": "string (e.g. Inter, Roboto Mono, Lora)"
    },
    "layout": {
      "hero": "split" | "premium-editorial" | "centered" | "asymmetric",
      "projects": "featured-grid" | "horizontal-showcase" | "case-studies",
      "experience": "timeline" | "cards" | "editorial",
      "skills": "grouped" | "chips" | "visual-stack" | "pillars"
    }
  },
  "sections": ["about", "skills", "experience", "projects", "education"],
  "profile": {
    "name": "string",
    "role": "string",
    "valueProposition": "string (A catchy, premium 1-2 sentence headline)",
    "valuePropositionHighlight": "string (1-3 words from the proposition to emphasize in italic/serif)",
    "about": "string",
    "email": "string",
    "location": "string",
    "image": "string",
    "links": [{"platform": "string", "url": "string"}]
  },
  "keyMetrics": [{"value": "string (e.g. 10+)", "label": "string (e.g. Years Experience)"}],
  "skills": [{"category": "string", "items": ["string"]}],
  "experience": [{"company": "string", "role": "string", "duration": "string", "description": ["string"]}],
  "projects": [{"title": "string", "techStack": "string", "duration": "string", "description": "string", "link": "string"}],
  "education": [{"institution": "string", "degree": "string", "duration": "string", "details": "string"}]
}

Return ONLY valid JSON. No markdown formatting.
`;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const picture = formData.get("picture") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    let pictureUrl = "";
    if (picture) {
      try {
        const arrayBuffer = await picture.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ats_resume_builder/profiles' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        pictureUrl = (uploadResult as any).secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      } catch (picErr) {
        console.error("Picture upload failed", picErr);
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    let promptParts: any[] = [];

    if (file.type === "application/pdf") {
      promptParts = [
        SYSTEM_PROMPT,
        {
          inlineData: {
            data: buffer.toString("base64"),
            mimeType: "application/pdf",
          },
        },
      ];
    } else {
      let text = "";
      if (file.name.endsWith(".docx")) {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else if (file.name.endsWith(".pdf")) {
         const data = await pdfParse(buffer);
         text = data.text;
      } else {
         text = buffer.toString("utf-8"); 
      }
      promptParts = [SYSTEM_PROMPT, `Here is the text extracted from the resume:\n\n${text}`];
    }

    let responseText = "";
    try {
      const result = await model.generateContent(promptParts);
      responseText = result.response.text();
    } catch (modelError: any) {
      console.log("gemini-3.6-flash failed, falling back to 3.5-flash", modelError.message);
      model = genAI.getGenerativeModel({ 
        model: "gemini-3.5-flash",
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 }, 
      });
      
      let text = "";
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
         const data = await pdfParse(buffer);
         text = data.text;
      } else if (file.name.endsWith(".docx")) {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else {
        text = buffer.toString("utf-8");
      }
      
      promptParts = [SYSTEM_PROMPT, `Here is the text extracted from the resume:\n\n${text}`];
      const result = await model.generateContent(promptParts);
      responseText = result.response.text();
    }
    
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      const cleanJson = responseText.replace(/```json\n/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
    }

    if (pictureUrl && parsedData.profile) {
      parsedData.profile.image = pictureUrl;
    }

    return NextResponse.json({ portfolio: parsedData });

  } catch (error: any) {
    console.error("Portfolio Generation Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
