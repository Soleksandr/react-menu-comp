import React from 'react';
// import { Button } from './Button'

// const Comp = (props: any) => {
//     console.log('-- props test -- ', props)

//     return <Button { ...props} />
// }



export const Test: React.FC<{ children: React.ReactElement<any> }> = ({ children }) => {
    const arr = React.Children.toArray(children).filter(ch => !!ch)

   
   return <>
    {children}
   </>
}