import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Global Settings",
      name: "global_settings",
      path: "content/global-settings",
      ui: {
        global: true,
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          label: "Website's name",
          name: "name",
          type: "string",
          required: true,
          isTitle: true,
        },
        {
          label: "Logo",
          name: "logo",
          type: "image",
        },
        {
          type:"object",
          name: "menu",
          label: "Menu",
          list: true,
          fields: [
            {
              type:"string",
              label:"Menu item (ES)",
              name: "menu_item",
            },
            {
              type:"string",
              label:"Menu item (EN)",
              name: "menu_item_en",
            },
            {
              type:"string",
              label:"slug",
              name: "slug",
            },
            {
              type: "object",
              label: "Items",
              name: "children",
              list:true,
              fields:[
                {
                  type:"string",
                  label:"Menu item (ES)",
                  name: "menu_item",
                },
                {
                  type:"string",
                  label:"Menu item (EN)",
                  name: "menu_item_en",
                },
                {
                  type:"string",
                  label:"slug",
                  name: "slug",
                }
              ]
            }
          ]
        }
      ],
    },
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
          isTitle: true,
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/posts/${document._sys.filename}`;
        },
      },
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
