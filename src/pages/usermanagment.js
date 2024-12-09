import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
} from "@mui/material";

const AdminManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Citywatch/CityWatch-Backend/manageusers.php",
        {
          params: {
            action: "fetchUsers",
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Fetch Users Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/Citywatch/CityWatch-Backend/manageusers.php",
        {
          action: "addUser",
          ...newAdmin,
          usertype: "admin",
        }
      );

      if (response.data.success) {
        alert("New admin added successfully!");
        setNewAdmin({ name: "", email: "", password: "" }); // Reset form
        fetchUsers(); // Refresh users
      } else {
        alert("Error adding admin: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost/Citywatch/CityWatch-Backend/manageusers.php",
        {
          action: "deleteUser",
          user_id: userId,
        }
      );

      if (response.data.success) {
        alert("User deleted successfully!");
        fetchUsers(); // Refresh users after deletion
      } else {
        alert("Error deleting user: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on page load
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Management
      </Typography>

      {/* Add New Admin Form */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Add New Admin
        </Typography>
        <form onSubmit={handleAddAdmin}>
          <TextField
            label="Name"
            name="name"
            value={newAdmin.name}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={newAdmin.email}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={newAdmin.password}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#6941C6" }}
          >
            Add Admin
          </Button>
        </form>
      </Paper>

      {/* Admin Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.usertype}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminManagementPage;
