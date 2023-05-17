const urlMapping: Record<string, string> = {
    "member": "eduservice/admin/edu-member",
    "research":"eduservice/admin/edu-research",
    "methodology":"eduservice/admin/edu-methodology",
    "banner": "educms/admin/banner",
    "permission":"auth/admin/permission",
    "role":"auth/admin/role",
    "allPermissions":"auth/admin/permission/permissions",
    "user":"auth/admin/user",
    "scholar":"eduservice/admin/edu-scholar",
    "review":"eduservice/admin/edu-review",
    "activity":"eduservice/admin/edu-activity"

    // add other mappings here
  };

function getResource(originalUrl:string) { return urlMapping[originalUrl] ?? originalUrl}
export default getResource;
