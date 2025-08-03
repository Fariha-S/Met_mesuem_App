import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { Button, Card, Form, Alert } from 'react-bootstrap';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setWarning('');

    const success = await authenticateUser(user, password);
    if (success) {
      await updateAtoms();
      router.push('/');
    } else {
      setWarning('Invalid username or password');
    }

    setIsSubmitting(false);
  }



  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <p>Enter your login information below:</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>User:</Form.Label>
              <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {warning && <Alert variant="danger">{warning}</Alert>}

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
