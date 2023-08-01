import React, { Fragment, memo } from "react";
import { useRedirect } from "react-admin";

interface AvatarProps{
    src: string;
    name: string;
    path?: string;
    id:string;

}

const AvatarR = memo(({src,name, path,id }:AvatarProps)=>{
    const redirect = useRedirect()
    const redirectPath = path?? `/member/${id}`
    return <>
        <div className="flex flex-wrap items-center text-center p-4" onClick={()=>redirect(redirectPath)}>
            <img src={src} className="w-8 h-8 rounded-full" /> <span className="hidden lg:inline-flex">{name}</span>
        </div>
    </>

})
export default AvatarR;

interface AvatarsProps{
    avatars: AvatarProps[];

}
// export const Avatars =({avatars }:AvatarsProps)=>{
//     return(
//     avatars.map((avatar) => <AvatarR key={avatar.id} src={avatar.src} name={avatar.name} id={avatar.id}/>)
//     ) 
// }
export const Avatars = memo(({avatars}: AvatarsProps) => {
    return (
        <>
            {avatars.map((avatar) => (
                <AvatarR key={avatar.id} src={avatar.src} name={avatar.name} id={avatar.id} />
            ))}
        </>
    );
});

