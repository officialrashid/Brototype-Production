import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import { storeChatDocument, storeChatImage, storeChatVideo } from '../../../utils/methods/post';
import { Smile,Image,Video,FolderClosed } from 'lucide-react'
const ChatMediaModal = ({ isVisible, onClose, changeModalStatus,handleMessageChange }: { isVisible: any; onClose: any; changeModalStatus: any; handleMessageChange:any}) => {
    const superleadId: any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const file = event.target.files && event.target.files[0];
        if (file) {
            if(file.type.startsWith("image")){
                const formData = new FormData();
                formData.append("image", file);
                formData.append("senderId", superleadId);
                const response = await storeChatImage(formData)
                console.log(response,"dsnbsbfsfhshsdshfs");
                if(response?.chatData?.audioUrl){
                    handleMessageChange(response?.chatData?.audioUrl,"imageChat")
                    changeModalStatus()
                }
            }
            else if(file.type.startsWith("video")){
                const formData = new FormData();
                formData.append("video", file);
                formData.append("senderId", superleadId);
                const response = await storeChatVideo(formData)
                console.log(response,"dsnbsbfsfhshsdshfs");
                if(response?.chatData?.audioUrl){
                    handleMessageChange(response?.chatData?.audioUrl,"videoChat")
                    changeModalStatus()
                }
            }
            else{
                const formData = new FormData();
                formData.append("document", file);
                formData.append("senderId", superleadId);
                const response = await storeChatDocument(formData)
                console.log(response,"dsnbsbfsfhshsdshfs");
                if(response?.chatData?.audioUrl){
                    handleMessageChange(response?.chatData?.audioUrl,"documentChat")
                    changeModalStatus()
                }
            }
          
            
        }
    };
    if (!isVisible) {
        return null;
    }

    return (
        <div className="absolute z-50 right-32 bottom-24 rounded-xl">
            <div className="grid-cols-1 bg-white w-48 h-36 shadow-xl rounded-lg ">
                <form className="mb-0 mt-0">
                    <div className="flex ">

                        <div className="m-4 mb-0 ml-0 mr-0 w-full">
                            <div className='flex rounded hover:bg-custom-background'>
                            <Image className='ml-3 mt-1' />
                            <label htmlFor="file-upload" className="mb-2 cursor-pointer rounded-md  px-3 py-1.5 text-sm font-medium font-roboto text-black focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Photos
                          
                            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileInputChange} />

                            </label>
                            </div>
                            <div className='flex rounded hover:bg-custom-background'>
                            <Video className='ml-3 mt-1' />
                            <label htmlFor="video-upload" className="mb-2 cursor-pointer rounded-md  px-3 py-1.5 text-sm font-medium font-roboto text-black focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Videos
                            <input type="file" id="video-upload" className="hidden" accept="video/*" onChange={handleFileInputChange} />


                            </label>
                            </div>
                            <div className='flex rounded hover:bg-custom-background'>
                            <FolderClosed className='ml-3 mt-1' />
                            <label htmlFor="document-upload" className="mb-2 cursor-pointer rounded-md  px-3 py-1.5 text-sm font-medium font-roboto text-black focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Document
                            <input type="file" id="document-upload" className="hidden" accept=".pdf,.zip,.docx" onChange={handleFileInputChange} />


                            </label>
                            </div>

                        </div>
                    

                    </div>
                </form>
            </div>
        </div>

    );
}

export default ChatMediaModal;
