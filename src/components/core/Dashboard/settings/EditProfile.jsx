import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiUpload } from 'react-icons/fi'
import IconBtn from '../../../common/IconBtn'
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI'

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const {token} = useSelector((state) => state.auth)
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        fileInputRef.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        //console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }
    const previewFile = ( file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        };
    }
    useEffect(() => {
        if(imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

   const handleFileUpload = async () => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('displayPicture', imageFile);
            dispatch(updateDisplayPicture(token ,formData),then(()=>{
                setLoading(false);
            }))
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-white'>
            <div className='flex flex-row gap-x-4'>
                <div>
                    <img src={previewSource || user?.image} alt="Profile" className='aspect-square w-[78px] rounded-full object-cover' />
                </div>
                <div className="space-y-2">
                    <p>Change Profle picture</p>
                    <div className='flex  gap-3'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png,image/jpeg,image/jpg"
                            className='hidden'>
                        </input>
                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                        >
                            Select
                        </button>
                        <IconBtn 
                        text={loading ? 'Uploading...':'Upload'}
                        onclick={handleFileUpload}
                        className='bg-yellow-50'
                    >
                        {
                            !loading && (
                                <FiUpload className='text-lg text-richblack-900 ' />
                            )
                        }
                    </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile