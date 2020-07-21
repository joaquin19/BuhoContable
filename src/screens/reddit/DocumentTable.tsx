import React, { useRef, useEffect, forwardRef } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { Table } from 'reactstrap'

interface Props {
    indeterminate?: boolean;
    name: string;
}

const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
        const defaultRef = React.useRef(null);
        const combinedRef = useCombinedRefs(ref, defaultRef);

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [combinedRef, indeterminate]);

        return (
            <React.Fragment>
                <input type="checkbox" ref={combinedRef} {...rest} />
            </React.Fragment>
        );
    }
);

interface Props {
    refreshSelectedDocs: (data) => void;
    selRowIds: any; data: any;
}

const DocumentTable = ({ refSelectedDocs, selRowIds, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const columns = React.useMemo(
        () => [
            {
                Header: 'Posts in Order: ',
                columns: [
                    {
                        Header: 'SKU',
                        accessor: 'sku',
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Quantity',
                        accessor: 'quantity',
                    },
                    {
                        Header: 'Price',
                        accessor: 'price',
                    },
                ]
            }],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,

            initialState: { selectedRowIds: selRowIds },
        },
        //usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                ...columns,
            ])
        }
    )
    useEffect(() => {
        const events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];
        refSelectedDocs(selectedFlatRows.map(x => x.original.trainingDocsId));
    }, [selectedRowIds]);

    return (

        <Table {...getTableProps()} striped bordered hover style={{ marginBottom: '50px' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} style={{ fontSize: '17px' }}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>

    )
}
export default DocumentTable;