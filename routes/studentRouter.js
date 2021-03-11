const express = require("express");
const router = express.Router();
// const studentController = require('../controllers/studentController')

// router.post('/', studentController.create_student)
// router.get('/', studentController.list_students)
// router.get('/:id', studentController.find_student)
// router.put('/', studentController.update_student)
// router.delete('/:id', studentController.delete_student)
// router.delete('/', studentController.delete_students)

// alternative; destructure the controllers

const {
  create_student,
  list_students,
  find_student,
  update_student,
  delete_student,
  delete_students,
} = require('../controllers/studentController');

router.post("/", create_student);
router.get("/", list_students);
router.get("/:id", find_student);
router.put("/", update_student);
router.delete("/:id", delete_student);
router.delete("/", delete_students);

module.exports = router;
