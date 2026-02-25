import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g., "Spokane, WA"',
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    }),
    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
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
      title: "Review Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      description: "Show this testimonial on the homepage",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", rating: "rating" },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: `${"★".repeat(rating || 0)} — ${subtitle || ""}`,
      };
    },
  },
});
