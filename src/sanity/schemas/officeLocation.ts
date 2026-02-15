import { defineField, defineType } from "sanity";

export default defineType({
  name: "officeLocation",
  title: "Office Location",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "locationType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Global Headquarters", value: "Global Headquarters" },
          { title: "Regional Office", value: "Regional Office" },
          { title: "European Headquarters", value: "European Headquarters" },
          { title: "EU Office", value: "EU Office" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "city", subtitle: "locationType" },
  },
});
