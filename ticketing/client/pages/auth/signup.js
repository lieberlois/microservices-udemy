const Signup = () => {
  return (
    <form>
      <h1>Signup</h1>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-control" type="password"></input>
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
