"use client";

import { useState, useRef, useEffect } from "react";
// We will dynamically import jspdf and html2canvas inside a useEffect hook

// Import all templates from our new central hub file.
import { templates } from "./templates/index.js";

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

  // State to hold the dynamically imported libraries
  const [jsPDF, setJsPDF] = useState(null);
  const [html2canvas, setHtml2canvas] = useState(null);

  // Dynamically import the libraries on the client side
  useEffect(() => {
    import("jspdf").then((module) => setJsPDF(() => module.default));
    import("html2canvas").then((module) =>
      setHtml2canvas(() => module.default)
    );
  }, []);

  const handleGenerate = async () => {
    // Check if libraries are loaded
    if (!jsPDF || !html2canvas) {
      setNotification({
        message:
          "PDF generation libraries are still loading. Please try again in a moment.",
        type: "error",
      });
      return;
    }

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

      pdfRef.current.innerHTML = templates[selectedTemplate].generate(data);

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
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
        pdfRef.current.innerHTML = "";
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
          <div
            className={`mb-6 p-4 rounded-md text-white ${notificationBgClass}`}
          >
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
                </a>
                .
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
              {Object.keys(templates).map((key) => (
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
                      __html: templates[key].preview,
                    }}
                  ></div>
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !jsPDF || !html2canvas}
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
