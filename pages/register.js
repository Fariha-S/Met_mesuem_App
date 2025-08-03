import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';
import { Button, Card, Form, Alert } from 'react-bootstrap';

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


async function handleSubmit(e) {
  e.preventDefault();
  setIsSubmitting(true);
  setWarning("");

  const result = await registerUser(user, password, password2);

  if (result === true) {
    router.push("/login");
  } else {
    setWarning(result.message || "Registration failed. Please try again.");
  }

  setIsSubmitting(false);
}





  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          <p>Register for an account:</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>User:</Form.Label>
              <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </Form.Group>

            {/* {warning && <Alert variant="danger">{warning}</Alert>} */}

            {warning && (
  <Alert variant="danger">
    {warning}
  </Alert>
)}


            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
