import React, { Fragment, memo } from "react";
import { useRedirect } from "react-admin";

interface AvatarProps {
  avatar: string;
  name: string;
  path?: string;
  id: string;
}

const AvatarR = memo(({ avatar, name, path, id }: AvatarProps) => {
  const redirect = useRedirect();
  const redirectPath = path ?? `/member/${id}`;
  return (
    <>
      <div
        className="flex flex-wrap items-center text-center p-4"
        onClick={() => redirect(redirectPath)}
      >
        <img src={avatar} className="w-8 h-8 rounded-full" />{" "}
        <span className="hidden lg:inline-flex pl-2">{name}</span>
      </div>
    </>
  );
});
export default AvatarR;

interface AvatarsProps {
  avatars: AvatarProps[];
}
// export const Avatars =({avatars }:AvatarsProps)=>{
//     return(
//     avatars.map((avatar) => <AvatarR key={avatar.id} src={avatar.src} name={avatar.name} id={avatar.id}/>)
//     )
// }
export const Avatars = memo(({ avatars }: AvatarsProps) => {
  if (avatars && avatars.length > 0) {
    return (
      <div className="flex">
        {avatars.map((avatar) => (
          <AvatarR
            key={avatar.id}
            avatar={avatar.avatar}
            name={avatar.name}
            id={avatar.id}
          />
        ))}
      </div>
    );
  }
  return <></>;
});
