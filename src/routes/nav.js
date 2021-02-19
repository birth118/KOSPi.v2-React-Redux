import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../apis'



const Nav = () => {


  const [user, setUser] = React.useState(null)

  useEffect(() => {
    console.log('useEffect');

    client.get('api/user/currentuser')
      .then(({ data: { currentUser } }) => {
        //     console.log(currentUser);
        setUser(currentUser)
      })
      .catch((err) => { console.log(err.reponse) })

    return () => {

    }
  }, [])

  const nameInitial = (user) => {
    //   console.log(user);
    const names = user.name.split(' ')
    return names[0].substring(0, 1).toUpperCase() + names[1].substring(0, 1).toUpperCase()
  }


  return (
    <div>

      <nav className="navbar navbar-expand-md navbar-light bg-light " style={{ backgroundColor: "#c9d6df" }}>

        <Link className="navbar-brand" to="/listing">

          KOSPI.v2@m
          {user && <img width="30" height="30" className="d-inline-block align-middle ml-2"
            src={`https://ui-avatars.com/api/?background=AD8ABC&color=fff&name=${nameInitial(user)}`}
            alt={user.name.substring(0, 1).toUpperCase()} />}

        </Link>


        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">


          <ul className="navbar-nav mr-auto mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/listing">Holdings <span className="sr-only">(current)</span> </Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to="/stockcode">종목등록 </Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to="/signout">Sign out</Link>
            </li>

            <li className="nav-item ">

              <Link className="nav-link"
                // target="_blank" 
                to={`/Transactall/${new Date().getFullYear()}0101`}> History </Link>
            </li>



          </ul>
        </div>
      </nav>






    </div>
  )
}

export default Nav