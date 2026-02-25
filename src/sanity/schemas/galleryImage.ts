import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility and SEO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      description: "City slug where this project was completed (e.g., spokane)",
    }),
    defineField({
      name: "service",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Concrete Cutting", value: "concrete-cutting" },
          { title: "Core Drilling", value: "core-drilling" },
          { title: "Wall Sawing", value: "wall-sawing" },
          { title: "Concrete Removal", value: "concrete-removal" },
          { title: "Concrete Scanning (GPR)", value: "concrete-scanning" },
          { title: "Flat Sawing", value: "flat-sawing" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "alt", media: "image", subtitle: "caption" },
  },
});
