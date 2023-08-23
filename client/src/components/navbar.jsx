import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Navbartop = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <>
      {/* <div className="navbar"> */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            NQ's kitchen
          </Navbar.Brand>
          <Nav className="">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create-recipe">
              {" "}
              Create Recipe
            </Nav.Link>

            {!cookies.access_token ? (
              <Nav.Link as={Link} to="/auth">
                {" "}
                Login/Register
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/saved-recipes">
                  {" "}
                  Saved Recipe
                </Nav.Link>
                <button onClick={logout}> Logout</button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
