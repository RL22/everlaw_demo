const axios = require('axios');
const tmKey = process.env.tmKey || '1l25fWxJ6z8TB1JOAxtfprxgO9ZP7B2F';
const eventType = 'KnvZfZ7vAe1';

const reqURL = 'https://app.ticketmaster.com/discovery/v2/events.json' + '?' + 'apikey=${tmKey}' + 'classificationId=${eventType}'

const fetchEvents = async () => {
    const requestOptions = {
      url: reqURL,
      method: `get`,
    };
  
  
    return 
  };
  
  const createNodesForEvents = async (
    actions,
    createNodeId,
    store,
    cache,
    category,
    items,
  ) => {
    const { createNode } = actions;
  
    const childNodes = items.map(async nodeFields => {
      let fileNode;
      // Fetch image and store locally for access via the node
      try {
        fileNode = await createRemoteFileNode({
          url: nodeFields.image.url,
          store,
          cache,
          createNode,
          createNodeId,
        });
      } catch (e) {
        console.error(e);
      }
  
      fileNode.name = nodeFields.videoId;
  
      const finalizedNodeFields = {
        ...nodeFields,
        // Required fields.
        // id: `a-node-id`,
        parent: null, // or null if it's a source node without a parent
        children: [],
        internal: {
          type: category,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(nodeFields))
            .digest(`hex`),
          mediaType: `text/youtube-json`, // optional
          content: JSON.stringify(nodeFields), // optional
          description: `Youtube Imported Data for ${category}`, // optional
        },
      };
  
      if (fileNode) {
        finalizedNodeFields.localFile___NODE = fileNode.id;
      }
  
      const node = createNode(finalizedNodeFields);
  
      return node;
    });
  
    const realizedNodes = await Promise.all(childNodes);
};

exports.fetchWebinarNodes = async ({ actions, createNodeId, store, cache }) => {
    const webinarVideos = await fetchEvents();
  
    await createNodesForWebinars(
      actions,
      createNodeId,
      store,
      cache,
      `WebinarsItem`,
      webinarVideos,
    );
  };