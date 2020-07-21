import React, { Component, Fragment } from 'react'
import { Table } from 'reactstrap'
import Actions from './Actions'
import Pagination from './Pagination'
import { dataPagination } from '../../types';


interface Props extends React.Props<TableComponent> {
	cells: Array<any>;
	rows: Array<any>;
	pagination?: dataPagination;
	changePage?: (data: object) => void;
}

const widthFor = (cell) => {
	const lbl = cell.label ? cell.label : cell;
	switch (lbl.toLowerCase()) {
		case 'actions':
			return '75px';
		default:
			return 'auto';
	}
}

export default class TableComponent extends Component<Props> {
	render() {
		const { cells, rows, pagination, changePage } = this.props;
		return (
			<div id="panel-2" className="panel col-12">
				<div className="panel-container show">
					<div className="panel-content">
						<Table striped bordered hover style={{ marginBottom: '50px' }}>
							<thead>
								<tr style={{ fontSize: '17px' }}>
									{cells.map((cell, key) => (
										<th key={`thead-cell-${key}`} style={{ width: `${widthFor(cell)}` }}>
											{cell.label ? cell.label : cell}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{rows.map((row, key) => (
									<tr key={`tbody-row-${key}`}>
										{row.rows.map((text: string, key: number) => (<td key={`row-td-${key}`}>{text}</td>))}
										{row.actions && row.actions.length > 0 ? <Actions actions={row.actions} /> : null}
										{row.actionsCustom && row.actionsCustom.length > 0 ? (row.actionsCustom) : null}
									</tr>
								))}
							</tbody>
						</Table>
						{pagination ? <Pagination pagination={pagination} changePage={changePage} /> : null}
					</div>
				</div>
			</div>
		)
	}
}