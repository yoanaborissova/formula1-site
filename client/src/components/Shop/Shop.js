import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
        };
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json());
        this.setState({products: data.resProducts})
        console.log(this.state.products);
      };

    render() {
        return (
            <main id="site-content">
                <section className="dashboard" id="dashboardView">
                    <h1>Shop</h1>
                    {this.props.username ? 
                        <nav className="navbar">
                            <ul className="categories">
                                {this.props.isAdmin ? <li><Link to="/product/add">Add new product</Link></li> : null}
                                {this.props.isAdmin ? <li><Link to="/allorders">All users orders</Link></li> : null}
                                {!this.props.isAdmin ? <li><Link to="/myorders">My orders</Link></li> : null}
                            </ul>
                        </nav>
                     : null}    
                    <ul className="products">
                        {
                        this.state.products.length > 0 ?
                        this.state.products.map(p =>
                            <li className="product" key={p._id}>
                                <h3>{p.name}</h3>
                                <p>{p.price}$</p>
                                <p className="img"><img src={p.imageUrl} /></p>
                                <div>
                                    <Link to={"product/details/" + p._id} className="button">Details</Link>                                    </div>
                                </li>
                            )
                            : 
                            <h3>No products at the shop.</h3> 
                        }
                    </ul>
                </section>
            </main>

        );
    }
}

export default Shop;