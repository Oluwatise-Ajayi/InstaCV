// /templates/classic.js

// This string is just for the small preview card in the UI.
export const preview = `
  <div class="bg-white p-8">
    <h1 class="text-4xl font-bold text-center mb-2">John Doe</h1>
    <div class="text-center mb-6">
      <p>newyork, NY | (123) 456-7890 | john.doe@email.com | linkedin.com/in/johndoe</p>
    </div>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Professional Summary</h2>
      <p>A highly motivated and experienced software engineer...</p>
    </div>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Work Experience</h2>
    </div>
  </div>
`;

// This function generates the final HTML for the PDF, using the AI-parsed data.
export const generate = (data) => `
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
      
      ${
        Array.isArray(data.experience) && data.experience.length > 0
          ? `
       <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Work Experience</h2>
      ${data.experience
        .map(
          (job) => `
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 12pt; font-weight: bold;">${
            job.company
          } - <em>${job.title}</em></h3>
          <p style="font-size: 10pt; font-style: italic;">${job.dateRange}</p>
          <ul style="font-size: 10pt; padding-left: 20px; margin-top: 4px;">
            ${(job.responsibilities || [])
              .map((resp) => `<li>${resp}</li>`)
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
       <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Education</h2>
      ${data.education
        .map(
          (edu) => `
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 12pt; font-weight: bold;">${edu.degree}</h3>
          <p style="font-size: 10pt; font-style: italic;">${edu.date}</p>
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
       <h2 style="font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-top: 16px; margin-bottom: 8px;">Skills</h2>
     <p style="font-size: 10pt;">${data.skills.join(", ")}</p>
       `
           : ""
       }
     </div>
    `;
