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
    link:
      page < totalPages
        ? `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers?page=${
            Number(page) + 1
          }`
        : null,
  };
};

module.exports = applyPagination;
