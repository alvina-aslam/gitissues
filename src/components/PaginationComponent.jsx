import React from 'react';
class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sendPageNumber = this.sendPageNumber.bind(this);
    }

    sendPageNumber(e) {
        this.props.onPageChange(`${e.currentTarget.dataset.url}`);
    }

    render() {
        const pages = this.props.pages;
        const currentPageNumber = this.props.currentPageNumber
        const lastpage = pages.last ? pages.last.split("=").pop() : pages.prev ? +pages.prev.split("=").pop() + 1 : 1
        const pageButtons = Array.apply(null, { length: lastpage })
            .map(Number.call, Number)
            .map(x => `&page=${x + 1}`)
        return (
            <nav className="pagination is-medium is-centered" role="navigation" aria-label="pagination">
                <button
                    className={"pagination-previous " + (currentPageNumber > 1 ? "" : " is-invisible")}
                    data-url={`&page=${currentPageNumber - 1}`}
                    onClick={this.sendPageNumber}>
                    ◄◄
                </button>
                <button
                    className="pagination-link is-hidden-tablet">{`${currentPageNumber}/${lastpage}`}
                </button>
                <button 
                    className={"pagination-next " + (currentPageNumber < lastpage ? "" : " is-invisible")}
                    data-url={`&page=${currentPageNumber + 1}`}
                    onClick={this.sendPageNumber}>
                    ►►
                </button>
                <ul className="pagination-list">
                    {pageButtons.map((page, i) => {
                        const p = +page.split("=").pop()
                        return <li key={i} className="is-hidden-mobile">
                            <button 
                                data-url={page}
                                onClick={this.sendPageNumber}
                                className={"pagination-link " + (p === (currentPageNumber) ? " is-current" : p)}
                                aria-label={"Goto page " + p} >{p}
                            </button>
                        </li>
                    }
                    )}
                </ul>
            </nav>

        );
    }
}
export default PaginationComponent;