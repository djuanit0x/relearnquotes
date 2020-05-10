const sendQuery = require("./utils/sendQuery")

const GET_ALL_FEATURED_QUOTES = `
query {
  quoteByFeatured(isFeatured: true) {
    data {
      _id
      type
      content
      author
      source
      category
      isFeatured
      isRecommended
    }
 }
}
`

exports.handler = async (event) => {
  const { data, errors } = await sendQuery(GET_ALL_FEATURED_QUOTES, null)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ quotes: data.quoteByFeatured }),
  }
}
