"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Trang chủ", path: "/home123" },
    { label: "Đặt phòng", path: "/booking" },
    { label: "Nội quy", path: "/rules" },
    { label: "Thông tin", path: "/info" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          KSQN
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {tabs.map((tab) => (
            <Link href={tab.path} key={tab.path} passHref>
              <Button
                variant={pathname === tab.path ? "contained" : "text"}
                color={pathname === tab.path ? "primary" : "inherit"}
                sx={{
                  fontWeight: pathname === tab.path ? "bold" : "normal",
                  color: pathname === tab.path ? "#fff" : "#000",
                  backgroundColor: pathname === tab.path ? "primary.main" : "transparent",
                  "&:hover": {
                    backgroundColor: pathname === tab.path ? "primary.dark" : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                {tab.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
