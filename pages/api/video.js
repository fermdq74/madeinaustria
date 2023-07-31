export default async function handler(req, res) {
    console.log("REQ ID: ", req.query);
    const { vid } = req.query
    let urls = [];
    const data = await fetch(`http://player.vimeo.com/video/536511800/config`);

            const json = await data.json();
            urls = json.request.files.progressive;
            res.status(200).json(urls);
  }