import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';

import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();

  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (data?.objectIDs?.length > 0) {

      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
    
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    } 
    else {
      setArtworkList([]);
    }
  }
  ,[data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList) {
    return (
      <Container className="mt-4">
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                  Try searching for something else.
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {artworkList.length > 0 && (
          <Row className="mt-4">
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </Container>
    );
  } else {
    return null;
  }
}
