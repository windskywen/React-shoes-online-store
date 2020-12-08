import React from 'react';
import { render } from 'react-dom';

class Panel extends React.Component{
    state = { 
        active: false,
        callback: () => {},
    }

    open = (options = {
        props: {},
        component: null,
        callback: () => {}
    }) => {
        // collect the AddInventory component passed from Products component
        // create a instance and save it into state
        // so the AddInventory component can be used from the state
        const { props, component, callback } = options;
        const _key = new Date().getTime(); // create a key attribute that allows to create a new comppnent every time
        const _component = React.createElement(component, { 
            ...props,
            close: this.close, 
            key: _key 
        });
        this.setState({ 
            active: true,
            component: _component,
            callback: callback
        });
    }

    close = data => {
        this.setState({ active: false });
        this.state.callback(data);
    }

    render(){
        const _class = {
            true: 'panel-wrapper active',
            fales: 'panel-wrapper'
        }
        return(
            <div className={_class[this.state.active]}>
                <div className="over-layer" onClick={()=> {this.close()}}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={()=> {this.close()}}>X</span>
                        {this.state.component}
                    </div>
                </div>   
            </div>
        )
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

const _panel = render(<Panel />, _div);
console.log(_panel)
export default _panel;