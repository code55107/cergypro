import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      initialValue: "CergyPro",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Tag", type: "string" }),
            defineField({ name: "title", title: "Title", type: "text", rows: 3 }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({ name: "cta", title: "CTA Text", type: "string" }),
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "tag", subtitle: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Company Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "bannerTitle",
      title: "Highlight Banner Title",
      type: "string",
    }),
    defineField({
      name: "bannerColor",
      title: "Banner Background Color",
      type: "string",
      description: "Tailwind class e.g. bg-emerald-400",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
