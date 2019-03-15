import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: this.props.orders,
        };
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => res.json());
        this.setState({orders: data.resOrders})
      };

    render() {
        return (
            <div className="article">
            <h4>All users orders:</h4>
            {
            this.state.orders.length > 0 ?  
            this.state.orders.map(o => 
              <div className="comment" key={o._id}>
                <div>
                  <h6>{o.date.substr(0, 10)}:</h6>
                  <strong>{o.user}:</strong> {o.product} - <strong>{o.price}$</strong>
                  <h6 >Status: {o.status}</h6>
                </div>
                { o.status === 'Pending' ? 
                <div>
                <Link to="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, {"status": "Delivered"}, 'order', 'status', o._id)} className="button">Deliver</Link>
                </div>
                : null}
              </div>
            )
            :
            <h3>No orders yet.</h3>
            }
            </div>  
        );
    }
}

export default AllOrders;