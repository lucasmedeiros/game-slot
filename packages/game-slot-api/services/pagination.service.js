const MAX_PAGE_SIZE = 50
const DEFAULT_PAGE_SIZE = 10

module.exports = {
  paginate: function ({ data, page, limit }) {
    page = parseInt(page)
    limit = parseInt(limit)
    limit = limit > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : limit < 0 ? DEFAULT_PAGE_SIZE : limit

    const offset = (page - 1) * limit

    const pagination = data.slice(offset).slice(0, limit)

    const totalPages = Math.ceil(data.length / limit)

    return {
      docs: pagination,
      page,
      limit,
      prevPage: page - 1 ? page - 1 : 1,
      nextPage: totalPages > page ? page + 1 : null,
      totalDocs: data.length,
      totalPages,
    }
  },
}
