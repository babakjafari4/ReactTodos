import React, { Component } from "react";
import Home from "./home";
import { getDictionaries } from "../services/dictionaryService";
import loadingGif from "../loader.gif";
import DictionaryForm from "./dictionaryForm";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { paginate } from "../utils/paginate";

class Dictionary extends Component {
  state = {
    pageSize: 5,
    currentPage: 1
  };

  async componentDidMount() {
    const dictionaries = await getDictionaries();
    this.setState({ data: dictionaries.data });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { data: allData, pageSize, currentPage } = this.state;
    const data = paginate(allData, currentPage, pageSize);
    return (
      <React.Fragment>
        <Home />
        <div className="container">
          <DictionaryForm style={{ marginBottom: 100 }} />
          <Loader gif={loadingGif} isVisible={data ? false : true} />

          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>English</th>
                <th>Turkce</th>
                <th>Persian</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(m => (
                  <tr key={m.id}>
                    <th>{m.id}</th>
                    <th>{m.english}</th>
                    <th>{m.turkish}</th>
                    <th>{m.persian}</th>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            itemCount={allData && allData.length}
            pageSize={pageSize}
            onPageChange={page => this.handlePageChange(page)}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dictionary;
