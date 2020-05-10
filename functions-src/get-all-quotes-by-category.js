const sendQuery = require("./utils/sendQuery")

const GET_ALL_QUOTES_BY_CATEGORY = `
query ($category: String!) {
  quoteByCategory(category: $category) {
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

exports.handler = async event => {
  const { category } = JSON.parse(event.body)
  const { data, errors } = await sendQuery(GET_ALL_QUOTES_BY_CATEGORY, {
    category
  })
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ quotes: data.quoteByCategory }),
  }
}
