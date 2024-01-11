import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import DirectorGrid from "../../components/Sections/DirectorGrid/DirectorGrid";
import { client } from "../../tina/__generated__/client";

export default function DirectorsSlug(props) {

    return (
      <NavContextProvider>
        <Layout 
          title={props.gs_data.name} 
          logo={props.gs_data.logo} 
          menu={props.gs_data.menu} 
          contact={props.contacts_data} 
          about_data={props.about_data}
        >
          <DirectorGrid 
            director={props.director} 
            works={props.works}>  
          </DirectorGrid>
        </Layout>
      </NavContextProvider>
    );
}

export const getStaticPaths = async () => {

  const directors = await client.queries.directorsConnection();

  const paths = directors.data.directorsConnection.edges.map((director) => (
    {
      params: {slug: director.node.director_slug},
    }
  ));

  return {
      paths,
      fallback: 'blocking'
  }
}

export const getStaticProps = async ({params}) => {

  const director = await fetchDirectorBySlug(params.slug);

  if (!director) {
    return {
      notFound: true,
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

  const works = await fetchWorksByDirector(director);

  return {
    props: {
      director,
      gs_data,
      about_data,
      contacts_data,
      works
    },
  };
  
};

export async function fetchDirectorBySlug(slug) {
  try {
    const response = await client.queries.directors({
      relativePath: `${slug}.md`,
    });

    const director = response.data.directors;

    if (!director) {
      return null;
    }

    return director;
  } catch (error) {
    console.error('Error fetching director:', error);
    return null;
  }
}

export async function fetchWorksByDirector(director) {
  try {
    const response = await client.queries.worksConnection();

    const works = response.data.worksConnection.edges.map((edge) => {
      const work = edge.node;
      const directorSlug = director.director_slug;

      if (work.work_director && work.work_director.director_slug && work.work_director.director_slug.includes(directorSlug)) {
        return work;
      } else {
        return null;
      }
    }).filter(Boolean);

    return works;
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
      contact_info: contact.node.contact_info.children,
      contact_info_en: contact.node.contact_info_eng.children
    }
  });

  return contactsData;
};