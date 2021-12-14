import React from 'react';

const Gif = ({image,title}) => {
    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100">
              <img className="card-img-top" src={image} alt={title} />
              <div className="card-body">
                  <h4 className="card-title">{title}</h4>
              </div>
            </div>
        </div>
    );
}

export default Gif;

