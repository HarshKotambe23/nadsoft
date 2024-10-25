import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credenetials: "include" }),
    tagTypes: ["student", "mark", "subject"],
    endpoints: (builder) => {
        return {

            // ==================SUBJECT======================
            addSubject: builder.mutation({
                query: subjectData => {
                    return {
                        url: "/subject-create",
                        method: "POST",
                        body: subjectData
                    }
                },
                invalidatesTags: ["subject"]
            }),
            fetchSubject: builder.query({
                query: () => {
                    return {
                        url: "/subject-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["subject"]
            }),
            updateSubject: builder.mutation({
                query: subjectData => {
                    return {
                        url: `/subject-update/` + subjectData._id,
                        method: "PUT",
                        body: subjectData
                    }
                },
                invalidatesTags: ["subject"]
            }),
            deleteSubject: builder.mutation({
                query: subjectData => {
                    return {
                        url: `/subject-delete/${subjectData._id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["subject"]
            }),
            //==========================STUDENT=================

            addStudent: builder.mutation({
                query: studentData => {
                    return {
                        url: "/student-create",
                        method: "POST",
                        body: studentData
                    }
                },
                invalidatesTags: ["student"]
            }),
            fetchStudent: builder.query({
                query: (pagi) => {
                    return {
                        url: "/student-fetch",
                        method: "GET",
                        params: pagi
                    }
                },
                providesTags: ["student"]
            }),
            updateStudent: builder.mutation({
                query: studentData => {
                    return {
                        url: `/student-update/` + studentData._id,
                        method: "PUT",
                        body: studentData
                    }
                },
                invalidatesTags: ["student"]
            }),
            deleteStudent: builder.mutation({
                query: studentData => {
                    return {
                        url: `/student-delete/` + studentData._id,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["student"]
            }),
            //================MARK======================
            addMark: builder.mutation({
                query: markData => {
                    return {
                        url: "/mark-create",
                        method: "POST",
                        body: markData
                    }
                },
                invalidatesTags: ["mark"]
            }),
            fetchMarks: builder.query({
                query: (id) => {
                    return {
                        url: "/mark-fetch/" + id,
                        method: "GET"
                    }
                },
                providesTags: ["mark"]
            }),
            updateMark: builder.mutation({
                query: markData => {
                    return {
                        url: `/mark-update/${markData._id}`,
                        method: "PUT"
                    }
                },
                invalidatesTags: ["mark"]
            }),
            deleteMark: builder.mutation({
                query: markData => {
                    return {
                        url: `/mark-update/${markData}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["mark"]
            }),



        }
    }
})

export const {
    useAddSubjectMutation,
    useFetchSubjectQuery,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,

    useAddStudentMutation,
    useDeleteStudentMutation,
    useFetchStudentQuery,
    useLazyFetchStudentQuery,
    useUpdateStudentMutation,

    useAddMarkMutation,
    useDeleteMarkMutation,
    useUpdateMarkMutation,
    useFetchMarksQuery,
    useLazyFetchMarksQuery

} = adminApi