import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { Post } from './types'; 
import DepartmentList from './DepartmentList';

function SecondPage() {
  const userDataString = localStorage.getItem('userData');
  const [posts, setPosts] = useState<Post[]>([]); // Use the Post interface
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDataString) {
      navigate('/form-page');
    } else {
      fetchPosts();
    }
  }, [userDataString, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data: Post[] = await response.json(); // Cast the response to Post[]
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  let userData = null;
  if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  if (!userData) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>Access Denied</Typography>
        <Typography>Please provide your details on the first page to access this page.</Typography>
      </div>
    );
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  return (
    <div style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>Welcome to the Second Page</Typography>
      <div>
        <Typography>Name: {userData.name}</Typography>
        <Typography>Phone Number: {userData.phoneNumber}</Typography>
        <Typography>Email: {userData.email}</Typography>
      </div>
      <hr />
      <div style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid rows={posts} columns={columns} pageSize={5} />
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }}>
        <Typography variant="h5" style={{ marginBottom: '1rem' }}>Departments and Sub-Departments</Typography>
        <DepartmentList />
      </div>
    </div>
  );
}

export default SecondPage;
