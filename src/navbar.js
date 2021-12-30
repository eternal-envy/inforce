import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
          <h1><Link to="/">Product List</Link></h1>
          <Link to="/create"><button>Create new product</button></Link>
      </nav>
    );
}

export default Navbar;