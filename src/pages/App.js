import React from 'react';
import Layout from 'Layout';
import Products from 'components/Products.js';

class App extends React.Component {
    render() {
        return(
            <Layout>
                <Products />
            </Layout>
        )
    }
}

export default App;