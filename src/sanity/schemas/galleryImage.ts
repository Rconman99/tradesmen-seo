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
      description: "City slug where this project was completed (e.g., heber-city)",
    }),
    defineField({
      name: "service",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Re-Roof", value: "re-roof" },
          { title: "Hail Damage Repair", value: "hail-damage-repair" },
          { title: "Wind Damage Repair", value: "wind-damage-repair" },
          { title: "Leak Repair", value: "leak-repair" },
          { title: "Gutters & Siding", value: "gutters-and-siding" },
          { title: "Commercial Roofing", value: "commercial-roofing" },
          { title: "Roof Maintenance", value: "roof-maintenance-agreements" },
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
