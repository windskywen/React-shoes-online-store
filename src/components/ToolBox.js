import React from 'react';
import { withRouter } from 'react-router-dom';

class ToolBox extends React.Component {

    state = {
        searchText: '',
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({ searchText: value})
        this.props.search(value)
    }

    clearSearchText = () => {
        this.setState({ searchText: ''});
        this.props.search('');
    }

    goCart = () => {
        this.props.history.push('/cart');
    }

    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input
                                type="text"
                                className="input search-input"
                                placeholder="Search Products"
                                value={this.state.searchText}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <div className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
        )
    }
}

export default withRouter(ToolBox);