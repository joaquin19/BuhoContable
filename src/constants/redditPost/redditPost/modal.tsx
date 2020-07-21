export default ({ contextView, data, row }) => {
    var modalData = [];
    modalData =
        [
            {
                name: 'Training Name:',
                data: data.trainingName
            },
            {
                name: 'Training Description:',
                data: data.trainingDescription
            },
            {
                name: 'Duration Hours:',
                data: data.durationHours
            },
            {
                name: 'Position Name:',
                data: row[1]
            }
        ];

    return modalData;
}