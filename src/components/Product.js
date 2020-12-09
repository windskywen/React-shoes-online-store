import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import { formatPrice } from 'commons/helper';
import Panel from 'components/Panel';
import EditInventory from 'components/EditInventory';

class Product extends React.Component {

    toEdit = () => {
        Panel.open({
            component: EditInventory,
            props: { 
                product: this.props.product,
                deletedProduct: this.props.delete
            },
            callback: data => {
                console.log(data)
                if(data){
                    this.props.update(data)
                }
            }
        })
    }

    addCart = async () => {
        if(!global.auth.isLogin()){
            this.props.history.push('/login');
            toast.info('Please login first');
            return;
        }

        try {
            const { id, name, image, price } = this.props.product;
            const res = await axios.get(`/carts?productId=${id}`);
            const carts = res.data;
            console.log(carts)
            if(carts && carts.length > 0){
                const cart = carts[0];
                cart.mount += 1;
                await axios.put(`/carts/${cart.id}`, cart)
            } else {
                const cart = {
                    productId: id,
                    name,
                    image,
                    price,
                    mount: 1
                }
                await axios.post('/carts', cart)
            }
            toast.success('Added to cart successfully')
            this.props.updateCartNum();
        } catch (error) {
            toast.error('Add cart failed')
        }
    }

    renderManagerBtn = () => {
        const user = global.auth.getUser() || {};
        if(user.type === 1){
           return(
            <div className="p-head has-text-right" onClick={this.toEdit}>
                <span className="icon edit-btn">
                    <i className="fas fa-sliders-h"></i>
                </span>
            </div>
            ) 
        }
    }

    render() {
        const { image, name, tags, price, status } = this.props.product;
        const p_class ={
            available: 'product',
            unavailable: 'product out-stock',
        }

        return (
            <div className={p_class[status]}>
                <div className="p-content">
                    {this.renderManagerBtn()}
                    <div className="img-wrapper">
                        <div className="out-stock-text">Out of Stock</div>
                        <figure className="image is-4by3">
                            <img src={image} alt={name} />
                        </figure>
                        <p className="p-tags">{tags}</p>
                        <p className="p-name">{name}</p>
                    </div>
                </div>
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart" disabled={status === 'unavailable'} onClick={this.addCart}> 
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Product);