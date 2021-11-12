import styles from "../styles/Home.module.scss";

function Pagination({ contentPerPage, totalContent, paginate, currentPage}) {

    const pageNumbers = [];

    for(let page=1;page <= Math.ceil(totalContent/contentPerPage);page++) {
        pageNumbers.push(page);
    }

    return (
        <div className={styles.pagination}>
            {
                pageNumbers.map(page => ((

                    <div onClick={() => paginate(page)} key={page} className={`${styles.pages} ${(currentPage == page ? styles.activePage : "")}`}>
                        {page}
                    </div>
                )))
                
            }
        </div>
    )
}
export default Pagination;