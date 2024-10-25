import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify"
import "react-toastify/ReactToastify.min.css"
import { useAddSubjectMutation, useDeleteSubjectMutation, useFetchSubjectQuery, useUpdateSubjectMutation } from '../redux/adminApi'

const Subject = () => {

    const [selectedSubject, setSelectedSubject] = useState()

    const { data: subjectData } = useFetchSubjectQuery()
    const [addSubject, { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess, error: addError }] = useAddSubjectMutation()
    const [updateSubject, { isLoading: updateIsLoading, isError: updateIsError, isSuccess: updateIsSuccess, error: updateError }] = useUpdateSubjectMutation()
    const [deleteSubject, { isLoading: deleteIsLoading, isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError }] = useDeleteSubjectMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedSubject ? selectedSubject.name : "",
            total: selectedSubject ? selectedSubject.total : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("name is required"),
            total: yup.string().required("total is required"),

        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedSubject) {
                updateSubject({ ...selectedSubject, ...values })
                setSelectedSubject(null)
            } else {
                addSubject(values)
            }
            resetForm()
        }
    })
    const handleClasses = useCallback(key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    }), [])

    useEffect(() => { if (addIsSuccess) { toast.success("Subject add Success") } }, [addIsSuccess])
    useEffect(() => { if (addIsError) { toast.success("Subject add Error") } }, [addIsError])

    useEffect(() => { if (updateIsSuccess) { toast.success("Subject update Success") } }, [updateIsSuccess])
    useEffect(() => { if (updateIsError) { toast.success("Subject update error") } }, [updateIsError])

    useEffect(() => { if (deleteIsSuccess) { toast.success("Subject delete Success") } }, [deleteIsSuccess])
    useEffect(() => { if (deleteIsError) { toast.success("Subject delete Error") } }, [deleteIsError])

    return <>
        <div className="container">
            <div className="d-flex justify-content-end" >
                <button data-bs-toggle="modal" className='btn btn-primary' data-bs-target="#addSbjectModal" >Add New Subject</button>
            </div>
            <hr />
            <table className="table table-striped table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Total Marks</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjectData && subjectData.result.map((item, i) => <tr>
                            <td>{item.name}</td>
                            <td>{item.total}</td>
                            <td><button onClick={e => deleteSubject(item)} data-bs-toggle="modal" className='btn' ><i className='bi bi-trash text-danger'></i></button>
                                <button onClick={e => setSelectedSubject(item)} data-bs-toggle="modal" className='btn' data-bs-target="#addSbjectModal"><i className='bi bi-pencil text-warning'></i></button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>



        <div className="modal fade" id="addSbjectModal" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body ">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-floating'>
                                <input type="text" placeholder='Enter Subject Name' {...formik.getFieldProps("name")} className={handleClasses("name")} />
                                <span className='invalid-feedback'>{formik.errors.name}</span>
                                <label htmlFor="first_name">Enter Subject Name</label>
                            </div>
                            <div className='form-floating'>
                                <input type="number" placeholder='Enter Total Marks' {...formik.getFieldProps("total")} className={handleClasses("total")} />
                                <span className='invalid-feedback'>{formik.errors.total}</span>
                                <label htmlFor="total">Enter Total Marks</label>
                            </div>

                            <div classNameName='d-flex justify-content-center gap-3'>
                                {
                                    selectedSubject
                                        ? <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">Update</button>
                                        : <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Student</button>
                                }
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>



    </>

}

export default Subject