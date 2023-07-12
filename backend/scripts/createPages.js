module.exports = function createPages(name) {
    return `
    import React from 'react';

    const ${name} = () => {
      return (
        <div>
          <h1>${name} Page</h1>
        </div>
      );
    };
    
    export default ${name};
    `;
};
