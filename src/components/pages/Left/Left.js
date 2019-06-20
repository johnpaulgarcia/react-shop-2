import React , {  Component } from 'react';
import List from '../../template/List';
import ListItem from '../../template/ListItem';
const Left = ({children}) => {
  return(
    <div class="left-container">
        <List>
               {children}           
        </List>
    </div>

);
}
export default Left;