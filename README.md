# InstaCV - AI Resume Builder 🚀

## Overview

InstaCV is a modern web application that leverages cutting-edge AI to transform raw text into professionally formatted resumes. Built with **Next.js**, **React**, and **Tailwind CSS**, it provides an intuitive interface for users to input their resume content and generate polished PDF documents using various templates, powered by the **Google Gemini API** for intelligent parsing.

## Features

-   **AI-Powered Resume Parsing**: Utilizes the Google Gemini API to accurately extract personal information, work experience, education, and skills from unstructured text.
-   **Multiple Resume Templates**: Offers a selection of aesthetically pleasing templates (e.g., Classic, Modern) for diverse professional styles.
-   **Instant PDF Generation**: Converts parsed data into high-quality, downloadable PDF resumes directly in the browser using `jspdf` and `html2canvas`.
-   **Responsive User Interface**: A sleek, mobile-friendly design ensures a seamless experience across devices.
-   **Secure API Handling**: Integrates with external AI services while processing API keys and requests securely via Next.js API routes.

## Technologies Used

| Category     | Technology       | Description                                                                                             |
| :----------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| **Framework**  | Next.js          | A React framework for building full-stack web applications, enabling server-side rendering and API routes. |
| **Frontend**   | React            | A declarative, component-based JavaScript library for building dynamic user interfaces.                 |
| **Language**   | TypeScript       | A superset of JavaScript that adds static typing, enhancing code quality, maintainability, and scalability. |
| **Styling**    | Tailwind CSS     | A utility-first CSS framework for rapidly building custom designs directly in your markup.                |
| **Backend**    | Node.js          | JavaScript runtime environment powering the Next.js API routes for server-side logic.                   |
| **AI/ML**      | Google Gemini API | Advanced multimodal AI model used for natural language understanding and structured data extraction.      |
| **PDF Tools**  | jsPDF            | A client-side JavaScript library for generating PDF documents.                                          |
|                | html2canvas      | A JavaScript library to capture screenshots of web pages or parts of them for PDF conversion.           |

## Getting Started

Follow these step-by-step instructions to set up and run the InstaCV project locally on your machine.

### Installation ✨

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd instacv
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables 🔑

The application requires a **Google Gemini API Key** to perform resume parsing. This key is provided by the user directly within the application's UI and is then securely passed to the Next.js API routes for processing.

-   `GOOGLE_GEMINI_API_KEY`: Your personal API key obtained from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   **Example Value**: `AIzaSyC0Wv_Your_Actual_API_Key_Here`

### Running the Development Server 🚀

To start the development server and access the application:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

InstaCV simplifies the process of creating a professional resume from raw text input.

1.  **Obtain Your API Key**: Navigate to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate your unique Google Gemini API Key.
2.  **Input API Key**: On the InstaCV homepage, paste your newly acquired Google Gemini API Key into the "Google Gemini API Key" input field.
3.  **Provide Raw Resume Text**: In the "Raw Text Input" textarea, paste the complete, unstructured content of your resume. This can include personal details, summary, work experience, education, and skills. An example text is provided by default to guide you.
4.  **Select a Template**: Choose your preferred resume style by clicking on either the "Classic" or "Modern" template preview.
5.  **Generate PDF**: Click the "Create My Resume" button. The application will leverage AI to parse your text, format it according to the chosen template, and automatically download a professional PDF resume to your device.

---

# InstaCV API

## Overview
The InstaCV API comprises a set of Next.js API routes implemented in JavaScript, leveraging the Node.js runtime. These routes serve as an intermediary layer, facilitating secure and structured communication with the Google Gemini API for AI-powered resume data extraction and offering an endpoint for model discovery.

## Features
-   **AI Resume Parsing**: Dedicated endpoint for sending raw resume text to the Google Gemini API, which then extracts and returns structured JSON data based on a predefined schema.
-   **Gemini Model Interaction**: Manages the HTTP requests and responses with the Google Generative Language API, including basic error handling and retry logic for transient service unavailability.
-   **Model Discovery**: Provides an endpoint to query the Google Gemini API for a list of available AI models, useful for debugging and future model integration.

## Getting Started
### Installation
The API routes are an integral part of the main Next.js application. To set up the API, simply follow the "Getting Started" instructions provided for the primary InstaCV project above. No separate installation steps are required for the API component.

### Environment Variables
The `apiKey` for the Google Gemini API is a mandatory credential for all API operations involving the Gemini service. This `apiKey` is expected to be passed directly within the request body or as a query parameter from the client-side, rather than being stored as a server-side environment variable.

## API Documentation
### Base URL
`/api`

### Endpoints

#### `POST /api/parse`
Parses raw resume text into a structured JSON object using the Google Gemini AI.

