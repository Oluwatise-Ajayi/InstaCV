// /templates/index.js

// This file acts as a central hub for all our templates.
// It imports each template and exports them all in one convenient object.
// This makes it super easy to add more templates later!

import { preview as classicPreview, generate as classicGenerate } from "./classic.js";
import { preview as modernPreview, generate as modernGenerate } from "./modern.js";
import { preview as simplePreview, generate as simpleGenerate } from "./simple.js";

export const templates = {
  classic: {
    preview: classicPreview,
    generate: classicGenerate,
  },
  modern: {
    preview: modernPreview,
    generate: modernGenerate,
  },
   simple: {
    preview: simplePreview,
    generate: simpleGenerate,
  },
  // To add a new template, you'd just import it and add it here:
  // creative: {
  //   preview: creativePreview,
  //   generate: creativeGenerate,
  // }
};

