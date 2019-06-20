import React, { Component } from 'react';
import List from '../../template/List';

const Right = ({children}) => {
    return(
        <div class="right-container">
            <List>

            {children}
               
            </List>
        </div>  
    );
}

export default Right;