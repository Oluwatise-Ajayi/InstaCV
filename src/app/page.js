"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const classicTemplateExample = `
  <div class="bg-white p-8">
    <h1 class="text-4xl font-bold text-center mb-2">John Doe</h1>
    <div class="text-center mb-6">
      <p>newyork, NY | (123) 456-7890 | john.doe@email.com | linkedin.com/in/johndoe</p>
    </div>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Professional Summary</h2>
      <p>A highly motivated and experienced software engineer with a passion for developing innovative solutions.</p>
    </div>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Work Experience</h2>
      <div>
        <h3 class="text-xl font-bold">Tech Company</h3>
        <p class="italic">Senior Software Engineer | New York, NY | Jan 2020 - Present</p>
        <ul class="list-disc list-inside mt-2">
          <li>Developed and maintained web applications using React and Node.js.</li>
          <li>Collaborated with cross-functional teams to deliver high-quality software.</li>
        </ul>
      </div>
    </div>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
      <div>
        <h3 class="text-xl font-bold">University of Technology</h3>
        <p class="italic">Bachelor of Science in Computer Science | 2016 - 2020</p>
      </div>
    </div>
    <div>
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
      <p>JavaScript, React, Node.js, Python, SQL</p>
    </div>
  </div>
`;

const modernTemplateExample = `
<div class="bg-white p-8 font-sans">
<header class="text-center mb-8">
  <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight">Jane Smith</h1>
  <p class="text-lg text-gray-500 mt-2">jane.smith@email.com | (987) 654-3210 | linkedin.com/in/janesmith</p>
</header>
<section class="mb-8">
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Summary</h2>
  <p class="text-gray-700 leading-relaxed">Dynamic and creative professional with a proven track record of success in project management and digital marketing. Adept at leveraging new technologies to drive brand growth.</p>
</section>
<section class="mb-8">
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Experience</h2>
  <div class="mb-4">
    <h3 class="text-2xl font-semibold text-gray-800">Creative Agency</h3>
    <p class="text-md text-gray-500">Digital Marketer | San Francisco, CA | 2018 - 2022</p>
    <ul class="list-disc list-inside text-gray-700 mt-2 space-y-1">
      <li>Executed multi-channel marketing campaigns that increased lead generation by 40%.</li>
      <li>Managed social media accounts, growing follower base by over 200%.</li>
    </ul>
  </div>
</section>
<section class="mb-8">
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Education</h2>
  <div class="mb-4">
    <h3 class="text-2xl font-semibold text-gray-800">State University</h3>
    <p class="text-md text-gray-500">B.A. in Marketing | 2014 - 2018</p>
  </div>
</section>
<section>
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Skills</h2>
  <div class="flex flex-wrap gap-2">
    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">SEO</span>
    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Content Marketing</span>
    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Google Analytics</span>
  </div>
