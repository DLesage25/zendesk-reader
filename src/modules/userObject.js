function newUser(userData,rubrics){
    const { 
        userID,
        userName,
        userEmail,
        userDepartment,
        managerName,
        managerID,
        podName,
        podId
    } = userData;

    const
        User = {
            id                       : userID,
            name                     : userName,
            email                    : userEmail,
            date_created             : new Date(),
            managerName              : managerName,
            managerId                : managerID,
            podName                  : podName,
            podId                    : podId,
            program                  : userDepartment
        };
    return User
}

export default newUser;