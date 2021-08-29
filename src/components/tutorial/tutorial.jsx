import React from 'react';

const Tutorial = () => {
  return (
    <div>
      <div className="edit-form">
        <h4>Tutorial</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control" />
          </div>
          <div className="form-group">
            <label>
              <strong>Status</strong>
            </label>
          </div>
        </form>

        <button type="button" className="btn btn-primary m-1">
          UnPublishe
        </button>
        <button className="btn btn-danger m-1">Delete</button>
        <button className="btn btn-success m-1">Update</button>
        <p>Text</p>
      </div>
    </div>
  );
};

export default Tutorial;
