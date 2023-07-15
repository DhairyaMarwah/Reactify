module.exports = function createPages(name) {
    return `
    import React from 'react';

    const ${name} = () => {
      return (
        <div className="page | max-container">
        <div className="page-header">
          ${name} Page
        </div>
      </div>
      );
    };
    
    export default ${name};
    `;
};
