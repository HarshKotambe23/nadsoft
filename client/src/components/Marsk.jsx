import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify"
import "react-toastify/ReactToastify.min.css"
import { useAddMarkMutation, useDeleteMarkMutation, useFetchMarksQuery, useFetchStudentQuery, useFetchSubjectQuery, useLazyFetchMarksQuery, useUpdateMarkMutation } from '../redux/adminApi'



const Marsk = () => {

    const [selectedMark, setSelectedMark] = useState()

    const { data: studentData } = useFetchStudentQuery()
    const { data: subjectData } = useFetchSubjectQuery()


    const [fetchMarks, { data: markData }] = useLazyFetchMarksQuery()
    const [addMark, { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess, error: addError }] = useAddMarkMutation()
    const [updateMark, { isLoading: updateIsLoading, isError: updateIsError, isSuccess: updateIsSuccess, error: updateError }] = useUpdateMarkMutation()
    const [deleteMark, { isLoading: deleteIsLoading, isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError }] = useDeleteMarkMutation()


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: "",
            subject: "",
            score: "",
        },
        validationSchema: yup.object({
            student: yup.string().required("Student is required"),
            subject: yup.string().required("subject is required"),
            score: yup.string().min(0).max(100).required("Score is required"),

        }),
        onSubmit: (values, { resetForm }) => {
            addMark(values)
            resetForm()
        }
    })


    useEffect(() => { if (addIsSuccess) { toast.success("Subject add Success") } }, [addIsSuccess])
    useEffect(() => { if (addIsError) { toast.success("Subject add Error") } }, [addIsError])

    useEffect(() => { if (updateIsSuccess) { toast.success("Subject update Success") } }, [updateIsSuccess])
    useEffect(() => { if (updateIsError) { toast.success("Subject update error") } }, [updateIsError])

    useEffect(() => { if (deleteIsSuccess) { toast.success("Subject delete Success") } }, [deleteIsSuccess])
    useEffect(() => { if (deleteIsError) { toast.success("Subject delete Error") } }, [deleteIsError])

    return <>
        <div className="container">
            <button data-bs-toggle="modal" className='btn' data-bs-target="#addSbjectModal" >Add Marks</button>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <div className='d-flex gap-2'>
                    <select {...formik.getFieldProps("subject")} className='form-control w-25' >
                        <option value="">Choose Subject</option>
                        {
                            subjectData && subjectData.result.map(item => <option value={item._id}>{item.name}</option>)
                        }
                    </select>
                    <select {...formik.getFieldProps("student")} className='form-control w-25' >
                        <option value="">Choose Student</option>
                        {
                            studentData && studentData.result.map(item => <option value={item._id}>{item.first_name} {item.last_name}</option>)
                        }
                    </select>
                    <input type="number" {...formik.getFieldProps("score")} placeholder='Enter Marks' className='form-control w-25' />
                    <button type='submit' className='btn btn-success'>Add</button>
                </div>
            </form>



            <table className="table table-bordered table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">See Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentData && studentData.result.map((item, i) => <tr>
                            <td>{item.first_name} {item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={e => fetchMarks(item._id)} data-bs-toggle="modal" className='btn' data-bs-target="#mark">
                                    <i className='bi bi-pencil text-warning'></i>
                                </button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>

        <div className="modal fade" id="mark" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">marks</div>
                    <div className="modal-body ">
                        <ul className="list-group">
                            <li className='list-group-item d-flex justify-content-between list-group-item-primary '>
                                <span>Subject</span>
                                <span>Marks</span>
                            </li>
                            {markData && markData.result.map(item => <li className='list-group-item d-flex justify-content-between'>
                                <span>{item.subject.name}</span>
                                <span>{item.score}</span>
                            </li>)}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Marsk