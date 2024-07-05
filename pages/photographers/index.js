import fs from 'fs';
import path from 'path';
import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import PhotographerSection from "../../components/Sections/PhotographerSection/PhotographerSection";
import { client } from "../../tina/__generated__/client";

export default function Photographers(props) {

    return (
        <NavContextProvider>
            <Layout 
              title={props.gs_data.name} 
              logo={props.gs_data.logo} 
              menu={props.gs_data.menu} 
              contact={props.contacts_data} 
              about_data={props.about_data}
            >
                {
                    
                    props.photographers_data
                    .sort((a, b) => a.order - b.order)
                    .map((photographer) => (
                        photographerPhotographs(photographer.id, props.photographs_data).length > 0 ?
                            <PhotographerSection 
                              key={photographer.id}
                              photographer={photographer} 
                              photographs={photographerPhotographs(photographer.id, props.photographs_data)} 
                            />
                        :
                            null
                    ))
                }
            </Layout>
        </NavContextProvider>
    );
}


export const getStaticProps = async () => {
    
  
    const gs = await client.queries.global_settings({
      relativePath: "global-settings.md",
    });
  
    const gs_data = gs.data.global_settings;

    //console.log('gs_data',gs_data.menu);

    const ordered_photographs = gs_data.menu.map((item) => {
      if (item.slug === "photographers") {
        const director_works = item.children.map((child) => {
            const work_items = child.children?.map((work) => {
                  return {
                    client: work.photographs.client,
                    photographer: work.photographs.photographer,
                    agency: work.photographs.p_agency,
                    campaign: work.photographs.campaign,
                    year: work.photographs.year,
                    image_gallery: work.photographs.image_gallery,
                    id: work.photographs.id,
                  };                
              })
              .filter(Boolean);
            return work_items;
          })
          .filter(Boolean);
        return director_works;
      }
    });

    console.log('ordered_photographs',ordered_photographs);

    //const photographs = await client.queries.photographsConnection();
    let photographs = {};

    try {
      photographs = await client.queries.photographsConnection();  
    }catch(error) {
      if (error.message.includes('Unable to find record')) {
        const missingRecords = error.message.match(/content\/photographer\/\S+\.md/g);

        if (missingRecords) {
          console.log('Cleaning orphan references...');
          await cleanOrphanReferences(missingRecords);
          photographs = await client.queries.photographsConnection();
        }

      }
    }
    
    // const photographs_data = getPhotoDataArray(photographs);  
    const photographs_data = getPhotoDataArray(ordered_photographs.filter(Boolean)[0]);  

    const about = await client.queries.about({
      relativePath: "about.md",
    });

    const about_data = about.data.about;
  
    const photographers = await client.queries.photographersConnection();
  
    const photographers_data = getPhotographerDataArray(photographers);
  
    const contacts = await client.queries.contactConnection();
  
    const contacts_data = getContactDataArray(contacts);
  
    return {
      props: {
        photographs_data,
        gs_data,
        about_data,
        photographers_data,
        contacts_data
      },
    };

  };

  async function cleanOrphanReferences(missingRecords) {

    const photographsPath = path.join(process.cwd(), 'content', 'photography');

    if (!fs.existsSync(photographsPath)) {
      console.error(`Directory ${photographsPath} does not exist`);
      return;
    }
  
    const photographs = fs.readdirSync(photographsPath).map(file => path.join(photographsPath, file));

    photographs.forEach(file => {
      let content = fs.readFileSync(file, 'utf-8');
      missingRecords.forEach(record => {
        const regex = new RegExp(`photographer:\\s*${record}`, 'g');
        if (content.match(regex)) {
          console.log(`Cleaning orphan reference in ${file}`);
          content = content.replace(regex, 'photographer: ');
          fs.writeFileSync(file, content);
        }
      });
    });
  }
  
  const getPhotoDataArray = (photographs) => {
    
    // const photographsData = photographs.data.photographsConnection.edges.map((photo) => {
    //   return { 
    //     client: photo.node.client,
    //     photographer: photo.node.photographer,
    //     agency: photo.node.p_agency,
    //     campaign: photo.node.campaign,
    //     year: photo.node.year,
    //     image_gallery: photo.node.image_gallery,
    //     id: photo.node.id,
    //   }
    // });
  
    // return photographsData;

    const photographerWorks = photographs.map((director) => {

      const worksData = director.map((work) => {
        return {
          client: work.client,
          photographer: work.photographer,
          agency: work.agency,
          campaign: work.campaign,
          year: work.year,
          image_gallery: work.image_gallery,
          id: work.id,
        };
      });
  
      return worksData;
    });
  
    return photographerWorks;

  };
  
  const getPhotographerDataArray = (photographers) => {
    const photographersData = photographers.data.photographersConnection.edges.map((photographer) => {
      return {
        id: photographer.node.id,
        name: photographer.node.photographer_name,
        description: photographer.node.photographer_description,
        order: photographer.node.photographer_order,
        photographer_slug: photographer.node.photographer_slug
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
        contact_info: contact.node.contact_info.children,
        contact_info_en: contact.node.contact_info_eng.children
      }
    });
  
    return contactsData;
  };
  
  const photographerPhotographs = (id, photographs) => {
    
    // const pp = [];
    // photographs.map((photo) => {
    //   if(photo.photographer != null) {
    //     if(photo.photographer.id == id) {
    //       pp.push(photo);
    //     }
    //   }
    // });

    const pp = [];
    photographs.map((photo) => {
      photo.map((work) => {
        if (work.photographer != null) {
          if (work.photographer.id == id) {
            pp.push(work);
          }
        }
      });
    });

    return pp;
  };