import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditSocialSphere() {
    
  //   const { id } = useParams();
  //   const [data, setData] = useState({});
  //   const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //       const fetchData = async () => {
  //           setLoading(true);
  //           const result = await axios.get(`http://localhost:8080/api/social-sphere/${id}`);
  //           setData(result.data);
  //           setLoading(false);
  //       };
  //       fetchData();
  //   }, [id]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setData((prevData) => ({
  //         ...prevData,
  //         [name]: value,
  //     }));
  // };

  //   const handleSubmit = async (e) => {
  //       e.preventDefault();
  //       try {
  //           await axios.post(`http://localhost:8080/api/social-sphere/edit/${id}`, data);
  //           navigate('/social-sphere');
  //       } catch (error) {
  //           console.error("There was an error editing the social sphere:", error);
  //       }
  //   };

  // may not need edit form
    return (
        // <form onSubmit={handleSubmit}>
        //     <input type='text' value={data.applicationUser.id}/>
        //     <button type="submit">Edit Social Sphere</button>
        // </form>
        <div>
          Edit
        </div>
    );
}

export default EditSocialSphere;
