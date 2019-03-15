import React, { Component } from 'react';

class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: this.props.orders,
            user: this.props.username
        };
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/orders/' + this.props.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        })
        .then(res => res.json());
        this.setState({orders: data.resOrders})
      };

    render() {
        return (
            <div className="article">
            <h4>My orders:</h4>
            {
            this.state.orders.length > 0 ?   
            this.state.orders.map(o => 
              <div className="comment" key={o._id}>
                <div>
                  <h6>{o.date.substr(0, 10)}:</h6>
                  {o.product} - <strong>{o.price}$</strong>
                  <h6 >Status: {o.status}</h6>
                </div>
              </div>
            )
            :
            <h3>You haven't made any orders yet.</h3>
            }
            </div>  
        );
    }
}

export default MyOrders;