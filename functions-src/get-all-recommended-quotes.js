const sendQuery = require("./utils/sendQuery")

const GET_ALL_RECOMMENDED_QUOTES = `
query {
  quoteByRecommended(isRecommended: true) {
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
  const { data, errors } = await sendQuery(GET_ALL_RECOMMENDED_QUOTES, null)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ quotes: data.quoteByRecommended }),
  }
}
