import * as SecuriyHelper from '../../../helper/security';
import { getAction } from '../../../types/enums/generic-form'

export const actions = (item: any, onSee: (item: any) => void, onDelete: (item: any) => void) => {
    let actions = [];
    actions.push({
        text: 'See',
        icon: 'fa-eye',
        action: () => onSee(item),
    });
    actions.push({
        text: 'Delete',
        icon: 'fa-trash-alt',
        action: () => onDelete(item.id),
    });
    return actions
}

export default (items: Array<any>, onSee: (item: any) => void, onDelete: (item: any) => void): Array<any> => {
    if (items != undefined && items != null && items.length > 0)
        return items.map(({ data, row }) => (
            {
                id: data.id,
                rows: row,
                actions: actions({ data, row }, onSee, onDelete)
            }
        ));
}