import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </Container>
  );
}
