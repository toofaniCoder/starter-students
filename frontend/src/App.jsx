import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/students");
      setStudents(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h2">Welcome to Dashboard</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
