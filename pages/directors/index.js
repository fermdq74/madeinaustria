import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import DirectorSection from "../../components/Sections/DirectorSection/DirectorSection";
import { client } from "../../tina/__generated__/client";

export default function Directors(props) {


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
                    
                    props.directors_data
                    .sort((a, b) => a.director_order - b.director_order)
                    .map((director, idx) => (
                        directorWorks(director.id, props.works_data).length > 0 ?
                              <DirectorSection 
                                key={director.id}
                                director={director} 
                                works={directorWorks(director.id, props.works_data)}
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
  
    let works = {};

    try {
    works = await client.queries.worksConnection();
    }catch(error) {
      if (error.message.includes('Unable to find record')) {
        const missingRecords = error.message.match(/content\/work_director\/\S+\.md/g);
        
        if (missingRecords) {
          console.log('Cleaning orphan references...');
          await cleanOrphanReferences(missingRecords);
          works = await client.queries.worksConnection();
        }

      }
    }
  
    const works_data = getWorkDataArray(works);
  
    const gs = await client.queries.global_settings({
      relativePath: "global-settings.md",
    });
  
    const gs_data = gs.data.global_settings;

    const about = await client.queries.about({
      relativePath: "about.md",
    });

    const about_data = about.data.about;
  
    const directors = await client.queries.directorsConnection();
  
    const directors_data = getDirectorDataArray(directors);
  
    const contacts = await client.queries.contactConnection();
  
    const contacts_data = getContactDataArray(contacts);
  
    return {
      props: {
        works_data,
        gs_data,
        about_data,
        directors_data,
        contacts_data
      },
    };
  };

  async function cleanOrphanReferences(missingRecords) {

    const worksPath = path.join(process.cwd(), 'content', 'work');

    if (!fs.existsSync(worksPath)) {
      console.error(`Directory ${worksPath} does not exist`);
      return;
    }
  
    const works = fs.readdirSync(worksPath).map(file => path.join(worksPath, file));

    works.forEach(file => {
      let content = fs.readFileSync(file, 'utf-8');
      missingRecords.forEach(record => {
        const regex = new RegExp(`work_director:\\s*${record}`, 'g');
        if (content.match(regex)) {
          console.log(`Cleaning orphan reference in ${file}`);
          content = content.replace(regex, 'work_director: ');
          fs.writeFileSync(file, content);
        }
      });
    });
  }
  
  const getWorkDataArray = (works) => {
    const worksData = works.data.worksConnection.edges.map((work) => {
      return { 
        title_en: work.node.title_eng,
        title_es: work.node.title_es,
        agency: work.node.agency,
        brand: work.node.brand,
        featured_image: work.node.featured_image,
        featured_work: work.node.featured_work,
        pemalink: work.node.permalink,
        video_url: work.node.video_url,
        work_director: work.node.work_director,
        hidde_reel: work.node.hidde_reel,
        id: work.node.id,
        info: work.node.info_work.children,
        info_en: work.node.info_work_eng.children,
      }
    });
  
    return worksData;
  };
  
  const getDirectorDataArray = (directors) => {
    const directorsData = directors.data.directorsConnection.edges.map((director) => {
      return { 
        id: director.node.id,
        director_name: director.node.director_name,
        director_description: director.node.director_description,
        director_order: director.node.director_order,
        director_slug: director.node.director_slug
      }
    });
    return directorsData;
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
  
  const directorWorks = (id, works) => {
    
    const dw = [];
    works.map((work) => {
      if(work.work_director != null) {

        if(work.work_director.id == id) {
          dw.push(work);
        }

      }
    });
  
    return dw;
  };