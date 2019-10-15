import React, { Component } from "react";
import Home from "./home";
import {
  getDictionaries,
  deleteDictionary
} from "../services/dictionaryService";
import loadingGif from "../loader.gif";
import DictionaryForm from "./dictionaryForm";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

class Dictionary extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    data: []
  };

  async componentDidMount() {
    const dictionaries = await getDictionaries();
    this.setState({ data: dictionaries.data });
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
  handleEdit = () => {};
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
                        onClick={this.handleEdit}
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

export default Dictionary;
