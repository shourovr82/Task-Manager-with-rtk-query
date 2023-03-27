import { apiSlice } from "./apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects',
        })
    })
})

export const { useGetProjectsQuery } = projectApi;