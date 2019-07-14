import React, { useState, useEffect } from "react";
import NetlifyIdentity from 'netlify-identity-widget';

import Layout from "../components/layout/index";

import {
  Button,
  Typography
} from 'antd';

const AdminPage = () => {

  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    NetlifyIdentity.on('init', user => {
      user ? setAuthUser(user) : setAuthUser(null)
    });
    NetlifyIdentity.on('login', user => {
      setAuthUser(user)
    });
    NetlifyIdentity.on('logout', () => {
      setAuthUser(null)
    });
    NetlifyIdentity.init({
      container: '#admin'
    });
  }, [authUser])

  return (
  <Layout location="admin">
    <div className="admin" id="admin">
      {
        authUser ? (
          <Button onClick={()=> {NetlifyIdentity.logout()}}>Log out</Button>
        ) : (
          <Button onClick={()=> {NetlifyIdentity.open('login')}}>Log in</Button>
        )
      }
    </div>
  </Layout>
  )

}

export default AdminPage