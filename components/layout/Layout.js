import React from 'react';
import MainNav from './main-navigation';

const Layout = (props) => {
    return (
        <div>
        <MainNav />
            <main>
              {
               props.children
              }
            </main>
        </div>
    )
}

export default Layout
