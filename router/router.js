const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

// Post request
router.post("/login", async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!teacher) {
      res.statusCode = 404;
      throw new Error("Sorry! You don't have an account.");
    }
    res.statusCode = 200;
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

// Get request
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

router.get("/test/:id", async (req, res, next) => {
  try {
    const studentId = await prisma.student.findUnique({
      where: {
        id: req.params.id,
      },
    });
    const test = await prisma.test.findMany({
      where: {
        testId: studentId.id,
      },
    });
    if (!test) {
      res.statusCode = 404;
      throw new Error("Students Not found");
    }
    res.send(test);
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
          email: req.body.email,
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

router.post("/student/test", async (req, res, next) => {
  try {
    await prisma.test.create({
      data: req.body,
    });
    res.send("done");
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/student/:id", async (req, res, next) => {
  try {
    await prisma.student.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send("delete successfully...");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
