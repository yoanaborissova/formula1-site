import React, { Component } from 'react';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: this.props.products,
        };
    }

    //   componentDidMount() {
    //     fetch('http://localhost:9999/feed/movies')
    //       .then(response => response.json())
    //       .then(body => {
    //         if (body.movies) {
    //           this.setState({ movies: body.movies });
    //         }
    //       });
    //   }

    render() {
        return (
            <main id="site-content">
                <section className="dashboard" id="dashboardView">
                    <h1>Shop</h1>
                    {this.props.isAdmin ? 
                    <nav className="navbar">
                        <ul className="categories">
                            <li><a href="/product/add">Add new product</a></li>
                        </ul>
                    </nav>
                    : null}
                    <ul className="products">
                        <li className="product">
                            <h3>Ferrari Cup</h3>
                            <p>15$</p>
                            <p className="img"><img src="https://i.pinimg.com/originals/05/80/98/058098803a2bb5488b02ab08660da0d3.jpg" /></p>
                            <div className="pet-info">
                                <a href="#"><button className="button">Details</button></a>
                            </div>
                        </li>
                        <li className="product">
                            <h3>McLaren Keychain</h3>
                            <p>20$</p>
                            <p className="img"><img src="http://www.schumacher-fanclub.com/mclaren-mercedes-pictures/ml8911-mclaren-mercedes-f1-car-key-chain.jpg" /></p>
                            <div className="pet-info">
                                <a href="#"><button className="button">Details</button></a>
                            </div>
                        </li>
                        <li className="product">
                            <h3>Mercedes Keychain</h3>
                            <p>20$</p>
                            <p className="img"><img src="https://store.bahraingp.com/464-thickbox_default/mercedes-amg-f1-team-keyring.jpg" /></p>
                            <div className="pet-info">
                                <a href="#"><button className="button">Details</button></a>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>

        );
    }
}

export default Shop;