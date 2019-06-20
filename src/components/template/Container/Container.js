import React, { Component } from 'react';
import styles from './container-template.css';
const Container = ({children,style}) => 
{
    return(
        <div class="container">
            <div class="content-box">
                    {children}
            </div>
        </div>
    );
};
export default Container;
