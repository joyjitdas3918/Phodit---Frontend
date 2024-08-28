import React from 'react'

export default function Alert(props) {
  return (
    <div style={{height: '50px', width:"100%"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`}  role="alert">
           <strong>{props.alert.message}</strong>
        </div>}
        </div>
  )
}