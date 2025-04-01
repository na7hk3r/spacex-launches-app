import { type Doc, type APISpaceXResponse } from "../types/api";

export const getLaunchBy = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)

  const launch = (await res.json()) as Doc;

//  console.log(launch);
  return launch;
};

export const getLatestLaunches = async (page: number = 1, limit: number = 12, sortOrder: 'asc' | 'desc' = 'desc', filterNoImage: boolean = true) => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: filterNoImage ? {
        // Solo incluir lanzamientos que tengan al menos una imagen de parche
        "links.patch.small": { $ne: null }
      } : {},
      options: {
        sort: {
          date_unix: sortOrder,
        },
        limit,
        page,
      },
    }),
  });

  const data = (await res.json()) as APISpaceXResponse;
  return {
    docs: data.docs,
    totalPages: data.totalPages,
    page: data.page,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage
  };
};
