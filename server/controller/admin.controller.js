const asyncHandler = require("express-async-handler")
const Subject = require("../model/Subject")
const validator = require("validator")
const Student = require("../model/Student")
const Mark = require("../model/Mark")
const { checkEmpty } = require("../utils/checkEmpty")

// SUBJECT
exports.addSubject = asyncHandler(async (req, res) => {
    const { name, total } = req.body
    const { error, isError } = checkEmpty({ name, total })
    if (isError) {
        res.status(400).json({ message: "All Fields Required", error })
    }
    await Subject.create({ name, total })
    res.json({ message: "Subject Create Success" })
})
exports.updateSubject = asyncHandler(async (req, res) => {
    const { subjectId } = req.params
    if (!validator.isMongoId(subjectId)) {
        return res.status(400).json({ error: "invalid SubjectId" })
    }
    await Subject.findByIdAndUpdate(subjectId, req.body)
    res.json({ message: "Subject Update Success" })
})
exports.deleteSubject = asyncHandler(async (req, res) => {
    const { subjectId } = req.params
    if (!validator.isMongoId(subjectId)) {
        returnres.status(400).json({ error: "invalid SubjectId" })
    }
    await Subject.findByIdAndDelete(subjectId)
    res.json({ message: "Subject delete Success" })
})
exports.fetchSubjects = asyncHandler(async (req, res) => {
    const result = await Subject.find()
    res.json({ message: "subject fetch successfully", result })
})

//STUDENTS

exports.addStudent = asyncHandler(async (req, res) => {
    const { first_name, last_name, dob, email } = req.body
    const { error, isError } = checkEmpty({ first_name, last_name, dob, email })
    if (isError) {
        res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isDate(dob)) {
        return res.status(400).json({ error: "invalid Date" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "invalid email" })
    }
    const isExist = await Student.exists({ email })
    if (isExist) {
        return res.status(409).json({ error: "Email already exist" })
    }
    await Student.create({ first_name, last_name, dob, email })
    res.json({ message: "student Create Success" })
})
exports.updateStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params
    if (!validator.isMongoId(studentId)) {
        returnres.status(400).json({ error: "invalid studentId" })
    }
    const { dob, email } = req.body
    if (dob) {
        if (!validator.isDate(dob)) {
            return res.status(400).json({ error: "invalid Date" })
        }
    }
    if (email) {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "invalid email" })
        }
    }
    await Student.findByIdAndUpdate(studentId, req.body)
    res.json({ message: "Subject Update Success" })
})
exports.deleteStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params
    if (!validator.isMongoId(studentId)) {
        returnres.status(400).json({ error: "invalid studentId" })
    }
    await Student.findByIdAndDelete(studentId)
    res.json({ message: "student delete Success" })
})
exports.fetchStudents = asyncHandler(async (req, res) => {
    const { page = 0, limit = 2 } = req.query
    const count = await Student.countDocuments()
    const result = await Student.find()
        .skip(page * limit)
        .limit(limit)
    res.json({
        message: "Student fetch successfully",
        result,
        pagination: {
            total: count,
            pages: Math.ceil(count / limit)
        }
    })
})

// MARSK

exports.addMark = asyncHandler(async (req, res) => {
    const { student, subject, score } = req.body
    const { error, isError } = checkEmpty({ student, subject, score })
    if (isError) {
        res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isMongoId(student)) {
        returnres.status(400).json({ error: "invalid studentId" })
    }
    if (!validator.isMongoId(subject)) {
        returnres.status(400).json({ error: "invalid subjectId" })
    }
    console.log(req.body);

    await Mark.create({ student, subject, score })
    res.json({ message: "marks Create Success" })
})
exports.updateMark = asyncHandler(async (req, res) => {
    const { markId } = req.params
    if (!validator.isMongoId(markId)) {
        return res.status(400).json({ error: "invalid Mark Id" })
    }
    const data = {}
    const { subject, score } = req.body
    if (subject) {
        if (!validator.isMongoId(subject)) {
            returnres.status(400).json({ error: "invalid subjectId" })
        } else {
            data.subject = subject
        }
        if (score) {
            data.score = score
        }
    }
    await Mark.findByIdAndUpdate(markId, { subject, score })
    res.json({ message: "marks Update Success" })
})
exports.deleteMark = asyncHandler(async (req, res) => {
    const { markId } = req.params
    if (!validator.isMongoId(markId)) {
        returnres.status(400).json({ error: "invalid markId" })
    }
    await Mark.findByIdAndDelete(markId)
    res.json({ message: "marks delete Success" })
})
exports.fetchMarks = asyncHandler(async (req, res) => {
    const { studentId } = req.params
    if (!validator.isMongoId(studentId)) {
        return res.status(400).json({ error: "invalid student Id" })
    }
    const result = await Mark.find({ student: studentId }).populate("student").populate("subject")
    console.log(result);

    res.json({ message: "marks fetch successfully", result })
})