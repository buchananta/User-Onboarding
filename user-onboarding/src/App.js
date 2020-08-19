import React, {useState} from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [userData, setUserData] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Onboarding</h1>
      </header>
      <Form userData={userData} setUserData={setUserData} />
      
      <div className="users-container">
        {userData.map(user => {
          return (
          <pre className="user" key={user.id}>
            <h4>{user.username}</h4>
            {JSON.stringify(user)}
          </pre> )
        })}
      </div>
    </div>
  );
}

export default App;
