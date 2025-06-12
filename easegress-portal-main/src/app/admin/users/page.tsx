"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

type Customer = {
  id: string;
  user_id: string;
  phone_number: number;
  address: string;
  gender: string;
};

const AccountManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, customersRes] = await Promise.all([
          fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/users"),
          fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/customers"),
        ]);
        const [usersData, customersData] = await Promise.all([
          usersRes.json(),
          customersRes.json(),
        ]);
        setUsers(usersData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (user: User) => {
    const customer = customers.find((c) => c.user_id === user.id) || null;
    setSelectedUser(user);
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      // Xóa user
      await fetch(
        `https://6825dd44397e48c91313eb90.mockapi.io/user/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      // Tìm và xóa customer nếu tồn tại
      const customerToDelete = customers.find((c) => c.user_id === userId);
      if (customerToDelete) {
        await fetch(
          `https://6825df9f397e48c91313f9ac.mockapi.io/qlks/customers/${customerToDelete.id}`,
          {
            method: "DELETE",
          }
        );
        setCustomers((prev) =>
          prev.filter((c) => c.id !== customerToDelete.id)
        );
      }

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setSnackbarOpen(true); // Mở thông báo
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Quản lý tài khoản
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 3 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>Họ tên</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Quyền</strong>
                </TableCell>
                {/* <TableCell>
                  <strong>Ngày tạo</strong>
                </TableCell> */}
                <TableCell align="center">
                  <strong>Hành động</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  {/* <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell> */}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleDetailClick(user)}
                      sx={{ marginRight: 1 }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog hiển thị chi tiết */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thông tin chi tiết tài khoản</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Typography>
                <strong>Họ tên:</strong> {selectedUser.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography>
                <strong>Quyền:</strong> {selectedUser.role}
              </Typography>
              {/* <Typography>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(selectedUser.created_at).toLocaleDateString()}
              </Typography> */}
            </>
          )}
          {selectedCustomer ? (
            <>
               <Typography><strong>SĐT:</strong> {String(selectedCustomer.phone_number)}</Typography>
              <Typography>
                <strong>Địa chỉ:</strong> {selectedCustomer.address}
              </Typography>
              <Typography>
                <strong>Giới tính:</strong> {selectedCustomer.gender}
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary">
              Không có thông tin khách hàng
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar hiển thị sau khi xóa */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "40%",
          transform: "translateY(-50%)",
        }}
      >
        <Alert
          severity="success"
          onClose={() => setSnackbarOpen(false)}
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            padding: "12px 24px",
            fontWeight: 600,
            borderRadius: "12px",
          }}
        >
          Đã xóa tài khoản thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountManagement;
