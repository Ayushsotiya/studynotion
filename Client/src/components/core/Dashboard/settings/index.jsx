import React from 'react'
import EditProfile from "./EditProfile"
import ProfileInfo from './ProfileInfo'
import UpdatePassword from "./UpdateProfile"
import DeleteAccount from './DeleteAccount'
const index = () => {
  return (
    <div className='flex flex-col gap-8 '>
        <h3>Edit Profle</h3>
        <EditProfile/>
        <ProfileInfo/>
        <UpdatePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default index;