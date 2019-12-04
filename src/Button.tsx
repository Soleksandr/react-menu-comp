import React from 'react';

// export const Button = (props: any) => {
//     console.log('-- props button -- ', props)
//     return <button ref={props.btnRef}>click</button>
// }

export class Button extends React.Component<any> {
    doSmt () {
        console.log('-- this --', this)
    }

    render () {
        console.log('-- props button -- ', this.props)
        return <button>button</button>
    }
}