import React from 'react'

const styles = {
    padding: "5%",
    color: "green",
    margin: "auto",
    
}

function ErrorComponent() {
    
    return (
        <div style={styles}>
            <h3> Oops! Resource Not Found! </h3>
        </div>
    )
}

export default ErrorComponent
