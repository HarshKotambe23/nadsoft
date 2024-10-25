const admonController = require("../controller/admin.controller")

const router = require("express").Router()

router
    //ADD
    .post("/subject-create", admonController.addSubject)
    .post("/mark-create", admonController.addMark)
    .post("/student-create", admonController.addStudent)
    //GET
    .get("/subject-fetch", admonController.fetchSubjects)
    .get("/mark-fetch/:studentId", admonController.fetchMarks)
    .get("/student-fetch", admonController.fetchStudents)
    //UPDATE
    .put("/subject-update/:subjectId", admonController.updateSubject)
    .put("/mark-update/:markId", admonController.updateMark)
    .put("/student-update/:studentId", admonController.updateStudent)
    //UPDATE
    .delete("/subject-delete/:subjectId", admonController.deleteSubject)
    .delete("/mark-delete/:markId", admonController.deleteMark)
    .delete("/student-delete/:studentId", admonController.deleteStudent)

module.exports = router