import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    course: '',
    phone: ''
  });
  const [editingStudent, setEditingStudent] = useState(null); // Track student being edited
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('There was an error fetching the students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/students', newStudent);
      fetchStudents(); // Re-fetch students after adding new one
      setNewStudent({ name: '', email: '', course: '', phone: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`);
      fetchStudents(); // Re-fetch students after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Handle edit student
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      phone: student.phone
    });
  };

  // Handle form input change for edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle update student
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/students/${editingStudent}`,
        formData
      );
      fetchStudents(); // Re-fetch students after update
      setEditingStudent(null); // Reset editing state
      setFormData({ name: '', email: '', course: '', phone: '' }); // Reset form
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h2>Students</h2>

      {editingStudent ? (
        <div>
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <button type="submit">Update Student</button>
            <button type="button" onClick={() => setEditingStudent(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newStudent.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={newStudent.course}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newStudent.phone}
              onChange={handleChange}
            />
            <button type="submit">Add Student</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Action</th>
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
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
