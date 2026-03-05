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
      description: 'e.g., "Heber City, UT"',
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
