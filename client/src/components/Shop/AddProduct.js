import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            price: null,
            description: null,
            imageUrl: null
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleCreateSubmit(event, this.state, 'product')}>
                            <p className="field">
                                <label htmlFor="name">Name</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="name" id="name" placeholder="Name" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="description">Description</label>
                                <span className="input">
                                    <textarea onChange={this.handleChange} rows={2} cols={60} type="text" name="description" id="description" placeholder="Description" defaultValue={""} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="image">Price</label>
                                <span className="input">
                                    <input type="number" onChange={this.handleChange} name="price" id="image" placeholder="Price" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="image">Image</label>
                                <span className="input">
                                    <input type="text" onChange={this.handleChange} name="imageUrl" id="image" placeholder="Image" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <input className="button" type="submit" value="Add product" id="submitLogin" />
                        </form>
                    </section>
                </section>
            </main>
        );
    }
}

export default AddProduct;