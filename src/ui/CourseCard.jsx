import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

export default function CourseCard({ course }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6, boxShadow: "0 20px 30px rgba(0,0,0,0.12)" }}
        className="p-5 rounded-xl bg-white dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-xs text-gray-500">
              {course.category} • {course.difficulty}
            </p>
          </div>
          <div className="text-sm">⭐{course.pop}</div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {course.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm"
          >
            Preview
          </button>
          <button className="px-3 py-1 rounded-md bg-accent text-white text-sm">
            Enroll
          </button>
        </div>
      </motion.article>

      {/* Modal for course preview */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {course.category} • {course.difficulty} • ⭐{course.pop}
        </p>
        <p className="text-gray-700 dark:text-gray-200">{course.summary}</p>

        {/* Example extra content */}
        <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          <li>Duration: 5 weeks</li>
          <li>Language: English</li>
          <li>Includes quizzes & assignments</li>
        </ul>
      </Modal>
    </>
  );
}
