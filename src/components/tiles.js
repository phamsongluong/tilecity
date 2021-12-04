import React from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { connect } from "react-redux";
import { getLocation } from "../actions/location";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const styles = {
  parent: "grid grid-rows-3 grid-flow-col border-solid border-2 border-white ",
  styleBig:
    "row-span-3 col-span-2 bg-yellow-200 border-solid border-2 border-white",
  styleMedium:
    "row-span-2 col-span-1 bg-blue-200 border-solid border-2 border-white",
  styleSmall:
    "row-span-1 col-span-1 bg-pink-200 border-solid border-2 border-white",
  clickedStyleBig:
    "row-span-3 col-span-2 bg-gray-300 border-solid border-2 border-white",
  clickedStyleMedium:
    "row-span-2 col-span-1 bg-gray-300 border-solid border-2 border-white",
  clickedStyleSmall:
    "row-span-1 col-span-1 bg-gray-300 border-solid border-2 border-white",
};

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.onTextPress = this.onTextPress.bind(this);
    this.state = {
      clickedIndex: null,
    };
  }

  onTextPress = (e, id) => {
    this.setState(
      {
        clickedIndex: id,
      },
      //We can fetch data from API to get information about the location clicked then update to redux
      () => this.props.getLocation(id)
    );
  };

  renderTable = (start, end) => {
    let res = [];
    for (let i = start; i < end; i++) {
      if (i % 3 === 2) {
        res.push(
          <Tooltip
            placement="top"
            trigger={["click"]}
            overlay={<span>Big Block</span>}
          >
            <div
              key={i}
              onClick={(e) => this.onTextPress(e, i)}
              class={
                i === this.state.clickedIndex
                  ? styles.clickedStyleBig
                  : styles.styleBig
              }
            >
              <p>Big</p>
            </div>
          </Tooltip>
        );
      } else if (i % 3 === 1) {
        res.push(
          <Tooltip
            placement="top"
            trigger={["click"]}
            overlay={<span>Medium block</span>}
          >
            <div
              key={i}
              onClick={(e) => this.onTextPress(e, i)}
              class={
                i === this.state.clickedIndex
                  ? styles.clickedStyleMedium
                  : styles.styleMedium
              }
            >
              <p>Medium</p>
            </div>
          </Tooltip>
        );
      } else {
        res.push(
          <Tooltip
            placement="top"
            trigger={["click"]}
            overlay={<span>Small Block</span>}
          >
            <div
              key={i}
              onClick={(e) => this.onTextPress(e, i)}
              class={
                i === this.state.clickedIndex
                  ? styles.clickedStyleSmall
                  : styles.styleSmall
              }
            >
              <p>Small</p>
            </div>
          </Tooltip>
        );
      }
    }

    return res;
  };

  render() {
    const { info } = this.props;
    return (
      <div class="grid grid-cols-3 grid-rows-5">
        <div class="bg-origin-border p-4 border-4 border-dashed col-span-2 row-span-5 flex">
          <div class="flex-initial w-full">
            <MapInteractionCSS>
              <div key={"a"} class={styles.parent}>
                {this.renderTable(0, 10)}
              </div>
              <div key={"b"} class={styles.parent}>
                {this.renderTable(10, 20)}
              </div>
            </MapInteractionCSS>
          </div>
        </div>
        <div class="bg-origin-border p-4 border-4 border-dashed row-span-2 col-span-1">
          <p class="font-sans text-red-500">Clicked Tile Info</p>
          <p class="font-sans text-red-500">
            Id:{" "}
            {this.state.clickedIndex !== null ? this.state.clickedIndex : "-"}
          </p>
          <p>Title: {info.title ? info.title : "-"}</p>
          <p>Description: {info.body ? info.body : "-"}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: (id) => {
      dispatch(getLocation(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);
