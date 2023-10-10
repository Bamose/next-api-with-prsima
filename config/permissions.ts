export const ALL_PERMISSIONS = [

    "users:roles:write",
    "users:roles:delete"
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission)=> {
    acc[permission] = permission;

    return acc;
}, {}as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>)

export const USER_ROLE = [

];

export const SYSTEM_ROLES={
    SUPER_ADMIN: "SUPER_ADMIN",
    INSTRUCTOR: "INSTRUCTOR",
    LEARNER: "LEARNER"
};
