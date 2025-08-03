import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <Card.Img 
        variant="top" 
        className="mb-5"
        src={data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} 
      />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
  <Button variant="primary">{objectID}</Button>
</Link>

      </Card.Body>
    </Card>
  );
}