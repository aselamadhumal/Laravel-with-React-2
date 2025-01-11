import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); // Track the student being edited
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: '',
  });

  // Fetch the students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`);
      setStudents(students.filter((student) => student.id !== id)); // Update state after deletion
      alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  // Handle edit student
  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditingStudent(id);
    setFormData({
      name: studentToEdit.name,
      email: studentToEdit.email,
      course: studentToEdit.course,
      phone: studentToEdit.phone,
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update student
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/students/${editingStudent}`,
        formData
      );
      const updatedStudent = response.data;
      setStudents(
        students.map((student) =>
          student.id === editingStudent ? updatedStudent : student
        )
      );
      setEditingStudent(null);
      setFormData({ name: '', email: '', course: '', phone: '' }); // Reset form
      alert('Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student');
    }
  };

  return (
    <div>
      {editingStudent && (
        <div>
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Course:</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingStudent(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {!editingStudent && (
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
                  <button onClick={() => handleEdit(student.id)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentTable;
