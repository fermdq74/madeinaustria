import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import PhotographerGrid from "../../components/Sections/PhotographerGrid/PhotographerGrid";
import { client } from "../../tina/__generated__/client";

export default function PhotographersSlug(props) {

    return (
      <NavContextProvider>
        <Layout 
          title={props.gs_data.name} 
          logo={props.gs_data.logo} 
          menu={props.gs_data.menu} 
          contact={props.contacts_data} 
          about_data={props.about_data}  
        >
          <PhotographerGrid photographer={props.photographer} photographs={props.photographs} />
        </Layout>
      </NavContextProvider>
    );
}

export const getStaticPaths = async () => {

    const photographers = await client.queries.photographersConnection();

    const paths = photographers.data.photographersConnection.edges.map((photographer) => (
        {
            params: {slug: photographer.node.photographer_slug},
        }
    ));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {

    const photographer = await fetchPhotographerBySlug(params.slug);

    if (!photographer) {
        return {
        notFound: true, // Redirige a la página 404
        };
    }

    const gs = await client.queries.global_settings({
        relativePath: "global-settings.md",
    });

    const gs_data = gs.data.global_settings;

    const about = await client.queries.about({
      relativePath: "about.md",
    });

    const about_data = about.data.about;

    const contacts = await client.queries.contactConnection();

    const contacts_data = getContactDataArray(contacts);

    const photographs = await fetchPhotographsByPhotographer(photographer);

    return {
        props: {
        photographer,
        gs_data,
        about_data,
        contacts_data,
        photographs
        },
    };

};

export async function fetchPhotographerBySlug(slug) {
    try {
      const response = await client.queries.photographers({
        relativePath: `${slug}.md`,
      });
  
      const photographer = response.data.photographers;
  
      if (!photographer) {
        return null;
      }
  
      return photographer;
    } catch (error) {
      console.error('Error fetching director:', error);
      return null;
    }
}

export async function fetchPhotographsByPhotographer(photographer) {
    try {

        const response = await client.queries.photographsConnection();

        const photographs = response.data.photographsConnection.edges.map((edge) => {
        const photo = edge.node;
        const photographerSlug = photographer.photographer_slug;
  
        if (photo.photographer && photo.photographer.photographer_slug && photo.photographer.photographer_slug.includes(photographerSlug)) {
            return photo;
        } else {
            return null;
        }
      }).filter(Boolean);

      return photographs;
    } catch (error) {
      console.error('Error fetching works:', error);
      return null;
    }
}

const getContactDataArray = (contacts) => {
    const contactsData = contacts.data.contactConnection.edges.map((contact) => {
      return { 
        id: contact.node.id,
        country_es: contact.node.country_es,
        country_en: contact.node.country_en,
        contact_info: contact.node.contact_info.children
      }
    });
  
    return contactsData;
};