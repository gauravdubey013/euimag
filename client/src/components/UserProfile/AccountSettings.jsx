import React, { useState } from 'react';
import axios from 'axios';
import './AccountSettings.css';

const AccountSettings = (props) => {
  const { user, fetchUserData } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set('username', user?.username);
    formData.set('profileimage', selectedFile);

    try {
      axios.post("http://localhost:3001/upload-user-pfp", formData).then((res) => {
        console.log(res.data.message);
        fetchUserData();
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload profile photo');
    }
  };

  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='profilePhoto'>Profile Photo <span>*</span></label>
          <input type='file' id='profilePhoto' name='profileimage' onChange={handleFileChange} />
        </div>
        <button type='submit' className='mainbutton1'>Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
