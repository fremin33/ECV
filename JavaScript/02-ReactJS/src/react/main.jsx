import React from 'react';
import ReactDOM from 'react-dom';

function Personne (props) {
    return <div>{props.name}</div>
}

function Classe() {
    return(
        <div>
            <Personne name="Florian"/>
            <Personne name="Romain"/>
            <Personne name="Felix"/>
            <Personne name="Mattieu"/>
            <Personne name="Mégane"/>
        </div>
    )
}

ReactDOM.render(
    <Classe />,
    document.getElementById('root')
);