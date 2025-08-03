import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Navbar, Nav, Form, FormControl, Button,
  Container, NavDropdown
} from 'react-bootstrap';
// const token = readToken();



export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    setToken(readToken());
  }, []);
  async function submitForm(e) {
    e.preventDefault();
    if (!searchField.trim()) return;
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
    setSearchField('');
    setIsExpanded(false);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    setToken(null);
    router.push('/login');
  }


  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="navbar navbar-dark bg-primary fixed-top">
        <Container>
          <Navbar.Brand>Fariha Shajjan</Navbar.Brand>
          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"}>
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            
            {token && (
              <>
                &nbsp;
                <Form className="d-flex" onSubmit={submitForm}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button variant="success" type="submit">Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token?.userName || "User Name"} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}
            
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}
