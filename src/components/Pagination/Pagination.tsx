import './Pagination.css';

type PropsType = {
  count: number;
  setPage: (page: number) => void;
};

const Pagination = ({ count, setPage }: PropsType) => {
  const itemsPerPage = 10;
  const pageAmount = Math.ceil(count / itemsPerPage);
  const pageArray = new Array(pageAmount)
    .fill(pageAmount)
    .map((item, index) => index + 1);

  return (
    <ul className="pagination">
      {pageArray.map((page: number) => {
        return (
          <li key={page}>
            <button
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
