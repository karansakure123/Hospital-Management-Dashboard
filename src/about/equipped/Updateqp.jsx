import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Updateqp = () => {
  const [formData, setFormData] = useState({
    eqpHeading: '',
    eqpTitle: '',
    eqpImg: '',
  });

  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquippedById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/about/equipped/get/${id}`);
        const equipped = response.data.equipped;

        setFormData({
          eqpHeading: equipped.eqpHeading || '',
          eqpTitle: equipped.eqpTitle || '',
          eqpImg: equipped.eqpImg || '',
        });
      } catch (error) {
        console.error("Error fetching equipped item:", error);
        toast.error("Failed to fetch equipped item. Please try again later.");
      }
    };

    fetchEquippedById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://hospital-management-backend-3.onrender.com/api/v1/about/equipped/update/${id}`, formData);
      toast.success('Equipped item updated successfully!');
      navigate('/about/equipped/getall');
    } catch (error) {
      toast.error('Failed to update equipped item!');
    }
  };

  return (
    <div className="addeqp-container">
      <h2 className='addeqp-title'>Update Equipped Item</h2>
      <form className="addeqp-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="eqpHeading">Equipped Heading</label>
            <input
              type="text"
              id="eqpHeading"
              name="eqpHeading"
              value={formData.eqpHeading}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="eqpTitle">Equipped Title</label>
            <input
              type="text"
              id="eqpTitle"
              name="eqpTitle"
              value={formData.eqpTitle}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="eqpImg">Image URL</label>
            <input
              type="text"
              id="eqpImg"
              name="eqpImg"
              value={formData.eqpImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="submit-btn">Update Equipped Item</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Updateqp;
