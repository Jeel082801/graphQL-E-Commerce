import { GraphQLClient, gql } from 'graphql-request'

// Debugging
console.log('HYGRAPH_ENDPOINT:', process.env.HYGRAPH_ENDPOINT)
console.log(
  'HYGRAPH_QUERY_TOKEN:',
  process.env.HYGRAPH_QUERY_TOKEN ? 'exists' : 'missing'
)

// Fallback values for development
const HYGRAPH_ENDPOINT =
  process.env.HYGRAPH_ENDPOINT ||
  'https://api-eu-central-1.hygraph.com/v2/YOUR_PROJECT_ID/master'
const HYGRAPH_TOKEN = process.env.HYGRAPH_QUERY_TOKEN || 'your_default_token'

const hygraphClient = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`
  }
})

export { gql }
export default hygraphClient