</section>
</div>
`;

const resumeTemplates = {
  classic: (data) => `
      <div style="width: 210mm; min-height: 297mm; padding: 1in; font-family: 'Times New Roman', serif; background-color: white;">
        <h1 style="font-size: 24pt; font-weight: bold; text-align: center; margin-bottom: 4px;">${
          data.personalInfo.name
        }</h1>
        <div style="text-align: center; font-size: 10pt; margin-bottom: 12px;">
          ${data.personalInfo.email} | ${data.personalInfo.phone} | ${
    data.personalInfo.linkedin
  }
        </div>
        <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Summary</h2>
        <p style="font-size: 10pt;">${data.summary}</p>
        <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Work Experience</h2>
        ${data.workExperience
          .map(
            (job) => `
          <div style="margin-bottom: 12px;">
            <h3 style="font-size: 12pt; font-weight: bold;">${job.company} - <em>${job.role}</em></h3>
            <p style="font-size: 10pt; font-style: italic;">${job.startDate} - ${job.endDate}</p>
            <p style="font-size: 10pt;">${job.description}</p>
          </div>
        `
          )
          .join("")}
        <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Education</h2>
        ${data.education
          .map(
            (edu) => `
          <div style="margin-bottom: 12px;">
            <h3 style="font-size: 12pt; font-weight: bold;">${edu.institution}</h3>
            <p style="font-size: 10pt; font-style: italic;">${edu.degree}, ${edu.endDate}</p>
          </div>
        `
          )
          .join("")}
        <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Skills</h2>
        <p style="font-size: 10pt;">${data.skills.join(", ")}</p>
      </div>
    `,
  modern: (data) => `
      <div style="width: 210mm; min-height: 297mm; padding: 1in; font-family: 'Helvetica', sans-serif; background-color: white; display: flex;">
        <div style="width: 35%; padding-right: 20px; border-right: 2px solid #f3f4f6;">
            <h1 style="font-size: 22pt; font-weight: bold; color: #1e40af; margin-bottom: 8px;">${
              data.personalInfo.name
            }</h1>
            <div style="font-size: 9pt; color: #4b5563;">
                <p>${data.personalInfo.email}</p>
                <p>${data.personalInfo.phone}</p>
                <p>${data.personalInfo.linkedin}</p>
            </div>
            <h2 style="font-size: 12pt; font-weight: bold; color: #1e40af; margin-top: 24px; margin-bottom: 8px;">SKILLS</h2>
            <div style="font-size: 10pt;">
                ${data.skills
                  .map(
                    (skill) =>
                      `<span style="background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; margin-right: 4px; display: inline-block; margin-bottom: 4px;">${skill}</span>`
                  )
                  .join("")}
            </div>
        </div>
        <div style="width: 65%; padding-left: 20px;">
            <h2 style="font-size: 12pt; font-weight: bold; color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 4px; margin-bottom: 12px;">SUMMARY</h2>
            <p style="font-size: 10pt; color: #4b5563;">${data.summary}</p>
            <h2 style="font-size: 12pt; font-weight: bold; color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px;">WORK EXPERIENCE</h2>
            ${data.workExperience
              .map(
                (job) => `
              <div style="margin-bottom: 16px;">
                <h3 style="font-size: 11pt; font-weight: bold;">${job.role}</h3>
                <p style="font-size: 10pt; font-semibold; color: #4b5563;">${job.company} | ${job.startDate} - ${job.endDate}</p>
                <p style="font-size: 10pt; color: #4b5563; margin-top: 4px;">${job.description}</p>
              </div>
            `
              )
              .join("")}
            <h2 style="font-size: 12pt; font-weight: bold; color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px;">EDUCATION</h2>
            ${data.education
              .map(
                (edu) => `
              <div style="margin-bottom: 16px;">
                <h3 style="font-size: 11pt; font-weight: bold;">${edu.institution}</h3>
                <p style="font-size: 10pt; color: #4b5563;">${edu.degree}, ${edu.endDate}</p>
              </div>
            `
              )
              .join("")}
        </div>
      </div>
    `,
};

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [rawText, setRawText] = useState(`John Doe
  New York, NY | (123) 456-7890 | john.doe@email.com | linkedin.com/in/johndoe
  
  Professional Summary
  A highly motivated and experienced software engineer with a passion for developing innovative solutions.
  
  Work Experience
  Tech Company - Senior Software Engineer
  New York, NY | Jan 2020 - Present
  - Developed and maintained web applications using React and Node.js.
  - Collaborated with cross-functional teams to deliver high-quality software.
  
  Education
  University of Technology - Bachelor of Science in Computer Science
  2016 - 2020
  
  Skills
  JavaScript, React, Node.js, Python, SQL`);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const pdfRef = useRef(null);

  const handleGenerate = async () => {
    if (!apiKey || !rawText) {
      setNotification({
        message: "API Key and text are required.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setNotification({ message: "Parsing with AI...", type: "info" });

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, rawText }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to parse resume.");
      }

      const data = await response.json();
      setNotification({ message: "Generating PDF...", type: "info" });

      // Render template to hidden div
      pdfRef.current.innerHTML = resumeTemplates[selectedTemplate](data);

      // Generate PDF
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("InstaCV_Resume.pdf");

      setNotification({
        message: "Success! Your resume has been downloaded.",
        type: "success",
      });
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
      if (pdfRef.current) {
        pdfRef.current.innerHTML = ""; // Clear the hidden div
      }
    }
  };

  const notificationBgClass = (() => {
    if (notification.type === "error") return "bg-red-500";
    if (notification.type === "success") return "bg-green-500";
    return "bg-blue-500";
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            InstaCV
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Paste your details, pick a template, and let AI do the rest.
          </p>
        </header>

        {notification.message && (
          <div className={`mb-6 p-4 rounded-md text-white ${notificationBgClass}`}>
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Input & Configuration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700"
              >
                Google Gemini API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p className="mt-2 text-xs text-gray-500">
                Get your key from{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Google AI Studio
                </a>.
              </p>
            </div>

            <div>
              <label
                htmlFor="rawText"
                className="block text-sm font-medium text-gray-700"
              >
                Raw Text Input
              </label>
              <textarea
                id="rawText"
                rows="20"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your entire resume content here..."
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          {/* Column 2: Templates & Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select a Template
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {Object.keys(resumeTemplates).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTemplate(key)}
                  className={`w-full text-left cursor-pointer border-2 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    selectedTemplate === key
                      ? "border-indigo-500"
                      : "border-gray-200"
                  }`}
                  aria-pressed={selectedTemplate === key}
                >
                  <div className="p-2 bg-gray-100 text-center font-semibold capitalize">
                    {key}
                  </div>
                  <div
                    className="p-2 h-48 overflow-y-auto text-xs"
                    dangerouslySetInnerHTML={{
                      __html:
                        key === "classic"
                          ? classicTemplateExample
                          : modernTemplateExample,
                    }}
                  ></div>
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "Create My Resume"
              )}
            </button>
          </div>
        </div>

        <div
          ref={pdfRef}
          style={{ position: "absolute", top: "-9999px", left: 0 }}
        ></div>
      </main>
    </div>
  );
}
