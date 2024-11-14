import { Request, Response } from "express";

import { deleteById, findAll, insert, update } from "../services/course";
import { Course } from "../interfaces/course";

// Obtener todos los alumnos
export const getCourses = async (req: Request, res: Response) => {
  try {
    // obtener parametros de paginación con valores por defecto
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    //calcular offset
    const offset = (page - 1) * limit;

    const courses = await findAll(limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener alumnos", error });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course: Course = req.body;
    const newCourse = await insert(course);

    const io = req.app.get("io");
    io.emit("newStudentData", newCourse);
    res.status(201).json({ message: "Alumno creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear alumno", error });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const course: Course = req.body;
    await update(id, course);
    res.status(201).json({ message: "Alumno actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el alumno", error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Alumno eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar al alumno", error });
  }
};
