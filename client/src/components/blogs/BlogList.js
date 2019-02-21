import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../actions";

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }
  renderBlogs() {
    const { blogs } = this.props;
    return Object.keys(blogs).map((blog, i) => (
      <div className="card darken-1 horizontal" key={blogs[blog]._id}>
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{blogs[blog].title}</span>
            <p>{blogs[blog].content}</p>
          </div>
          <div className="card-action">
            <Link to={`/blogs/${blogs[blog]._id}`}>Read</Link>
          </div>
        </div>
      </div>
    ));
  }
  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  { fetchBlogs }
)(BlogList);
