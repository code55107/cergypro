import { defineField, defineType } from "sanity";

export default defineType({
  name: "jobListing",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      initialValue: "Full-time",
    }),
    defineField({
      name: "jobId",
      title: "Job ID",
      type: "string",
    }),
    defineField({
      name: "postedDate",
      title: "Posted Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "department" },
  },
});
