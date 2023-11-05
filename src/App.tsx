import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import { ErrorBoundaryContext } from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('query') ?? ''
  );
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');
  const [page, setPage] = useState(1);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    const newQuery = inputValue.trimEnd();
    setQuery(newQuery);
    setPage(1);
    localStorage.setItem('query', newQuery);
  };

  useEffect(() => {
    const queryParams = `?search=${query}&page=${page}`;
    navigate(`/${queryParams}`);
  }, [query, page, navigate]);

  return (
    <ErrorBoundaryContext.Consumer>
      {(triggerError) => (
        <Fragment>
          <header className="header">
            <Input value={inputValue} onChange={handleInputChange} />
            <Button title="Search" onClick={handleSearch} />
            <Button
              title="Throw Error"
              onClick={() => {
                triggerError(new Error('For testing Error Boundary'));
              }}
            />
          </header>
          <CardList
            query={query}
            page={page}
            setPage={setPage}
            triggerError={triggerError}
          />
        </Fragment>
      )}
    </ErrorBoundaryContext.Consumer>
  );
};

export default App;
