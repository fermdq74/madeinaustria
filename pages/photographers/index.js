import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import PhotographerSection from "../../components/Sections/PhotographerSection/PhotographerSection";
import { client } from "../../tina/__generated__/client";

export default function Directors(props) {



    return (
        <NavContextProvider>
            <Layout title={props.gs_data.name} logo={props.gs_data.logo} menu={props.gs_data.menu} contact={props.contacts_data}>
                {
                    
                    props.photographers_data
                    .sort((a, b) => a.photographer_order - b.photographer_order)
                    .map((photographer) => (
                        photographerPhotographs(photographer.id, props.photographs_data).length > 0 ?
                            <PhotographerSection photographer={photographer} photographs={photographerPhotographs(photographer.id, props.photographs_data)}></PhotographerSection>
                        :
                            null
                    ))
                }
            </Layout>
        </NavContextProvider>
    );
}

export const getStaticProps = async () => {
    
    const photographs = await client.queries.photographsConnection();
  
    const photographs_data = getPhotoDataArray(photographs);
  
    const gs = await client.queries.global_settings({
      relativePath: "global-settings.md",
    });
  
    const gs_data = gs.data.global_settings;
  
    const photographers = await client.queries.photographersConnection();
  
    const photographers_data = getPhotographerDataArray(photographers);
  
    const contacts = await client.queries.contactConnection();
  
    const contacts_data = getContactDataArray(contacts);
  
    return {
      props: {
        photographs_data,
        gs_data,
        photographers_data,
        contacts_data
      },
    };
  };
  
  const getPhotoDataArray = (photographs) => {
    const photographsData = photographs.data.photographsConnection.edges.map((photo) => {
      return { 
        client: photo.node.client,
        photographer: photo.node.photographer,
        agency: photo.node.p_agency,
        campaign: photo.node.campaign,
        year: photo.node.year,
        image_gallery: photo.node.image_gallery,
        id: photo.node.id,
      }
    });
  
    return photographsData;
  };
  
  const getPhotographerDataArray = (photographers) => {
    const photographersData = photographers.data.photographersConnection.edges.map((photographer) => {
      return {
        id: photographer.node.id,
        name: photographer.node.photographer_name,
        description: photographer.node.photographer_description,
        order: photographer.node.photographer_order,
      }
    });
    return photographersData;
  };
  
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
  
  const photographerPhotographs = (id, photographs) => {
    
    const pp = [];
    photographs.map((photo) => {
      if(photo.photographer.id == id) {
        pp.push(photo);
      }
    });
  
    return pp;
  };