module.exports = function createComponents(name) {
    return `
import React from 'react';
const ${name} = () => {
    return (
        <div className="max-container">
            <h1>${name}</h1>
        </div>
    );
};

export default ${name};
    `;
};
