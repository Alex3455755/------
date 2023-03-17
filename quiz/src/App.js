import React from 'react';

class App extends React.Component {
  press() {
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ jwt: 'hello world' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.press}>siiiii</button>
      </div>
    );
  }
}

export default App;
