import React from 'react';
import { Link } from 'react-router-dom';

export function PasswordUpdated() {
  return (
    <>
      <br />
      <br />
      <h1 style={{ textAlign: "center", color: "green", fontSize: "50px" }}>Password
        updated successfully</h1>

      <br />
      <br />
      <div style={{ textAlign: "center", color: "blue", fontSize: "30px" }}>
        <Link to="/"><button type="submit"
          className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Login</button></Link>
      </div>
    </>
  );
}
