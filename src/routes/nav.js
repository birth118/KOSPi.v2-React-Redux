import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../apis'



const Nav = () => {


  const [user, setUser] = React.useState(null)

  useEffect(() => {
    console.log('useEffect');

    client.get('api/user/currentuser')
      .then(({ data: { currentUser } }) => { console.log(currentUser); setUser(currentUser) })
      .catch((err) => { console.log(err.reponse) })

    return () => {

    }
  }, [])

  const nameInitial = (user) => {
    console.log(user);
    const names = user.name.split(' ')
    return names[0].substring(0, 1).toUpperCase() + names[1].substring(0, 1).toUpperCase()
  }


  return (
    <div className="ui stackable pointing menu">
      <div >
        {/* <img src="/images/bar.png" alt="" /> */}
        <Link to="/listing" className="item" >
          KOSPI.v2@m
          {user && <img className="ui avatar image"
            src={`https://ui-avatars.com/api/?background=AD8ABC&color=fff&name=${nameInitial(user)}`}
            alt={user.name.substring(0, 1).toUpperCase()} />}
        </Link>
      </div>
      <div className='right menu'>
        <Link to="/listing" className="item">Holdings</Link>
        <Link to="/stockcode" className="item">종목등록</Link>
        <Link to="/signout" className="item">Sign out</Link>
        <Link to={`/Transactall/${new Date().getFullYear()}0101`} className="item">History</Link>
      </div>

    </div>
  )
}

export default Nav