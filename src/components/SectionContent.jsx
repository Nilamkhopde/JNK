import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SectionContent.css";

export default function SectionContent() {

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/content/section/${id}`)
      .then(res => setData(res.data));
  }, [id]);

  return (
    <div>
      <h2>Section Content</h2>

      {data.map(c => (
        <div key={c.contentId}>
          <img src={`http://localhost:8080/api/image/${c.contentImage}`} width="150"/>
          <h3>{c.contentName}</h3>
          <p>{c.contentDescription}</p>
        </div>
      ))}
    </div>
  );
}