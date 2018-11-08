import React from 'react';
import ReactDom from 'react-dom';

function Personne () {
    return <div>Florian</div>
}

ReactDom.render(
    document.getElementById('root'),
    <Personne />
);