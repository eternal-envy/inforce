import Navbar from './navbar';
import MainBody from "./main-body";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateNewProduct from "./create-new-product";
import ProductView from "./product-view";
import EditProduct from "./edit-product";

function App() {

  return (
    <Router>
        <div className="App">
            <Navbar />
            <div className="content">
                <Switch>
                    <Route exact path='/'>
                        <MainBody />
                    </Route>
                    <Route path='/create'>
                        <CreateNewProduct />
                    </Route>
                    <Route exact path='/product/:id'>
                        <ProductView />
                    </Route>
                    <Route path='/product/:id/edit'>
                        <EditProduct />
                    </Route>
                </Switch>
            </div>
        </div>
    </Router>
  );
}

export default App;
