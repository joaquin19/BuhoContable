const user = {
    name: 'Mauricio Figueroa',
    type: 'Super Admin',
    avatar: require('../layout/assets/img/avatar-admin.png'),
    email: 'superadmin@test.com',
    password: 'superadmin',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIgIiwiZW1haWwiOiJyb2Ryb18xODVsY0Bob3RtYWlsLmNvbSIsImJpcnRoZGF0ZSI6IjAwMDEtMDEtMDEiLCJqdGkiOiJkYjgyYmIyZC1kY2IzLTQ2YjQtYjEzNC1iMjY0N2E2ZTlkYjkiLCJleHAiOjE1Nzc3MzY4NzMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDM0Mi8ifQ.6hVw9XndWY-v_NKmtXjEEHxVaBE0d47n-uJXXY_yrZE',
    permissions: {
        see: true,
        create: true,
        update: true,
        delete: true
    }
}

const user1 = {
    name: 'Laura Garza',
    type: 'Staff',
    avatar: require('../layout/assets/img/avatar-h.png'),
    email: 'staff@test.com',
    password: 'staff',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIgIiwiZW1haWwiOiJyb2Ryb18xODVsY0Bob3RtYWlsLmNvbSIsImJpcnRoZGF0ZSI6IjAwMDEtMDEtMDEiLCJqdGkiOiJkYjgyYmIyZC1kY2IzLTQ2YjQtYjEzNC1iMjY0N2E2ZTlkYjkiLCJleHAiOjE1Nzc3MzY4NzMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDM0Mi8ifQ.6hVw9XndWY-v_NKmtXjEEHxVaBE0d47n-uJXXY_yrZE',
    permissions: {
        see: true,
        create: true,
        update: true,
        delete: true
    }
}

const user2 = {
    name: 'Jesus Perez',
    type: 'Capturista',
    avatar: require('../layout/assets/img/avatar-g.png'),
    email: 'capturista@test.com',
    password: 'capturista',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIgIiwiZW1haWwiOiJyb2Ryb18xODVsY0Bob3RtYWlsLmNvbSIsImJpcnRoZGF0ZSI6IjAwMDEtMDEtMDEiLCJqdGkiOiJkYjgyYmIyZC1kY2IzLTQ2YjQtYjEzNC1iMjY0N2E2ZTlkYjkiLCJleHAiOjE1Nzc3MzY4NzMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDM0Mi8ifQ.6hVw9XndWY-v_NKmtXjEEHxVaBE0d47n-uJXXY_yrZE',
    permissions: {
        see: true,
        create: true,
    }
}

export default ({email, password}) => {
    if(user.email === email, user.password === password){
        return {
            token: user.token,
            user: {
                name: user.name,
                type: user.type,
                avatar: user.avatar
            },
            permissions: user.permissions
        }
    } else if(user1.email === email, user1.password === password){
        return {
            token: user1.token,
            user: {
                name: user1.name,
                type: user1.type,
                avatar: user1.avatar
            },
            permissions: user1.permissions
        }
    } else if (user2.email === email, user2.password === password){
        return {
            token: user2.token,
            user: {
                name: user2.name,
                type: user2.type,
                avatar: user2.avatar
            },
            permissions: user2.permissions
        }
    } else {
        return {
            token: ''
        }
    }
}