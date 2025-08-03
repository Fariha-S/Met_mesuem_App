import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';


export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  async function submitForm(data) {
    let queryString = '';
    
    queryString += `${data.searchBy}=true`;
    
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    
    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&q=${data.q}`;
    
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)} className="mt-5">
        <Row>
          <Col>
            <Form.Label>Search Query</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="" 
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Geo Location</Form.Label>
            <Form.Control 
              type="text" 
              placeholder=""
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (e.g. "Europe", "France", "Paris", "China", "New York"), with multiple values separated by the | operator
            </Form.Text>
          </Col>
          <Col md={4}>
            <Form.Label>Medium</Form.Label>
            <Form.Control 
              type="text" 
              placeholder=""
              {...register("medium")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (e.g. "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles"), with multiple values separated by the | operator
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}