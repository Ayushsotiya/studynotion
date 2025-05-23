import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../../../common/IconBtn"
import {updateProfile} from "../../../../services/operations/SettingsAPI"
const ProfileInfo = () => {
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "other"]

    const {register,handleSubmit,formState:{errors}} = useForm();
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.profile)
    const sumbitProfileForm = async (data) => {
        try{
             dispatch((updateProfile(token, data)));
        }catch(error){
            console.log(error);
        }
    }
    return (
        <form onSubmit ={handleSubmit(sumbitProfileForm)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-white'>
                <h1 className='text-lg font-semibold text-richblack-5'>
                    Profile Information
                </h1>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label  htmlFor='firstName' className='label-style'>First Name</label>
                        <input type='text ' id='firstName' placeholder='Enter First Name' className='form-style text-black'{...register("firstname")} defaultValue={user?.firstName}></input>
                        {errors.firstName && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your First Name
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='lastName' className='label-style'>Last Name</label>
                        <input type='text' id='lastName' placeholder='Enter Last Name' className='form-style text-black'{...register("lastname")} defaultValue={user?.lastName}></input>
                        {errors.lastName && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your Last Name
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="dateOfBirth" className='lable-style'>
                            Date of Birth
                        </label>
                        <input 
                            type="date" 
                            name='dateOfBirth'
                            id='dateOfBirth'
                            className='form-style text-black    '
                            {...register('dateOfBirth', {
                                required: {
                                    value: true,
                                    message: "Please Enter Your Date Of Birth",
                                },
                                max: {
                                    value: new Date().toISOString().split('T')[0],
                                    message: "Date Of Birth cannot be in the future."
                                },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="gender" className='lable-style'>
                            Gender
                        </label>
                        <select 
                            type='text'
                            name='gender' 
                            id='gender'
                            className='form-style text-black'
                            {...register('gender', { required: true })}
                            defaultValue = {user?.additionalDetails?.gender}
                        >
                            {genders.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })}
                        </select>
                        {errors.gender && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your Date Of Birth
                            </span>
                        )}
                    </div>
                 </div>
                 <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="contactNumber" className='lable-style'>
                            Contact Number
                        </label>
                        <input 
                            type='tel' 
                            name='contactNumber'
                            id='contactNumber'
                            placeholder='Enter Contact Number'
                            className='form-style'
                            {...register('contactNumber', {
                                required: {
                                    value: true,
                                    message: 'Please Enter Your Contact Number',
                                },
                                maxLength: { value: 12, message: 'Invalid Contact Number' },
                                minLength: { value: 10, message: 'Invalid Contact Number' },
                            })}
                            defaultValue = {user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="about" className='lable-style'>
                            About
                        </label>
                        <input type="text" 
                            name='about'
                            id='about'
                            placeholder='Enter Bio Details'
                            className='form-style'
                            {...register('about', { required: true })}
                            defaultValue = { user?.additionalDetails?.about }
                        />
                        {errors.about && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your About
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-2'>
                <button
                    onClick={() => {
                        navigate('/dashboard/my-profile')
                    }}
                    className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                >
                    Cancel
                </button>
                <IconBtn type='submit' text='Save' />
            </div>
        </form>
    )
}

export default ProfileInfo 