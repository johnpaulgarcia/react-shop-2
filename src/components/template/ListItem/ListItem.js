import React from 'react';
import PropTypes from 'prop-types';
export default class ListItem extends React.Component {
    render(){
        let style = "list-item";
    const {addToCartFn,item,removeCartFn} = this.props;
    const {
        price,
        avatar,
        name,
        description,
        quantity
    } = this.props.item;
    return(
        <div class={style}>
        <div class="top">
        <p class="prod_name">
        {name} ({price} PHP)  {removeCartFn &&  ` -- QTY: ${quantity}`}
        </p>
       
        <p>{description}</p>
        <img class="prod_image" src={avatar} />
       
        
       
      </div>

      {
          removeCartFn ? <button class="btn" onClick={()=>removeCartFn(item)}>
          Remove to Cart
      </button> :   <div onClick={()=>addToCartFn(item)} class="bottom">
      Add to Cart
  </div>
      }

     
        </div>
    );
    }
}

PropTypes.ListItem = {
    addToCartFn: PropTypes.func,
    removeCartFn: PropTypes.func,
    item: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        avatar: PropTypes.string
    })
}