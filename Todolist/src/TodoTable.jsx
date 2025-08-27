import React from "react";

function TodoTable({ tasks, onToggle, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 border-collapse text-sm">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border border-gray-300 px-3 py-2 w-28">ID</th>
            <th className="border border-gray-300 px-3 py-2">Task</th>
            <th className="border border-gray-300 px-3 py-2 w-48">Created On</th>
            <th className="border border-gray-300 px-3 py-2 w-28">Status</th>
            <th className="border border-gray-300 px-3 py-2 w-32">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 px-3 py-6 text-center text-gray-500"
              >
                No tasks yet — add one above 
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-200 px-3 py-2 break-all">{task.id}</td>
                <td className="border border-gray-200 px-3 py-2">
                  <span className={task.done ? "line-through text-gray-500" : ""}>
                    {task.text}
                  </span>
                </td>
                <td className="border border-gray-200 px-3 py-2">{task.createdOn}</td>
                <td className="border border-gray-200 px-3 py-2">
                  <span
                    className={[
                      "inline-block rounded px-2 py-0.5 text-white",
                      task.done ? "bg-green-600" : "bg-yellow-600",
                    ].join(" ")}
                  >
                    {task.done ? "Done" : "Pending"}
                  </span>
                </td>
                <td className="border border-gray-200 px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggle(task.id)}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;
