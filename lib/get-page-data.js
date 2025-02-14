import hygraphClient, { gql } from '@/lib/hygraph-client'
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getPageDataQuery = gql`
  query PageDataQuery($locale: Locale!) {
    footerCategories: categories(first: 4, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(first: 1, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
  }
  ${CategoryFragment}
  ${CollectionFragment}
`

async function getPageData({ locale }) {
  try {
    const {
      footerCategories,
      footerCollections,
      navigationCategory,
      navigationCollection
    } = await hygraphClient.request(getPageDataQuery, { locale })

    return {
      footer: { categories: footerCategories, collections: footerCollections },
      navigation: { pages: [...navigationCategory, ...navigationCollection] }
    }
  } catch (error) {
    console.error('Error fetching page data:', error)
    throw error
  }
}

export default getPageData