**Request**:
```json
{
  "rawText": "John Doe\nNew York, NY | (123) 456-7890 | john.doe@email.com | linkedin.com/in/johndoe\n\nProfessional Summary\nA highly motivated and experienced software engineer with a passion for developing innovative solutions.\n\nWork Experience\nTech Company - Senior Software Engineer\nNew York, NY | Jan 2020 - Present\n- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.\n\nEducation\nUniversity of Technology - Bachelor of Science in Computer Science\n2016 - 2020\n\nSkills\nJavaScript, React, Node.js, Python, SQL",
  "apiKey": "YOUR_GOOGLE_GEMINI_API_KEY"
}
```
*   `rawText` (string, required): The complete, unstructured text content of the resume.
*   `apiKey` (string, required): Your valid Google Gemini API Key, used for authentication with the Gemini service.

**Response**:
```json
{
  "personalInfo": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "(123) 456-7890",
    "linkedin": "linkedin.com/in/johndoe"
  },
  "summary": "A highly motivated and experienced software engineer with a passion for developing innovative solutions.",
  "workExperience": [
    {
      "company": "Tech Company",
      "role": "Senior Software Engineer",
      "startDate": "Jan 2020",
      "endDate": "Present",
      "description": "- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software."
    }
  ],
  "education": [
    {
      "institution": "University of Technology",
      "degree": "Bachelor of Science in Computer Science",
      "endDate": "2020"
    }
  ],
  "skills": [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL"
  ]
}
```
*   The response strictly adheres to the defined JSON schema, extracting all identifiable resume components. Fields not found in the `rawText` will be represented by empty strings (`""`) or empty arrays (`[]`).

**Errors**:
-   `400 Bad Request`: Occurs if the `rawText` or `apiKey` fields are missing from the request body.
    ```json
    { "error": "Missing rawText or apiKey" }
    ```
-   `500 Internal Server Error`: A general server-side error, potentially due to network issues, unexpected API responses, or problems during JSON parsing of the AI's output.
    ```json
    { "error": "Internal Server Error" }
    ```
    ```json
    { "error": "Failed to parse JSON from AI response." }
    ```
-   `4xx/5xx Gemini API Failure`: Direct error responses from the Google Gemini API (e.g., an invalid API key, rate limiting, or service unavailability). The HTTP status code will correspond to the Gemini API's original response.
    ```json
    { "error": "Gemini API failed: API key not valid. Please pass a valid API key." }
    ```

#### `GET /api/test-models`
Retrieves a list of all currently available Google Gemini models, along with their detailed information.

**Request**:
Query Parameter: `apiKey` (required)
Example: `/api/test-models?apiKey=YOUR_GOOGLE_GEMINI_API_KEY`

**Response**:
```json
{
  "models": [
    {
      "name": "models/gemini-2.5-flash",
      "version": "001",
      "displayName": "Gemini 2.5 Flash",
      "description": "Fastest and most flexible multimodal model for large-scale, high-frequency tasks.",
      "inputTokenLimit": 32768,
      "outputTokenLimit": 8192,
      "supportedGenerationMethods": [
        "generateContent",
        "countTokens"
      ],
      "temperature": 1,
      "topP": 0.95,
      "topK": 64
    },
    {
      "name": "models/gemini-pro-latest",
      "version": "001",
      "displayName": "Gemini 1.0 Pro Latest",
      "description": "The best model for scaling across a wide range of tasks.",
      // ... more model details
    }
  ]
}
```
*   Returns a JSON object containing an array of `model` objects, each detailing an available Gemini model's capabilities and specifications.

**Errors**:
-   `400 Bad Request`: The `apiKey` query parameter is missing from the request.
    ```json
    { "error": "Missing apiKey" }
    ```
-   `500 Internal Server Error`: An error occurred while attempting to fetch model information from the Google Gemini API (e.g., network connectivity issues, an invalid API key leading to an upstream error).
    ```json
    { "error": "Error: Request failed with status code 403" }
    ```

---

## Contributing

We welcome contributions to InstaCV! If you have suggestions for improvements, new features, or bug fixes, please consider contributing by following these guidelines:

1.  **Fork the repository** 🍴.
2.  **Create a new branch** for your specific feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Implement your changes** and ensure they align with the existing code style and best practices.
4.  **Test your changes** thoroughly to prevent regressions.
5.  **Commit your changes** with clear and concise commit messages.
6.  **Push your branch** to your forked repository.
7.  **Open a Pull Request** to the `main` branch of this repository, providing a detailed description of your changes and their benefits.

## License

This project is currently not licensed. Please contact the author for more information regarding usage and distribution.

## Author Info

Developed with a commitment to modern web technologies and AI integration.

-   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your_username)
-   **Portfolio**: [Your Portfolio Website](https://yourportfolio.com)
-   **Email**: [your.email@example.com](mailto:your.email@example.com)

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-FFC107?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)