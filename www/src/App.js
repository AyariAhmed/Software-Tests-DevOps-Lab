import './App.css';
import { Header, Icon, Form, Button, Message } from 'semantic-ui-react';
import { useState } from 'react';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const onChange = (key, value) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      (credentials.email === '25401350' ||
        credentials.email === 'ahmed@ayari.io') &&
      credentials.password === '123456'
    ) {
      setError(false);
      setLoggedin(true);
    } else {
      setError(true);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
      }}
    >
      {loggedin ? (
        <Header as="h3" content="LoggedIn" />
      ) : (
        <>
          {' '}
          <Header as="h2" icon>
            <Icon name="settings" />
            Admin dashboard
            <Header.Subheader>
              Manage your restaurants with ease
            </Header.Subheader>
          </Header>
          <Form style={{ marginTop: 10, padding: 8 }}>
            <Form.Field>
              <label>Email/Phone number</label>
              <input
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Email/Phone number"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                onChange={(e) => onChange('password', e.target.value)}
                type={'password'}
                placeholder="Password"
              />
            </Form.Field>

            <Button type="submit" onClick={onSubmit}>
              Login
            </Button>
          </Form>
          {error && (
            <Message error header="Error" content="Wrong credentials" />
          )}
        </>
      )}
    </div>
  );
}

export default App;
