import { useStaticQuery, graphql } from 'gatsby';

export default function tmEvents() {
    const data = useStaticQuery(graphql`
    query{
      allEvents {
      nodes {
        name
        url
        originalId
        info
        id
        images {
          url
        }
        dates {
          start {
            localDate
            localTime
          }
        }
      }
    }
    }
    `);

    const events = data.allEvents.nodes.map(node => {
      const { id, name, url, date, time, images, info} = node;
  
      return {
        id, 
        name, 
        url, 
        info, 
        date, 
        images,
  
      }
    });
  

  return {
    events
  }

}