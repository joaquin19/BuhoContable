import * as SecuriyHelper from '../../../helper/security';
import { getAction } from '../../../types/enums/generic-form'

export default (onCreate: () => void, onReturn: () => void, isForm: boolean): Array<any> => {
    let actions = [];
    if (!isForm) {

        actions.push({
            type: 'Button',
            data: {
                title: 'New Training',
                icon: 'fa-plus',
                onClick: onCreate
            }
        });
    } else {
        actions.push({
            type: 'Button',
            data: {
                title: 'Return',
                icon: 'fa-reply',
                onClick: onReturn
            }
        });
    }
    return actions
}