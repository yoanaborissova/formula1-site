import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProduct: this.props.selectedProduct 
        };
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/product/details/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
        this.setState({
            selectedProduct: data.product,
        })
    };

    render() {
        return (
            <main id="site-content">
                <div className="article">
                <section className="product-details">
                    <h3>{this.state.selectedProduct.name}</h3>
                    <h4>Price: {this.state.selectedProduct.price}$</h4>
                    <p className="img"><img src={this.state.selectedProduct.imageUrl} alt="Not found." /></p>
                    {!this.props.username ? <h6><Link to="/login">Log in</Link> to order this product!</h6> : 
                    <Link to="#" onClick={(event) => this.props.handleCreateSubmit(event, {
                        "product": this.state.selectedProduct.name,
                        "user": this.props.username,
                        "price": this.state.selectedProduct.price
                        }, 'order')} className="button" id="buy-button">Order</Link>}
                    <p>
                    { this.props.isAdmin ? <Link to="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'product', 'delete', this.state.selectedProduct._id)} className="button" >Delete</Link> : null}
                    { this.props.isAdmin ? <Link to={"/product/edit/" + this.state.selectedProduct._id} className="button" >Edit</Link> : null}
                    </p>
                    <p className="description">{this.state.selectedProduct.description}</p>
                </section>
                </div>
            </main>
        );
    }
}

export default ProductDetails;