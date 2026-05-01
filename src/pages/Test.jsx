// Save this as src/pages/Test.jsx
function Test() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>TEST PAGE</h1>
      <p>If you see this, routing works.</p>
      <button onClick={() => {
        fetch('/movies.json')
          .then(r => r.json())
          .then(data => alert('Movies loaded: ' + data.length))
          .catch(e => alert('Error: ' + e.message));
      }}>Test Fetch</button>
    </div>
  );
}

export default Test;
