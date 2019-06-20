import React from 'react';
import styles from './search.css';
export default class Search extends React.Component {
    render(){

        const {searchFn} = this.props;

        return(
            <div class="searchbox">
                <input onChange={(e)=>searchFn(e.target.value)} class="input-actual" placeholder="Search Products"/>
            </div>
        );
    }
}