import React, { Component } from 'react';

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProduct: this.props.selectedProduct,
            name: null,
            price: null,
            imageUrl: null,
            description: null           
        }

        this.handleChange = this.props.handleChange.bind(this);
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
            name: data.product.name,
            price: data.product.price,
            imageUrl: data.product.imageUrl,
            description: data.product.description
        })
        
        console.log(this.state);
      };

    render() {

        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'product', 'edit', this.state.selectedProduct._id)} id="formLogin">
                            <p className="field">
                                <label htmlFor="name">Name</label>
                                <span className="input">
                                    <input  onChange={this.handleChange} type="text" name="name" defaultValue={this.state.selectedProduct.name} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Price</label>
                                <span className="input">
                                    <input  onChange={this.handleChange} type="number" name="price" defaultValue={this.state.selectedProduct.price} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Description</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="description" defaultValue={this.state.selectedProduct.description} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="image">Image</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="imageUrl" id="image" defaultValue={this.state.selectedProduct.imageUrl} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <input className="button" type="submit" value="Save" />
                        </form>
                    </section>
                </section>
            </main>
        );

    }
}

export default EditProduct;