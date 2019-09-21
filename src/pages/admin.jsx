import React, { useState, useEffect } from 'react'
import NetlifyIdentity from 'netlify-identity-widget'

import Layout from '../components/layout/index'

import { Button, Input, Typography } from 'antd'

const AdminPage = () => {
  const [authUser, setAuthUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    NetlifyIdentity.on('init', user => {
      user ? setAuthUser(user) : setAuthUser(null)
    })
    NetlifyIdentity.on('login', user => {
      setAuthLoading(false)
      setAuthUser(user)
    })
    NetlifyIdentity.on('logout', () => {
      setAuthLoading(false)
      setAuthUser(null)
    })
    NetlifyIdentity.on('close', () => {
      setAuthLoading(false)
    })
    NetlifyIdentity.init({
      container: '#admin',
    })
  }, [authUser])

  return (
    <Layout location="admin">
      <div className="admin" id="admin">
        {authUser ? (
          <div className="auth">
            <div className="header">
              <Typography.Title style={{ fontFamily: 'Raleway' }}>
                Create New Post
              </Typography.Title>
              <Button
                loading={authLoading}
                onClick={() => {
                  setAuthLoading(true)
                  NetlifyIdentity.logout()
                }}
              >
                Log out
              </Button>
            </div>
            <div className="editor">
              <Input.TextArea
                placeholder="Write here..."
                autosize={{ maxRows: 20 }}
              ></Input.TextArea>
              <Button style={{ marginTop: '1rem' }} type="danger">
                Post
              </Button>
            </div>
          </div>
        ) : (
          <div className="unauth">
            <Button
              loading={authLoading}
              onClick={() => {
                setAuthLoading(true)
                NetlifyIdentity.open('login')
              }}
            >
              Login To Continue
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminPage
