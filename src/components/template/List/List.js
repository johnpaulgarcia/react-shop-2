import React from 'react';
const List = ({children,toggle}) => {
    let class1 = `${toggle ? 'banana' : 'list-container'}`;
    return (

        <div class={class1}>
            {children}
        </div>

    );
}

export default List;