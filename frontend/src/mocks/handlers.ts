import { rest } from 'msw'
import results from './data/results.json'
import details from './data/details.json'
export const handlers = [
  rest.get('http://localhost:8080/search', (req, res, ctx) => {

    if (req.url.searchParams.get('nasa_id')) {
      return res(
        ctx.status(200),
        ctx.json(details),
      )
    }

    const postsPerPage = req.url.searchParams.get('page_size') ? +req.url.searchParams.get('page_size') : 25
    const resultsToReturn = {
      ...results,
      collection: {
        ...results.collection,
        items: results.collection.items.slice(0, postsPerPage),
      }
    }
    return res(
      ctx.status(200),
      ctx.json(resultsToReturn),
    )
  }),
]