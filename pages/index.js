import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/Layout/Layout";
import Hero from "../components/Sections/Hero/Hero";
import FeaturedWorks from "../components/Sections/FeaturedWorks/FeaturedWorks";
import ContactForm from "../components/Sections/ContactForm/ContactForm";
import NavContextProvider from "../context/NavContextProvider";

export default function Home(props) {

  return (
      <NavContextProvider>
        <Layout 
          title={props.gs_data.name} 
          logo={props.gs_data.logo} 
          menu={props.gs_data.menu} 
          contact={props.contacts_data} 
          about_data={props.about_data}
        >
          <Hero 
            logo={props.hh_data.homepage_hero_logo} 
            hero_image={props.hh_data.homepage_hero_gallery} 
          />
          <FeaturedWorks 
            key={props.works_data.id} 
            works={featuredWorks(props.works_data)} 
          />
        </Layout>
      </NavContextProvider>
  );
}

export const getStaticProps = async () => {

  const gs = await client.queries.global_settings({
    relativePath: "global-settings.md",
  });

  const gs_data = gs.data.global_settings;

  const works = await client.queries.worksConnection();

  const works_data = getWorkDataArray(works);

  const hh = await client.queries.homepage_hero({
    relativePath: "homepage_hero.md",
  });

  const hh_data = hh.data.homepage_hero;

  const about = await client.queries.about({
    relativePath: "about.md",
  });

  const about_data = about.data.about;

  const contacts = await client.queries.contactConnection();

  const contacts_data = getContactDataArray(contacts);

  return {
    props: {
      works_data,
      gs_data,
      hh_data,
      about_data,
      contacts_data
    },
  };
};

const getWorkDataArray = (works) => {
  
  const worksData = works.data.worksConnection.edges.map((work) => {
    return { 
      title_eng: work.node.title_eng,
      title_es: work.node.title_es,
      agency: work.node.agency,
      brand: work.node.brand,
      featured_image: work.node.featured_image,
      featured_work: work.node.featured_work,
      hidde_reel: work.node.hidde_reel,
      pemalink: work.node.permalink,
      video_thumbnail: work.node.video_thumbnail,
      video_url: work.node.video_url,
      work_director: work.node.work_director,
      id: work.node.id,
      info: work.node.info_work.children,
      info_en: work.node.info_work_eng.children,
    }
  });

  return worksData;
};

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

const featuredWorks = (works) => {
  
  const fw = [];
  works.map((work) => {
    if(work.featured_work == true) {
      fw.push(work);
    }
  });

  return fw;
};