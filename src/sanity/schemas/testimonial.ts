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
      description: 'e.g., "Maple Valley, WA"',
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
