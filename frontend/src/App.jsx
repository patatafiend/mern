import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import Homepage from "./pages/HomePage";
import NavBar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"}  bg={useColorModeValue("gray.200", "gray.900")}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;