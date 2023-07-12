import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID!,
  branch:
    process.env.TINA_BRANCH! || // custom branch env override
    process.env.VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "content",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "object",
            label: "Gallery",
            name: "gallery",
            list: true,
            fields: [
              {
                type: "image",
                label: "Hero image",
                name: "imgSrc",
              },
            ],
          },

          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            label: "Date",
            name: "date",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "artwork",
        label: "Artwork",
        path: "content/artwork",
        defaultItem: () => {
          return {
            layout: "artwork",
            date: new Date().toISOString(),
          };
        },

        fields: [
          {
            name: "draft",
            label: "Draft",
            type: "boolean",
          },
          {
            name: "gallery",
            label: "Gallery",
            type: "boolean",
          },
          {
            name: "archive",
            label: "Archive",
            type: "boolean",
          },
          {
            name: "inHome",
            label: "In Home",
            type: "boolean",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },

          {
            name: "instock",
            label: "In stock",
            description: "Is this in stock",
            type: "boolean",
          },
          {
            label: "Weight",
            name: "weight",
            type: "number",
            required: true,
          },
          {
            label: "themes",
            name: "themes",
            type: "string",
            description: "Artwork subject",
            required: true,
            options: [
              {
                value: "animals",
                label: "animals",
              },
              {
                value: "nature",
                label: "nature",
              },
              {
                value: "others",
                label: "others",
              },
            ],
          },

          {
            type: "string",
            name: "materials",
            label: "Materials",
            required: true,
          },

          {
            type: "datetime",
            label: "Created On",
            name: "createdOn",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            label: "Images for gallery",
            name: "images",
            list: true,
            ui: {
              itemProps: (item) => {
                // Field values are accessed by item?.<Field name>
                return { label: item?.title + " - " + item?.type };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                // isTitle: true,
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "asset",
                label: "Asset",
                required: true,
              },
              {
                label: "Type",
                name: "type",
                type: "string",
                required: true,
                options: [
                  {
                    value: "main",
                    label: "main",
                  },
                  {
                    value: "sim",
                    label: "sim",
                  },
                ],
              },
            ],
          },
          {
            label: "Seo",
            name: "seo",
            type: "object",
            list: true,
            fields: [
              {
                label: "Link",
                name: "Link",
                type: "string",
              },
              {
                label: "Role",
                name: "role",
                type: "string",
              },
              {
                label: "Quote",
                name: "quote",
                type: "string",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "datetime",
            label: "Date",
            name: "date",
            ui: {
              component: "hidden",
            },
          },
          {
            label: "Layout",
            description: "should be artwork",
            name: "layout",
            type: "string",
            ui: {
              component: "hidden",
            },
          },
        ],
      },
    ],
  },
});
