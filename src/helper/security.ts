export const validateAction = (AllActions: Array<any>, action: number) => {
    return AllActions.filter((element, index) => { return element.id === action }).length > 0;
}

export const validateScreen = (AllScreens: Array<any>, screen: string) => {
    return AllScreens.filter((element, index) => { return element.permission === screen }).length > 0;
}