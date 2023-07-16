const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

// GET request
router.get("/login/:email", async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: req.params.email,
      },
    });
    if (!teacher) {
      res.statusCode = 404;
      throw new Error("Sorry! You don't have an account.");
    }
    res.statusCode = 200;
    res.send("login successfully...");
  } catch (error) {
    next(error);
  }
});

router.get("/teacher/:email", async (req, res, next) => {
  try {
    const teacherId = await prisma.teacher.findUnique({
      where: {
        email: req.params.email,
      },
    });
    const students = await prisma.student.findMany({
      where: {
        teacherId: teacherId.id,
      },
    });
    if (!students) {
      res.statusCode = 404;
      throw new Error("Students Not found");
    }
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// POST request
router.post("/teacher/register", async (req, res, next) => {
  try {
    await prisma.teacher
      .create({
        data: req.body,
      })
      .catch((error) => next(error));
    res.statusCode = 201;
    res.send("create successfully...");
  } catch (error) {
    next(error);
  }
});

router.post("/student/register", async (req, res, next) => {
  try {
    await prisma.student
      .create({
        data: {
          name: req.body.name,
          age: req.body.age,
          class: req.body.class,
          gender: req.body.gender,
          roll_no: req.body.roll_no,
          teacherId: req.body.teacherId,
        },
      })
      .catch((error) => next(error));
    res.send("create successfully...");
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/student/:id", async (req, res, next) => {
  try {
    await prisma.student
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch((error) => next(error));
    res.send("delete successfully...");
  } catch (error) {
    next(error);
  }
});

module.exports = router;