import React from 'react';
import $ from 'jquery';

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.setData = this.setData.bind(this);
    this.setUserActivities = this.setUserActivities.bind(this);
  }

  //  collecting the array of selected checkbox values onClick event
  onCheckBoxClick(e) {
    let selectedElement = $("input[name='activities']:checked");
    let arr = [];
    const obj = this;
    $.each(selectedElement, function(index) {
      console.log(index, $(this).val());
      arr.push($(this).val());
      if (selectedElement.length - 1 === index) {
        obj.setData(arr);
      }
    });
  }

  //  setting the state with the array of user selected categories
  setData(data) {
    this.setState(
      {
        category: data,
      },
      () => {
        this.setUserActivities();
      }
    );
  }

  //setting the activities state in spp.jsx component
  setUserActivities() {
    this.props.setActivities(this.state.category);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <p className="categoryText">
              <label className="oneLabel">
                <input
                  className="categoryBox"
                  type="checkbox"
                  name="activities"
                  value="eat"
                  onClick={this.onCheckBoxClick}
                />
                Eat
              </label>
              <label>
                <input
                  className="categoryBox"
                  type="checkbox"
                  name="activities"
                  value="party"
                  onClick={this.onCheckBoxClick}
                />
                Party
              </label>
              <label>
                <input
                  className="categoryBox"
                  type="checkbox"
                  name="activities"
                  value="sleep"
                  onClick={this.onCheckBoxClick}
                />
                Sleep
              </label>
              <label>
                <input
                  className="categoryBox"
                  type="checkbox"
                  name="activities"
                  value="explore"
                  onClick={this.onCheckBoxClick}
                />
                Explore
              </label>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCategory;
