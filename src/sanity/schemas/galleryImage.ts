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
      description: "City slug where this project was completed (e.g., maple-valley-wa)",
    }),
    defineField({
      name: "service",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Trenching", value: "trenching" },
          { title: "Grading", value: "grading" },
          { title: "Site Preparation", value: "site-preparation" },
          { title: "Selective Demolition", value: "selective-demolition" },
          { title: "Concrete Driveways", value: "concrete-driveways" },
          { title: "Concrete Patios", value: "concrete-patios" },
          { title: "Concrete Slabs", value: "concrete-slabs" },
          { title: "Concrete Sidewalks & Flatwork", value: "concrete-sidewalks" },
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
