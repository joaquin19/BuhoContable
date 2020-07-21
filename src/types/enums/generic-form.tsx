
export enum GenericComponentEnum {
    GenericComponent = 'GenericComponent',
    LayoutComponent = 'LayoutComponent',
    GroupedComponent = 'GroupedComponent',
    NavigationComponent = 'NavigationComponent',
    ControlComponent = 'ControlComponent',
}

export enum LayoutComponentEnum {
    Container = 'Container',
    Row = 'Row',
    Col = 'Col',
}

export enum GroupedComponentEnum {
    Fieldset = 'Fieldset'
}

export enum NavigationComponentEnum {
    Tab = 'Tab'
}

export enum ControlComponentEnum {
    Input = 'Input',
    Select = 'Select'
}


export const Action = {
    Catalogs: {
        Waves: {
            FilterWaves: 262,
            SaveWave: 263,
            UpdateWave: 264,
            DeleteWave: 265,
        },
        Candidates: {
            Approver: 2,
            AddNewCandidate: 3,
            CheckCandidates: 1,
            AccessEvaluators: 4,
            AccessSeeSingleCandidate: 5,
            AccessEditSingleCandidate: 6,
            AccessDeleteSingleCandidate: 7,
            AddNewApprovalUser: 8,
            AccessSeeSingleApprovalUser: 9,
            AccessEditSingleApprovalUser: 10,
            AccessDeleteSingleApprovalUser: 11,
            AccessEvaluateSingleApprovalUser: 12
        },
        Tests: {
            AssociatedQuestions: 17,
            NewTest: 13,
            EditTest: 14,
            SeeTest: 15,
            DeleteTest: 16,
            AssociatedOptions: 18,
            NewQuestion: 19,
            EditQuestion: 20,
            SeeQuestion: 21,
            DeleteQuestion: 22,
            NewOption: 23,
            EditOption: 24,
            SeeOption: 25,
            DeleteOption: 26
        },
    },
    Security: {
        Roles: {
            CheckAllRolesRecords: 130,
            NewRole: 131,
            EditRole: 132,
            SeeRole: 133,
            DeleteRole: 134,
            ConfigureRole: 135,
        },
        Users: {
            CheckAllUsersRecords: 136,
            NewUser: 137,
            AssignedRoles: 138,
            EditUser: 139,
            SeeUser: 140,
            DeleteUser: 141,
            ResetPasswordToDefault: 142,
            ResendUserPassword: 143
        }
    },
    Training:
    {
        Training: {
            CheckAllTrainingsRecords: 164,
            CheckAllAssociatedDocuments: 165,
            CheckAllAssociatedTests: 166,
            NewTraining: 167,
            EditTraining: 168,
            SeeTraining: 169,
            DeleteTraining: 170
        },
        AssociatedDocuments: {
            NewAssociatedDocument: 171,
            EditAssociatedDocument: 172,
            SeeAssociatedDocument: 173,
            DeleteAssociatedDocument: 174,
        },
        AssociatedTests: {
            NewAssociatedTest: 175,
            EditAssociatedTest: 176,
            SeeAssociatedTest: 177,
            DeleteAssociatedTest: 178,
        },
    },
    Miscellaneous: {
        PettyBox: {
            CreateBalance: 244,
            GetBalance: 245,
            GetComboBalance: 246,
            UpdateBalance: 256,
            AllExpenses: 261,
            CreateExpenses: 247,
            EditExpenses: 248,
            DeleteExpenses: 249,
            CreateDeliveryProof: 250,
            EditDeliveryProof: 251,
            DeleteDeliveryProof: 252,
            CreateRequirements: 253,
            EditRequirements: 254,
            DeleteRequirements: 255
        },
        Requests: {
            FilterRequest: 276,
            GetRequestId: 277,
            CreateRequest: 278,
            UpdateRequest: 279,
            DeleteRequest: 280,
        },
        Notifications: {
            AllNotifications: 288,
            NotificationsEmployee: 293,
            GetNotificationId: 289,
            CreateNotification: 290,
            UpdateNotification: 291,
            DeleteNotification: 292,
        }
    }
}


export const getAction = (module: string, screen: string) => Action[module][screen];

export enum ScreensSecurity {
    Security_Users = 'Security.Users',
    Security_Roles = 'Security.Roles',

    Catalogs_Candidates = 'Catalogs.Candidates',
    Catalogs_Waves = 'Catalogs.Waves',
    Catalogs_CandidatesAssignation = 'Catalogs.CandidatesAssignation',
    Catalogs_Positions = 'Catalogs.Positions',
    Catalogs_Employees = 'Catalogs.Employees',
    Catalogs_Documents = 'Catalogs.Documents',
    Catalogs_Medicine = 'Catalogs.Medicine',
    Catalogs_Lockers = 'Catalogs.Lockers',
    Catalogs_Tests = 'Catalogs.Tests',
    Leads_DncManager = 'Operation.Dnc',
    Leads_Leads = 'Operation.Leads',
    Catalogs_Departments = 'Catalogs.Departments',
    Catalogs_Clients = 'Catalogs.Clients',
    Catalogs_Campaigns = 'Catalogs.Campaigns',
    Administrative_Proceedings = 'Administratives.Proceedings',
    Catalogs_Companies = 'Catalogs.Companies',
    Catalogs_Skills = 'Catalogs.Skills',
    Catalogs_Badges = 'Catalogs.Badges',
    Administrtive_MedicalRevision = 'Administratives.MedicalRevision',
    Administrative_MedicalRevision = 'Administratives.MedicalRevision',
    Administrative_Absenteism = 'Administratives.Absenteism',
    Catalogs_LOAs = 'Catalogs.LOAs',
    Administrative_CoffeeEvaluations = 'Administratives.CoffeeEvaluations',
    Training_Training = 'Training.Training',
    Miscellaneous_PettyBox = 'Miscellaneous.PettyBox',
    Miscellaneous_RequestofPurchase = 'Miscellaneous.RequestofPurchase',
    Miscellaneous_Notifications = 'Miscellaneous.Notifications'
}
