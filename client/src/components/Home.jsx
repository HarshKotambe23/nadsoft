import React, { useCallback, useEffect, useState } from 'react'
import { useAddStudentMutation, useDeleteStudentMutation, useLazyFetchStudentQuery, useUpdateStudentMutation } from '../redux/adminApi'
import { useFormik } from "formik"
import * as yup from "yup"
import clsx from "clsx"
import { format, parseISO } from "date-fns"
import { toast } from "react-toastify"
import "react-toastify/ReactToastify.min.css"

const Home = () => {
    const [pagi, setPagi] = useState({
        limit: 2,
        page: 0
    })

    const [selectedStudent, setSelectedStudent] = useState()

    const [getStudents, { data: studentData }] = useLazyFetchStudentQuery()

    const [addStudent, { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess, error: addError }] = useAddStudentMutation()
    const [updateStudent, { isLoading: updateIsLoading, isError: updateIsError, isSuccess: updateIsSuccess, error: updateError }] = useUpdateStudentMutation()
    const [deleteStudent, { isLoading: deleteIsLoading, isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError }] = useDeleteStudentMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: selectedStudent ? selectedStudent.first_name : "",
            last_name: selectedStudent ? selectedStudent.last_name : "",
            dob: selectedStudent ? selectedStudent.dob : "",
            email: selectedStudent ? selectedStudent.email : "",
        },
        validationSchema: yup.object({
            first_name: yup.string().required("First name is required"),
            last_name: yup.string().required("Last name is required"),
            dob: yup.string().required("DOB is required"),
            email: yup.string().email().required("Email is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedStudent) {
                updateStudent({ ...selectedStudent, ...values })
                setSelectedStudent(null)
            } else {
                addStudent(values)
            }
            resetForm()
        }
    })
    const handleClasses = useCallback(key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    }), [])

    useEffect(() => {
        getStudents(pagi)
    }, [pagi])

    useEffect(() => { if (addIsSuccess) { toast.success("Student add Success") } }, [addIsSuccess])
    useEffect(() => { if (addIsError) { toast.success("Student add Error") } }, [addIsError])

    useEffect(() => { if (updateIsSuccess) { toast.success("Student update Success") } }, [updateIsSuccess])
    useEffect(() => { if (updateIsError) { toast.success("Student update error") } }, [updateIsError])

    useEffect(() => { if (deleteIsSuccess) { toast.success("Student delete Success") } }, [deleteIsSuccess])
    useEffect(() => { if (deleteIsError) { toast.success("Student delete Error") } }, [deleteIsError])
    return <>
        <div className='container '>
            <div><h2>All Members</h2></div>
            <div className="d-flex justify-content-end" >
                <button data-bs-toggle="modal" className='btn btn-primary' data-bs-target="#addStudentModal" >Add New Student</button>
            </div>
            <hr />
            {
                studentData && <div className='form-floating my-2'>
                    <select onChange={e => setPagi({ page: 0, limit: e.target.value })} className='form-control w-25'>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                    <label htmlFor="choose">Choose Limit</label>
                </div>
            }
            <table className="table table-bordered table-striped ">
                <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentData && studentData.result.map((item, i) => <tr>
                            <td>{item.first_name} {item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{format(item.dob, "dd-MM-yyyy")}</td>
                            <td><button onClick={e => deleteStudent(item)} data-bs-toggle="modal" className='btn' data-bs-target="#deleteModal"><i className='bi bi-trash text-danger'></i></button>
                                <button onClick={e => setSelectedStudent({
                                    ...item,
                                    dob: format(item.dob, "yyy-MM-dd")
                                })} data-bs-toggle="modal" className='btn' data-bs-target="#addStudentModal"><i className='bi bi-pencil text-warning'></i></button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
            {
                studentData && [...Array(studentData.pagination.pages).keys()].map((item, i) => <button
                    onClick={e => setPagi({ ...pagi, page: i })}
                    className={`btn me-1 ${pagi.page === i ? "btn-primary" : "btn-outline-primary"}`} >{i + 1}</button>)
            }
        </div>


        {/* 
        <div className="modal fade" id="deleteModal" >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-body p-5 d-flex flex-column align-items-center">
                        <h3>Are You sure </h3>
                        <p>If you do this action it can not be reversed</p>
                        <div className='d-flex justify-content-center gap-3'>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Yes Delete it</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancle</button>
                        </div>
                    </div>

                </div>
            </div>
        </div> */}
        <div className="modal fade" id="addStudentModal" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body ">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-floating'>
                                <input type="text" placeholder='Enter First Name' {...formik.getFieldProps("first_name")} className={handleClasses("first_name")} />
                                <span className='invalid-feedback'>{formik.errors.first_name}</span>
                                <label htmlFor="first_name">Enter First Name</label>
                            </div>
                            <div className='form-floating'>
                                <input type="text" placeholder='Enter Last Name' {...formik.getFieldProps("last_name")} className={handleClasses("last_name")} />
                                <span className='invalid-feedback'>{formik.errors.last_name}</span>
                                <label htmlFor="last_name">Enter Last Name</label>
                            </div>
                            <div className='form-floating'>
                                <input type="text" placeholder='Enter Email' {...formik.getFieldProps("email")} className={handleClasses("email")} />
                                <span className='invalid-feedback'>{formik.errors.email}</span>
                                <label htmlFor="email">Enter Email</label>
                            </div>
                            <div className='form-floating'>
                                <input type="date" placeholder='Enter Date' {...formik.getFieldProps("dob")} className={handleClasses("dob")} />
                                <span className='invalid-feedback'>{formik.errors.dob}</span>
                                <label htmlFor="dob">Enter DOB</label>
                            </div>
                            <div classNameName='d-flex justify-content-center gap-3'>
                                {
                                    selectedStudent
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

export default Home