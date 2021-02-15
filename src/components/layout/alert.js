import React from 'react'

import { connect } from "react-redux";

const Alert = ({ alert }) => {
  console.log(alert);
  return (
    <div>
      {alert.message && <div className=" alert alert-danger">
        {alert.message}
      </div>}

    </div>

  )
}

const mapStatetoProps = (state) => {
  return { alert: state.alert }
}
export default connect(mapStatetoProps)(Alert)