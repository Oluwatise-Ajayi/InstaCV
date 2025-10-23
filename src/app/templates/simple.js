import React, { useState } from "react";

// Preview string for template selection
export const preview = `
<div class="bg-white p-8 font-serif">
  <header class="text-center mb-4">
    <h1 class="text-3xl font-bold text-gray-800">John Doe</h1>
    <p class="text-xs text-gray-600 mt-1">johndoe@example.com | +1234567890 | in/johndoe</p>
  </header>
  <section class="mb-4">
    <h2 class="text-sm font-bold uppercase border-t border-b-2 border-gray-800 py-1">Summary</h2>
    <p class="text-xs text-gray-700 mt-2">Backend Developer with 2+ years of experience...</p>
  </section>
  <section>
    <h2 class="text-sm font-bold uppercase border-t border-b-2 border-gray-800 py-1">Experience</h2>
  </section>
</div>
`;

// Generate function for PDF export
export const generate = (data) => `
  <div style="width: 210mm; padding: 48px; font-family: Georgia, 'Times New Roman', serif; background: white; color: #2e3d50; font-size: 11pt; line-height: 1.4;">
    <div style="text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 2pt;">${
      data.personalInfo.name
    }</div>
     <div style="text-align: center; font-size: 7pt; margin-bottom: 8pt; display: flex; justify-content: center; align-items: center; gap: 8pt;">
      <a href="mailto:${
        data.personalInfo.email
      }" style="display: flex; align-items: center; text-decoration: none; color: #2e3d50;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 8pt; height: 8pt; margin-right: 3pt;position: relative; top: 1px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ${data.personalInfo.email}
        </a>
        <a href="tel:${
          data.personalInfo.phone
        }" style="display: flex; align-items: center; text-decoration: none; color: #2e3d50;">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 8pt; height: 8pt; margin-right: 3pt; position: relative; top: 1px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
         ${data.personalInfo.phone}
       </a>
       <a href="https://www.linkedin.com/${
         data.personalInfo.linkedin
       }" target="_blank" style="display: flex; align-items: center; text-decoration: none; color: #2e3d50;">
         <svg viewBox="0 0 24 24" fill="currentColor" style="width: 8pt; height: 8pt; margin-right: 3pt; position: relative; top: 1px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
         ${data.personalInfo.linkedin}
       </a>
    </div>
    
    ${
      data.summary
        ? `
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; border-top: 0.5pt solid #e5e7eb; border-bottom: 1.5pt solid #2e3d50; padding-top: 8pt; padding-bottom: 2pt; margin-top: 10pt; margin-bottom: 6pt;">SUMMARY</div>
    <div style="font-size: 9pt; line-height: 1.4; text-align: justify; margin-bottom: 4pt;">${data.summary}</div>
    `
        : ""
    }

    ${
      Array.isArray(data.experience) && data.experience.length > 0
        ? `
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; border-top: 0.5pt solid #e5e7eb; border-bottom: 1.5pt solid #2e3d50; padding-top: 8pt; padding-bottom: 2pt; margin-top: 10pt; margin-bottom: 6pt;">EXPERIENCE</div>
    ${data.experience
      .map(
        (exp) => `
      <div style="margin-bottom: 8pt;">
        <div style="font-size: 10pt; font-weight: bold;">${exp.title}</div>
        <div style="font-size: 9pt; display: flex; justify-content: space-between; margin-bottom: 3pt;">
          <span style="font-style: italic;">${exp.company}</span>
          <span style="font-size: 8pt; text-transform: uppercase;font-weight: 600;">${
            exp.dateRange
          }</span>
        </div>
        <ul style="font-size: 9pt; line-height: 1.4; margin: 0; padding-left: 0; list-style: none;">
          ${(exp.responsibilities || [])
            .map(
              (resp) => `
            <li style="position: relative; padding-left: 12pt; margin-bottom: 1pt;">
              <span style="position: absolute; left: 0;">•</span>
              ${resp}
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `
      )
      .join("")}
    `
        : ""
    }

    ${
      Array.isArray(data.projects) && data.projects.length > 0
        ? `
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; border-top: 0.5pt solid #e5e7eb; border-bottom: 1.5pt solid #2e3d50; padding-top: 8pt; padding-bottom: 2pt; margin-top: 10pt; margin-bottom: 6pt;">PERSONAL PROJECTS</div>
    ${data.projects
      .map(
        (proj) => `
      <div style="margin-bottom: 8pt;">
        <div style="font-size: 10pt; font-weight: bold; margin-bottom: 2pt;">${
          proj.name
        }</div>
        <ul style="font-size: 9pt; line-height: 1.4; margin: 0; padding-left: 0; list-style: none;">
          ${(proj.details || [])
            .map(
              (detail) => `
            <li style="position: relative; padding-left: 12pt; margin-bottom: 1pt;">
              <span style="position: absolute; left: 0;">•</span>
              ${detail}
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `
      )
      .join("")}
    `
        : ""
    }

    ${
      Array.isArray(data.education) && data.education.length > 0
        ? `
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; border-top: 0.5pt solid #e5e7eb; border-bottom: 1.5pt solid #2e3d50; padding-top: 8pt; padding-bottom: 2pt; margin-top: 10pt; margin-bottom: 6pt;">EDUCATION</div>
    ${data.education
      .map(
        (edu) => `
      <div style="margin-bottom: 6pt;">
        <div style="font-size: 10pt; font-weight: bold;">${edu.degree}</div>
        <div style="font-size: 9pt;">${edu.date || ""}</div>
      </div>
    `
      )
      .join("")}
    `
        : ""
    }

        ${
          Array.isArray(data.skills) && data.skills.length > 0
            ? `
      <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; border-top: 0.5pt solid #e5e7eb; border-bottom: 1.5pt solid #2e3d50; padding-top: 8pt; padding-bottom: 2pt; margin-top: 10pt; margin-bottom: 6pt;">SKILLS</div>
     <div style="display: flex; flex-wrap: wrap; gap: 6pt; margin-top: 4pt;">
       ${data.skills
         .flatMap((skillLine) => skillLine.split(",").map((s) => s.trim()))
         .filter(Boolean)
         .map(
           (skill) => `
        <span style="font-size: 9pt; background-color: #f3f4f6; padding: 2pt 6pt; border-radius: 4pt;">${skill}</span>
        `
         )
         .join("")}
       </div>
       `
            : ""
        }
     </div>
    `;

export default function DynamicResume() {
  const [resumeData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1234567890",
      linkedin: "in/johndoe",
    },
    summary:
      "Backend Developer with 2+ years of experience building scalable server-side applications using Node.js, Express.js, and TypeScript. Skilled in designing RESTful APIs, working with relational databases (MySQL, PostgreSQL) and NoSQL stores (MongoDB, Redis). Adept at containerized deployments (Docker, Kubernetes) and collaborating with cross-functional teams to deliver secure and efficient systems.",
    experience: [
      {
        title: "Senior Backend Engineer",
        company: "TechCorp Solutions",
        dateRange: "JANUARY 2025 - TO DATE",
        responsibilities: [
          "Designed and developed secure APIs using Node.js, Express, and TypeScript.",
          "Implemented industry-standard protocols for secure data exchange.",
          "Optimized complex SQL queries for large-scale datasets.",
          "Deployed services with Docker & Kubernetes for scalability.",
        ],
      },
      {
        title: "Backend Developer",
        company: "Digital Innovations Inc",
        dateRange: "SEPTEMBER 2024 - JANUARY 2025",
        responsibilities: [
          "Built RESTful APIs for web applications using Node.js & Express.js.",
          "Designed relational database schemas in MySQL to store user data and results.",
          "Implemented authentication/authorization for secure user access.",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "E-commerce Solutions Ltd",
        dateRange: "JUNE 2023 - SEPTEMBER 2023",
        responsibilities: [
          "Translated design mockups into efficient backend logic, ensuring APIs and database structures aligned with front-end requirements for responsive user experiences.",
          "Integrated third-party services and APIs to manage products, orders, and payments.",
          "Designed and secured relational databases, implementing indexing, migrations, and backup strategies to ensure reliability, performance, and data integrity.",
        ],
      },
      {
        title: "Teaching Assistant",
        company: "Code Academy Institute",
        dateRange: "JUNE 2022 - SEPTEMBER 2023",
        responsibilities: [
          "Supporting lead instructors in teaching classes and workshops.",
          "Helping to grade assignments, quizzes and exams, providing feedback to students.",
          "Attending staff meetings to discuss student progress, curriculum development and academy policies.",
          "Assisted in teaching Node.js + MySQL backend development.",
          "Facilitated lab sessions and boosted student project completion rates by 20%.",
        ],
      },
    ],
    projects: [
      {
        name: "Video Learning Platform",
        details: [
          "Built a comprehensive learning platform to showcase full-stack development skills.",
          "Created an educational website where users can access informational videos across various topics.",
          "Implemented video player functionality with event listeners, player settings, and content loading.",
          "Optimized video encoding in multiple formats to ensure cross-browser and device compatibility.",
          "Delivered video content efficiently using CDNs and caching mechanisms.",
        ],
      },
      {
        name: "Blog Platform (MERN Stack)",
        details: [
          "Built CRUD APIs, integrated MongoDB, and implemented dynamic page rendering with EJS.",
          "Engineered a scalable blog platform using the MERN stack, incorporating authentication, interactive commenting, and RESTful routing to enhance user engagement and content management.",
        ],
      },
      {
        name: "Healthcare Information Chatbot",
        details: [
          "Developed an AI-powered chatbot with healthcare API integration for accurate information retrieval.",
          "Designed an intuitive conversational interface to enhance user comprehension and accessibility.",
        ],
      },
    ],
    education: [
      {
        degree: "Secondary School Certification",
        date: "2015-2021",
      },
    ],
    skills: [
      "HTML, CSS, Javascript(ES6+), React, Nextjs , Typescript",
      "Software: Containerized Application, Container Management, Kubernetes, GitLab CI, Cloud-native deployments",
      "Git and GitHub, Postman, Grafana, Ollama, Kind, , Docker, CI/CDGitLabb",
      "ExpressJs, Nodejs, Nestjs",
      "REST API, WordPress, , Fast API",
      "MongoDB, MySQL, PostgreSQL, Redis",
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div
        className="max-w-[210mm] mx-auto bg-white px-12 py-8 shadow-lg"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: "#2e3d50",
          fontSize: "11pt",
          lineHeight: "1.4",
        }}
      >
        {/* Header */}
        <div className="text-center text-xl font-bold mb-1">
          {resumeData.personalInfo.name}
        </div>

        {/* Contact Info */}
        <div
          className="flex justify-center items-center gap-2 mb-3"
          style={{ fontSize: "7pt" }}
        >
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="flex items-center gap-1 hover:underline"
            style={{ color: "#2e3d50" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: "8pt", height: "8pt", position: 'relative', top: '1px'  }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {resumeData.personalInfo.email}
          </a>
          <a
            href={`tel:${resumeData.personalInfo.phone}`}
            className="flex items-center gap-1 hover:underline"
            style={{ color: "#2e3d50" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: "8pt", height: "8pt", position: 'relative', top: '1px'  }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {resumeData.personalInfo.phone}
          </a>
          <a
            href={`https://linkedin.com/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
            style={{ color: "#2e3d50" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "8pt", height: "8pt" , position: 'relative', top: '1px' }}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            {resumeData.personalInfo.linkedin}
          </a>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <>
            <div
              className="text-xs font-bold uppercase border-t border-b-2 pt-2 pb-0.5 mb-2"
              style={{
                borderTopWidth: "0.5pt",
                borderBottomWidth: "1.5pt",
                borderTopColor: "#e5e7eb",
                borderBottomColor: "#2e3d50",
                marginTop: "10pt",
                marginBottom: "6pt",
              }}
            >
              SUMMARY
            </div>
            <div
              className="text-xs text-justify mb-1"
              style={{ fontSize: "9pt", lineHeight: "1.4" }}
            >
              {resumeData.summary}
            </div>
          </>
        )}

        {/* Experience */}
        {Array.isArray(resumeData.experience) &&
          resumeData.experience.length > 0 && (
            <>
              <div
                className="text-xs font-bold uppercase border-t border-b-2 pt-2 pb-0.5 mb-2"
                style={{
                  borderTopWidth: "0.5pt",
                  borderBottomWidth: "1.5pt",
                  borderTopColor: "#e5e7eb",
                  borderBottomColor: "#2e3d50",
                  marginTop: "10pt",
                  marginBottom: "6pt",
                }}
              >
                EXPERIENCE
              </div>
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <div
                    className="text-sm font-bold"
                    style={{ fontSize: "10pt" }}
                  >
                    {exp.title}
                  </div>
                  <div
                    className="flex justify-between items-baseline text-xs mb-1"
                    style={{ fontSize: "9pt" }}
                  >
                    <span className="italic">{exp.company}</span>
                    <span
                      className="uppercase"
                      style={{ fontSize: "8pt", fontWeight: "600" }}
                    >
                      {exp.dateRange}
                    </span>
                  </div>
                  <ul
                    className="list-none ml-0 pl-0 text-xs mb-2"
                    style={{ fontSize: "9pt", lineHeight: "1.4" }}
                  >
                    {(exp.responsibilities || []).map((resp, i) => (
                      <li
                        key={i}
                        className="relative pl-3 mb-0.5"
                        style={{ paddingLeft: "12pt" }}
                      >
                        <span className="absolute left-0">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

        {/* Projects */}
        {Array.isArray(resumeData.projects) &&
          resumeData.projects.length > 0 && (
            <>
              <div
                className="text-xs font-bold uppercase border-t border-b-2 pt-2 pb-0.5 mb-2"
                style={{
                  borderTopWidth: "0.5pt",
                  borderBottomWidth: "1.5pt",
                  borderTopColor: "#e5e7eb",
                  borderBottomColor: "#2e3d50",
                  marginTop: "10pt",
                  marginBottom: "6pt",
                }}
              >
                PERSONAL PROJECTS
              </div>
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="mb-3">
                  <div
                    className="text-sm font-bold mb-0.5"
                    style={{ fontSize: "10pt" }}
                  >
                    {proj.name}
                  </div>
                  <ul
                    className="list-none ml-0 pl-0 text-xs mb-2"
                    style={{ fontSize: "9pt", lineHeight: "1.4" }}
                  >
                    {(proj.details || []).map((detail, i) => (
                      <li
                        key={i}
                        className="relative pl-3 mb-0.5"
                        style={{ paddingLeft: "12pt" }}
                      >
                        <span className="absolute left-0">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

        {/* Education */}
        {Array.isArray(resumeData.education) &&
          resumeData.education.length > 0 && (
            <>
              <div
                className="text-xs font-bold uppercase border-t border-b-2 pt-2 pb-0.5 mb-2"
                style={{
                  borderTopWidth: "0.5pt",
                  borderBottomWidth: "1.5pt",
                  borderTopColor: "#e5e7eb",
                  borderBottomColor: "#2e3d50",
                  marginTop: "10pt",
                  marginBottom: "6pt",
                }}
              >
                EDUCATION
              </div>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div
                    className="text-sm font-bold"
                    style={{ fontSize: "10pt" }}
                  >
                    {edu.degree}
                  </div>
                  <div className="text-xs" style={{ fontSize: "9pt" }}>
                    {edu.date || ""}
                  </div>
                </div>
              ))}
            </>
          )}

        {/* Skills */}
        {Array.isArray(resumeData.skills) && resumeData.skills.length > 0 && (
          <>
            <div
              className="text-xs font-bold uppercase border-t border-b-2 pt-1 pb-0.5 mb-2"
              style={{
                borderTopWidth: "0.5pt",
                borderBottomWidth: "1.5pt",
                borderColor: "#2e3d50",
                marginTop: "10pt",
                marginBottom: "6pt",
              }}
            >
              SKILLS
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {resumeData.skills
                .flatMap((skillLine) =>
                  skillLine.split(",").map((s) => s.trim())
                )
                .filter(Boolean)
                .map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-xs rounded px-2 py-1"
                    style={{ fontSize: "9pt" }}
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
