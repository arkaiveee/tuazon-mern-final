import axios from "axios";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/students";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");

  const [course, setCourse] = useState("");

  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);


  const fetchStudents = () => {

    axios

      .get(API_URL)

      .then((response) => setStudents(response.data))

      .catch((error) => console.error(error));

  };

  useEffect(() => {

    fetchStudents();

  }, []);

  const resetForm = () => {

    setName("");

    setCourse("");

    setAge("");

    setEditingId(null);

  };


  const handleSubmit = () => {

    const studentData = { name, course, age: Number(age) };

    if (editingId === null) {

      axios

        .post(API_URL, studentData)

        .then(() => {

          fetchStudents();

          resetForm();

        })

        .catch((error) => console.error(error));

    } else {

      axios

        .put(`${API_URL}/${editingId}`, studentData)

        .then(() => {

          fetchStudents();

          resetForm();

        })

        .catch((error) => console.error(error));

    }

  };



  const handleEdit = (student) => {

    setEditingId(student._id);

    setName(student.name);

    setCourse(student.course);

    setAge(student.age);

  };



  const handleDelete = (id) => {

    axios

      .delete(`${API_URL}/${id}`)

      .then(() => fetchStudents())

      .catch((error) => console.error(error));

  };

  return (
<div>
<h1>Student Management System</h1>
<h2>{editingId === null ? "Add Student" : "Edit Student"}</h2>
<input

        type="text"

        placeholder="Name"

        value={name}

        onChange={(e) => setName(e.target.value)}

      />
<input

        type="text"

        placeholder="Course"

        value={course}

        onChange={(e) => setCourse(e.target.value)}

      />
<input

        type="number"

        placeholder="Age"

        value={age}

        onChange={(e) => setAge(e.target.value)}

      />
<button onClick={handleSubmit}>

        {editingId === null ? "Add Student" : "Update Student"}
</button>

      {editingId !== null && <button onClick={resetForm}>Cancel</button>}
<h2>Students</h2>

      {students.map((student) => (
<div key={student._id}>
<p>Name: {student.name}</p>
<p>Course: {student.course}</p>
<p>Age: {student.age}</p>
<button onClick={() => handleEdit(student)}>Edit</button>
<button onClick={() => handleDelete(student._id)}>Delete</button>
</div>

      ))}
</div>

  );

}

export default App;
 