const applyPagination = (data, page, limit = 12) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / limit);

  return {
    data: paginatedData,
    currentPage: page,
    totalPages: totalPages,
    dataPerPage: limit,
    moreData: page < totalPages,
  };
};

module.exports = applyPagination;
