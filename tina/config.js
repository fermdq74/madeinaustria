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
      label: "Homepage hero",
      name: "homepage_hero",
      path: "content/hero",
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          type: "image",
          label: "Homepage hero gallery",
          name: "homepage_hero_gallery",
          list: true,
        },
        {
          type: "image",
          label: "Hero logo",
          name: "homepage_hero_logo",
        },
      ],
    },
    /*{
      label: "Page Content",
      name: "page",
      path: "content/page",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
          isTitle: true,
        },
        {
          type: "image",
          label: "Image",
          name: "image",
        },
        {
          type: "rich-text",
          label: "Main Content",
          name: "body",
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
    },*/
    {
      label: "Works",
      name: "works",
      path: "content/work",
      fields: [
        {
          type: "string",
          label: "Title(Es)",
          name: "title_es",
        },
        {
          type: "string",
          label: "Title(En)",
          name: "title_eng",
        },
        {
          type: "string",
          label: "Agency",
          name: "agency",
        },
        {
          type: "string",
          label: "Brand",
          name: "brand",
        },
        {
          type: "string",
          label: "Video URL",
          name: "video_url",
        },
        /*{
          type: "image",
          label: "Video thumbnail",
          name: "video_thumbnail",
        },*/
        {
          type: "image",
          label: "Featured image",
          name: "featured_image",
        },
        {
          type: "string",
          label: "Permalink",
          name: "permalink",
        },
        {
          type: "reference",
          label: "Work director",
          name: "work_director",
          collections: ['directors'],
        },
        /*{
          type: "boolean",
          label: "Hidde reel",
          name: "hidde_reel",
        },*/
        {
          type: "boolean",
          label: "Featured work",
          name: "featured_work",
        },
        {
          type: "rich-text",
          label: "Info work",
          name: "info_work",
        },
        {
          type: "rich-text",
          label: "Info work(Eng)",
          name: "info_work_eng",
        },
      ],
    },
    {
      label: "Directors",
      name: "directors",
      path: "content/director",
      fields: [
        {
          type: "string",
          name: "director_name",
          label: "Director name",
        },
        {
          type: "rich-text",
          name: "director_description",
          label: "Director description",
        },
        {
          type: "rich-text",
          name: "director_description_eng",
          label: "Director description(Eng)",
        },
        {
          type: "number",
          name: "director_order",
          label: "Director order",
        },
        {
          type: "string",
          name: "director_slug",
          label: "Director slug",
        }
      ],
    },
    {
      label: "Photographs",
      name: "photographs",
      path: "content/photography",
      fields: [
        {
          type: "string",
          name: "client",
          label: "Client",
        },
        {
          type: "reference",
          label: "Photographer",
          name: "photographer",
          collections: ['photographers'],
        },
        {
          type: "string",
          label: "Agency",
          name: "p_agency",
        },
        {
          type: "string",
          label: "Campaign",
          name: "campaign",
        },
        {
          type: "number",
          label: "Year",
          name: "year",
        },
        {
          type: "image",
          label: "Image gallery",
          name: "image_gallery",
          list: true,
        },
      ],
    },
    {
      label: "Photographers",
      name: "photographers",
      path: "content/photographer",
      fields: [
        {
          type: "string",
          name: "photographer_name",
          label: "Photographer name",
        },
        {
          type: "rich-text",
          name: "photographer_description",
          label: "Photographer description",
        },
        {
          type: "rich-text",
          name: "photographer_description_eng",
          label: "Photographer description(Eng)",
        },
        {
          type: "number",
          name: "photographer_order",
          label: "Photographer order",
        },
        {
          type: "string",
          name: "photographer_slug",
          label: "Photographer slug",
        }
      ],
    },
    {
      label: "Contact",
      name: "contact",
      path: "content/contact",
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          type: "string",
          name: "country_es",
          label: "Country(Es)",
        },
        {
          type: "string",
          name: "country_en",
          label: "Country(Eng)",
        },
        {
          type: "rich-text",
          name: "contact_info",
          label: "Info(Es)",
        },
        {
          type: "rich-text",
          name: "contact_info_eng",
          label: "Info(Eng)",
        }
      ],
    },
    {
      label: "About",
      name: "about",
      path: "content/about",
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          type: "rich-text",
          name: "description_es",
          label: "Description(Es)",
        },
        {
          type: "rich-text",
          name: "description_en",
          label: "Description(En)",
        },
        {
          type: "image",
          label: "About logo",
          name: "about_logo",
        }
      ],
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
