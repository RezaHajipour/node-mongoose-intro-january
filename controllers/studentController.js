const Student = require('../models/Student')

// 1st syntax for exporting controllers:

// module.exports = {
//     list_students: (req, res, next) => {
//         //
//     },
//     find_student: (req, res, next) => {
//         //
//     }
// }

// 2nd syntax for exporting controllers:

// const list_students = async (req, res) => {
//     //
// }

// module.exports = {
//     list_students
// }


// 3rd syntax for exporting controllers:

// Get all students controller
exports.list_students = async (req, res) => {
    try {
      const allStudents = await Student.find({})
      res.json(allStudents)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

exports.find_student = async (req, res) => {
    const { id } = req.params
    try {
      const targetStudent = await Student.findById(id)
      if (!targetStudent) return res.status(404).send('No such student')
      res.json(targetStudent)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

exports.create_student = async (req, res) => {
    const { first_name, last_name } = req.body
    // console.log(first_name, last_name)
  
    // Student.create({ first_name, last_name })
    //   .then(data => res.json(data))
    //   .catch(err => res.status(500).send(err.message))
  
    try {
      const newStudent = await Student.create({ first_name, last_name })
      res.json(newStudent)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

exports.update_student = async (req, res) => {
    const { old_name, new_name } = req.body
    // try {
    //   const updatedStudent = await Student.updateOne({"last_name": old_name}, {"last_name": new_name})
    //   res.json(updatedStudent)
    //   // if (!targetStudent) return res.status(404).send('No such student')
    //   // res.json(targetStudent)
    // } catch (e) {
    //   res.status(500).send(e.message)
    // }
  
    try {
      const updatedStudent = await Student.findOneAndUpdate({"last_name": old_name}, {"last_name": new_name}, {new: true})
      res.json(updatedStudent)
      // if (!targetStudent) return res.status(404).send('No such student')
      // res.json(targetStudent)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

exports.delete_student = async (req, res) => {
    const { id } = req.params
    try {
      const deletedStudent = await Student.findByIdAndDelete(id)
      if (!deletedStudent) res.status(404).send('No such student')
      res.json(deletedStudent)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

exports.delete_students = async (req, res) => {
    const { condition, value } = req.body
    try {
      if (!condition || !value) throw new Error('Please pass valid conditions')
      const deletedInfo = await Student.deleteMany({[condition]: value})
      res.json(deletedInfo)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }