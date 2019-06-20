import React, {  Component } from 'react';
import Container from '../../template/Container';
import Right from '../Right';
import Left from '../Left';
import ListItem from '../../template/ListItem';
import List from '../../template/List';
import Search from '../Search';
let shoppe = [
    {id: 1,name: 'Bag',avatar:'https://product-images.www8-hp.com/digmedialib/prodimg/lowres/c03245561.png',description: 'Some dopey bag.',price: 2000.99,quantity: 1},
    {id: 2,name: 'Shoes',avatar: 'https://4.imimg.com/data4/UU/UU/GLADMIN-/images-sparx-shoes-large-sm-248-20r-blue-orange-500x500.png',description: 'Blehy shoes.',price: 1500.99,quantity: 1},
    {id: 3,name: 'Slippers',avatar: 'http://pngriver.com/wp-content/uploads/2018/04/Download-Beach-Sandal-PNG-File.png',description: 'Not slippery slippers.',price: 1098.00,quantity: 1},
                  ];
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            shop: shoppe,
            cart: [],
            isPay: false,
            isDup: false,
            totalPayment: 0,
            view: true,
            card: '',
            address: '',
            toggle: null
        }
        this.changePage = this.changePage.bind(this);
    }
    addToCart = (item) => {

      

        let checkset = new Set(this.state.cart);

        if(checkset.has(item)){
           
           item['quantity'] = item['quantity'] + 1;
           
        }

        else {
        item['quantity'] = 1;
        let newCart = this.state.cart;
        newCart.push(item);
        this.setState({
            cart: newCart
        })
        }
        let price = this.state.cart.reduce((prev,next)=>prev+(next.price*next.quantity),0);
        this.setState({
            totalPayment: price
        })

        
    }


   priceReducer = (cart) => {
       return cart.reduce((prev,next)=>prev+(next.price*next.quantity),0).toFixed(2);
   }

   _filter = (cart,item) => {
       return cart.filter(key=>key.id!==item.id);
   }


    remove = (item) => {
       
        if(item.quantity>1){
            let oldCart = this.state.cart;
            let itemRecovered = '';
            oldCart.map(_item=>{
                if(item.id === _item.id){
                   item.quantity-=1;
                   oldCart[oldCart.indexOf(item)] = item;
                }
            });
            let price = this.priceReducer(oldCart);
            this.setState({
                totalPayment: price,
                cart: oldCart
            })
           
        }
        else {
           let oldCart = this.state.cart;
           let newCart = this._filter(oldCart,item);
           let price = this.priceReducer(newCart);
           this.setState({
            totalPayment: price,
            cart: newCart,
        })
        }
        
        
    }

    changePage () {
       
        this.setState({
            view: !this.state.view
        });
    }

    checky = (val) => {
        val = String(val);
        if(val.length<=16){
            this.setState({
                card: val,
            })
        }
    }

    address = (val) => {
        this.setState({
            address: val
        })
    }

    paid = () => {
        if(this.state.address && this.state.card){
            this.setState({
                isPay: false,
                totalPayment: 0,
                cart:[]
            });
            this.changePage();
            alert("Booyah!.Payment Successful.");
        }
        else{
            alert("Please put a payment.");
        }
    }


    search = (query) => {
        let {shop} = this.state;
        let regex = new RegExp(query,'gi');
        let filtered = shop.filter(_item=>_item.name.match(regex));
        if(query.length===0){
            filtered = shoppe
        }
        this.setState({
            shop: filtered
        });
    }

    toggle = () => {
        let s = this.state.toggle;
        if(s===null){
            this.setState({
                toggle: 'a'
            })
        }
        else {
            this.setState({
                toggle: null
            })
        }
    }

 

    render(){
        return(
            <Container style="background: gray">
                {this.state.isPay && 
                    <div class="popup">
                    <div class="top topx">
                       Total Payment : {this.state.totalPayment} 
                       <p>
                            Please pay                       
                       </p>
                    <div class="cards">
                       <input type="text" onChange={(e)=>this.address(e.target)} class="inp" id="input" placeholder="Address"/>
                       <input type="number" value={this.state.card} onChange={(e)=>this.checky(e.target.value)} class="inp" id="input" placeholder="Credit Card Number"/>
                    </div>
                    </div>
                    <div class="bottom" onClick={()=>this.paid()}>
                        OK
                    </div>
    
                    </div>
                }
                <button class="changer" onClick={()=>this.changePage()}>
                  {this.state.view ?  `Checkout (${this.state.cart.length})` :  'Shop Page'}
                </button>
               {this.state.view && <Left>
               <div class="fitted">
               <button onClick={()=>this.toggle()}>
                Toggle
               </button>

               <h1>Products</h1>
               <Search searchFn={this.search}/>
                <List toggle={this.state.toggle}>
               {
                this.state.shop.map((item,index)=>{
                  return(
                    <ListItem item={item} addToCartFn={this.addToCart} key={index} />            
                  );
                })
               }
               </List>
               </div>
               </Left>}
               
               {!this.state.view && <Right>
               <div>
               <h1>Cart <span class="tp">#Total Payment : {this.state.totalPayment} PHP</span></h1>
               <List>
                  {
                      this.state.cart.map((item,index)=>{
                          return(
                            <div>
                            <ListItem item={item} removeCartFn={this.remove} key={index} />
                           </div>
                          );
                      })
                  }
                  {
                      this.state.cart.length===0 && <p>No Item Here, Start shopping now.</p>
                  }
                  </List>
                  </div>
                  <div class="paynow" onClick={()=>{
                    this.setState({isPay:true});
                    
                  }}>
                    Pay Now
                  </div>
               </Right>}
            </Container>
        );
    }
}


export default Home;