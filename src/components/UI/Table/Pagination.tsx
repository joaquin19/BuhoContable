import React, { Component } from 'react'
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { dataPagination } from '../../types';
import Select2 from 'react-select2-wrapper'
import 'react-select2-wrapper/css/select2.css'

interface Props extends React.Props<PaginationComponent> {
	pagination: dataPagination;
	changePage: (data: object) => void;
}

export default class PaginationComponent extends Component<Props> {

	selectedPage = (value: any) => {
		this.props.changePage({
			currentPage: 1,
			pageSize: parseInt(value)
		});
	}

	setPage(event: React.MouseEvent, page: number) {
		const { currentPage, pageSize } = this.props.pagination;
		event.preventDefault();
		if (currentPage !== page) this.props.changePage({
			currentPage: page,
			pageSize
		});
	}

	pagedNumber = () => {
		const { pageCount, currentPage } = this.props.pagination;
		let pagination = [];
		let paintEllipsis: boolean;
		for (let i = 1; i <= pageCount; i++) {
			if (i <= 2 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || i > pageCount - 2) {
				pagination.push(<PaginationItem key={i} active={currentPage === i ? true : false}>
					<PaginationLink href="#" onClick={e => this.setPage(e, i)}> {i} </PaginationLink>
				</PaginationItem>);
				paintEllipsis = true;
			} else {
				if (paintEllipsis) {
					paintEllipsis = false;
					pagination.push(<PaginationItem key={i} active={false}>
						<PaginationLink>...</PaginationLink>
					</PaginationItem>);
				}
			}
		}
		return pagination;
	}

	jumpPage(event: React.MouseEvent, flag: string) {
		event.preventDefault();
		const { currentPage, pageSize, pageCount } = this.props.pagination;
		let jump: number;
		switch (flag) {
			case 'init': //Inicio
				jump = 1
				break;
			case 'before':  //ANTES
				jump = currentPage - 1;
				break;
			case 'after': //DESPUES
				jump = currentPage + 1;
				break;
			case 'end': //FIN
				jump = pageCount;
				break;
			case 'changePageSize': //FIN
				jump = currentPage;
				break;
		}
		this.props.changePage({
			currentPage: jump,
			pageSize: flag !== 'changePageSize' ? pageSize : 0,
		});
	}

	render() {
		const { currentPage, pageSize, pageCount, rowCount, pagedTypes } = this.props.pagination;
		return (
			<div className="container-fluid">
				<Row>
					<Col xs="2" sm="2" md="2" lg="2">
						<span>Showing {((currentPage - 1) * pageSize) + pageSize - (pageSize - 1)} to {((currentPage - 1) * pageSize) + pageSize} of {rowCount} entries</span>
					</Col>
					<Col xs="1" sm="1" md="1" lg="1">
						<Select2
							className="custom-select"
							data={pagedTypes}
							defaultValue={pageSize}
							options={{
								placeholder: 'pageSize'
							}}
							onSelect={(e) => {
								e.preventDefault();
								if (e.target.value.toString() !== pageSize.toString()) {
									this.selectedPage(e.target.value);
								}
							}}
						/>
					</Col>
					<Col xs="6" sm="6" md="6" lg="6"></Col>
					<Col xs="3" sm="3" md="3" lg="3">
						<Pagination aria-label="Page navigation example" style={{ float: 'right' }}>
							<PaginationItem disabled={currentPage === 1 ? true : false}>
								<PaginationLink first onClick={e => this.jumpPage(e, 'init')} />
							</PaginationItem>
							<PaginationItem disabled={(currentPage - 1) <= 0 ? true : false}>
								<PaginationLink previous onClick={e => this.jumpPage(e, 'before')} />
							</PaginationItem>
							{this.pagedNumber()}
							<PaginationItem disabled={(currentPage + 1) > pageCount ? true : false}>
								<PaginationLink next onClick={e => this.jumpPage(e, 'after')} />
							</PaginationItem>
							<PaginationItem disabled={currentPage === pageCount ? true : false}>
								<PaginationLink last onClick={e => this.jumpPage(e, 'end')} />
							</PaginationItem>
						</Pagination>



					</Col>
				</Row>
			</div>
		)
	}
}
