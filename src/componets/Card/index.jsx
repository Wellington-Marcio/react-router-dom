import React from 'react'

export default function Card() {
  return (
    <div className="row">
    <div className="col s12 m6">
      <div className="card">
        <div className="card-image">
          <img src="src/assets/images.png" />
          <span className="card-title">Card Title</span>
          <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">login</i></a>
        </div>
        <div className="card-content">
          <p>Aqui você pode lista e salvar os seus afazeres diarios, ordenanduos por prioridades.</p>
        </div>
      </div>
    </div>
  </div>
  )
}



