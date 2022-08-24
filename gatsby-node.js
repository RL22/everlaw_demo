require("dotenv").config({
    path: ".env"
})

const fetch = require("node-fetch")

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
    const { createNode } = actions

    const result = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=1l25fWxJ6z8TB1JOAxtfprxgO9ZP7B2F&classificationId=KnvZfZ7vAe1&dmaId=382", {
        headers: {
            "apikey": process.env.APIKEY
        },
    })
    const events = await result.json()
    // console.log(events._embedded.events)

    events._embedded.events.forEach(event => {
        createNode({
            ...event,
            id: createNodeId(event.id),
            originalId: event.id,
            internal: {
                type: "Events",
                contentDigest: createContentDigest(event)
            }
        })
    })
}
