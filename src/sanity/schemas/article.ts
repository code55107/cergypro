import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Uppercase label e.g. ARTIFICIAL INTELLIGENCE, WEBINAR, CLIENT STORY",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI & Technology", value: "AI & Technology" },
          { title: "Climate", value: "Climate" },
          { title: "Health", value: "Health" },
          { title: "Energy", value: "Energy" },
          { title: "Policy", value: "Policy" },
        ],
      },
    }),
    defineField({
      name: "articleType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Webinar", value: "webinar" },
          { title: "Event", value: "event" },
          { title: "Client Story", value: "client-story" },
        ],
      },
      initialValue: "article",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "image" },
  },
});
