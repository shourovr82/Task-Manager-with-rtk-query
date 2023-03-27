import { apiSlice } from "./apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => ({
                url: '/tasks',

            }),

        }),
        getSingleTask: builder.query({
            query: (id) => `/tasks/${id}`,
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getTask", undefined, (draft) => [
                            ...draft,
                            data,
                        ])
                    );
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        editTask: builder.mutation({
            query: ({ id, task }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: task
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: task } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getSingleTask", arg.id, (draft) => {
                            return task;
                        })
                    );
                    // also update getTasks cashe when task update
                    dispatch(
                        apiSlice.util.updateQueryData("getTask", undefined, (draft) => {
                            return draft.map((item) => (item.id === task.id ? task : item));
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData("getTask", undefined, (draft) => {
                        return draft.filter((t) => t.id != arg);
                    })
                );
                // optimistic cache update end
                try {
                    await queryFulfilled;
                } catch (err) {
                    pathResult.undo();
                }
            },
        })

    })
})

export const { useGetTaskQuery, useGetSingleTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = taskApi;