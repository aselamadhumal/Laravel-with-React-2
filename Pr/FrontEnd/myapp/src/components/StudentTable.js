import React from 'react';
import axios from 'axios';

function StudentTable({ students }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`);
      alert('Student deleted successfully');
      window.location.reload(); // Refresh page after delete
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.phone}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
