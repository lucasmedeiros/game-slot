const MAX_PAGE_SIZE = 50
const DEFAULT_PAGE_SIZE = 10

module.exports = {
  paginate: function ({ data, page, pageSize }) {
    page = parseInt(page)
    pageSize = parseInt(pageSize)
    pageSize =
      pageSize > MAX_PAGE_SIZE
        ? MAX_PAGE_SIZE
        : pageSize < 0
        ? DEFAULT_PAGE_SIZE
        : pageSize

    const offset = (page - 1) * pageSize

    const pagination = data.slice(offset).slice(0, pageSize)

    const totalPages = Math.ceil(data.length / pageSize)

    return {
      data: pagination,
      page,
      pageSize,
      prevPage: page - 1 ? page - 1 : null,
      nextPage: totalPages > page ? page + 1 : null,
      total: data.length,
      totalPages,
    }
  },
}
