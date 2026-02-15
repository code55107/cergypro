import { defineField, defineType } from "sanity";

export default defineType({
  name: "timelineEvent",
  title: "Timeline Event",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "year", subtitle: "event" },
  },
});
