// /templates/modern.js

// This string is just for the small preview card in the UI.
export const preview = `
<div class="bg-white p-8 font-sans">
<header class="text-center mb-8">
  <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight">Jane Smith</h1>
  <p class="text-lg text-gray-500 mt-2">jane.smith@email.com | (987) 654-3210 | linkedin.com/in/janesmith</p>
</header>
<section class="mb-8">
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Summary</h2>
  <p class="text-gray-700 leading-relaxed">Dynamic and creative professional with a proven track record...</p>
</section>
<section>
  <h2 class="text-xl font-bold text-blue-600 uppercase tracking-wider mb-3">Skills</h2>
</section>
</div>
`;

// This function generates the final HTML for the PDF, using the AI-parsed data.
export const generate = (data) => `
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
`;
