import React, { useState } from 'react';
import axios from 'axios';

export function MyComponent(){
  const [postData, setPostData] = useState({}); // State to hold data for POST request

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://api.example.com/post-endpoint', postData);
      console.log('Post request response:', response.data);
      // Handle response data as needed
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle error
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title" // Change with your input field names
          placeholder="Title"
          onChange={handleChange}
        />
        {/* Add more input fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


