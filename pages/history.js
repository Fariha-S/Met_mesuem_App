import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if (!searchHistory) return null;


  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));

  }

  return (
  <Container className="mt-4">
    <Row>
      <Col>
        {parsedHistory.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>
                Try searching for some artwork.
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map((key) => (
                  <span key={key}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}
                <Button
                  className="float-end" variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  </Container>
);


}
