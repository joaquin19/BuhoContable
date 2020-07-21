import { required } from "../../../helper/validation-helper";

export const fillForm = (dataForm: any, onChangeField: (data: any, name: any) => void) => ({
    form: 'Generic',
    inputs: [
        {
            field: 'Input',
            type: 'text',
            name: 'sku',
            label: 'SKU',
            placeholder: 'SKU',
        },
        {
            field: 'Input',
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Name',
            validate: [required],
        },
        {
            field: 'Input',
            type: 'number',
            name: 'quantity',
            label: 'Quantity',
            placeholder: 'Quantity',
            validate: [required],
        },
        {
            field: 'Input',
            type: 'number',
            name: 'price',
            label: 'Price',
            placeholder: 'Price',
            validate: [required],
        },
    ]
});

export const NewForm = (onSubmit: () => void, onChangeField: (data: any, name: any) => void, dataForm: any) => {
    return {
        initialValues: {
            testId: 0,
            testName: '',
            TestDescription: '',
            userCreateCode: 0,
            dateCreate: new Date(),
            userUpdateCode: 0,
            dateUpdate: new Date()
        },
        settingsForm: {
            titleForm: 'New Post',
            icon: 'fa-plus',
            form: fillForm(dataForm, onChangeField),
            onSubmit: onSubmit,
            buttonName: 'Save'
        }
    }
}