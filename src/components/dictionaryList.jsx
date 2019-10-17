import React, { Component } from "react";
import {
  getDictionaries,
  deleteDictionary
} from "../services/dictionaryService";
import loadingGif from "../loader.gif";
import DictionaryForm from "./dictionaryForm";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { paginate } from "../utils/paginate";
import Swal from "sweetalert2";
import SearchBox from "./common/SearchBox";

class DictionaryList extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    data: [],
    searchItem: "",
    dictionary: {},
    editMode: false
  };

  async componentDidMount() {
    const dictionaries = await getDictionaries();
    const data = dictionaries && dictionaries.data.sort((a, b) => b.id - a.id);
    this.setState({ data });
  }

  async componentDidUpdate(prevProps, prevState) {
    const dictionaries = await getDictionaries();
    this.setState({ data: dictionaries.data });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleDelete = async id => {
    Swal.fire({
      title: "آیا از حذف اطلاعات مورد نظر مطمئن هستید؟",
      text: "در صورت حذف، شما قادر به بازگردانی این اطلاعات نخواهید بود",
      type: "هشدار",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف کنید!"
    }).then(result => {
      if (result.value) {
        deleteDictionary(id);
        Swal.fire(
          "پاک شد!",
          "اطلاعات مورد نظر با موفقیت  حذف گردیدند.",
          "موفق"
        );
      }
    });
  };
  handleEdit = dictionary => {
    this.setState({ editMode: true, dictionary });
  };

  handleSearch = search => {
    this.setState({ searchItem: search, currentPage: 1 });
  };
  render() {
    const { data: allData, pageSize, currentPage, searchItem } = this.state;
    const sortedData = allData.sort((a, b) => b.id - a.id);
    let serachedData = sortedData;
    if (searchItem)
      serachedData = sortedData.filter(
        f =>
          f.english.toLowerCase().startsWith(searchItem.toLowerCase()) ||
          f.turkish.toLowerCase().startsWith(searchItem.toLowerCase()) ||
          f.persian.startsWith(searchItem)
      );

    const data = paginate(serachedData, currentPage, pageSize);

    return (
      <React.Fragment>
        <div>
          <Loader gif={loadingGif} isVisible={data ? false : true} />
          <SearchBox value={searchItem} onChange={this.handleSearch} />
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>English</th>
                <th>Turkce</th>
                <th>Persian</th>
                <th>Delete</th>
                <th>Edit</th>
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
                    <th>
                      <i
                        onClick={() => this.handleDelete(m.id)}
                        className="fa fa-trash-o ml-4 clickable"
                        aria-hidden="true"
                        title="delete"
                      ></i>
                    </th>
                    <th>
                      <i
                        onClick={() => this.handleEdit(m)}
                        className="fa fa-pencil-square-o ml-4 clickable"
                        aria-hidden="true"
                        title="Edit"
                      ></i>
                    </th>
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

export default DictionaryList;
