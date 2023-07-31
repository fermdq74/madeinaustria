export default async function handler(req, res) {
    const vid = req.query.id;
    let urls = [];
    
    const data = await fetch(`http://player.vimeo.com/video/${vid}/config`);    
            const json = await data.json();
            urls = json.request;
            console.log("ID: ", vid);
            console.log("URL: ", urls);
            res.status(200).json(urls);
  }