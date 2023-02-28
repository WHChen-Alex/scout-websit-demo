import React, { Component } from "react";
import ProductTile from "../../ProductTile/ProductTile";
import { connect } from "react-redux";
import { openSort, getSortDistance, clearSort } from "../../../actions";

import productListHeader from "../../../images/essentials_1400x.jpg";

class ProductList extends Component {
  constructor() {
    super();
    this.productSortRef = React.createRef();
    this.handleSortPosition = this.handleSortPosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleSortPosition);
    let distanceFromTop = this.productSortRef.current.getClientRects()[0].top;
    this.props.getSortDistance(distanceFromTop);
    fetch(
      "https://rum.browser-intake-datadoghq.com/api/v2/rum?ddsource=browser&ddtags=sdk_version%3A4.16.0%2Cservice%3Aalex-test-rum&dd-api-key=pub6125aec05682e84817caf2e46844043d&dd-evp-origin-version=4.16.0&dd-evp-origin=browser&dd-request-id=b001913b-ac38-4826-84b4-058cdcb4eb17&batch_time=1675910618291",
      {
        headers: {
          accept: "*/*",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "text/plain;charset=UTF-8",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site"
        },
        referrer: "https://vzxg40.csb.app/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body:
          '{"_dd":{"format_version":2,"drift":-1,"session":{"plan":2}},"application":{"id":"85ba2717-6f75-4167-b2e8-dd52e06f8fc4"},"date":1675910529157,"service":"alex-test-rum","source":"browser","session":{"id":"3355af37-cd5d-41ae-bc10-8250bc781e0f","type":"user","has_replay":true},"view":{"id":"345c669f-d49c-4429-b240-3b7ed629e3ac","url":"https://vzxg40.csb.app/account","referrer":""},"resource":{"id":"a1b191e3-575c-4e76-82af-f8aca6d6c67c","type":"xhr","duration":60326000000,"method":"GET","status_code":200,"url":"https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Freact-e-commerce-65275%2Fdatabases%2F(default)&gsessionid=Bifi_YzcKjK8ogbtRXi0BcYZJiPmiCDdH2R2I3yfC2I&VER=8&RID=rpc&SID=VkpRbQkF1TT6URRkBPuyqA&CI=0&AID=3&TYPE=xmlhttp&zx=hrge2xmd31a5&t=1"},"type":"resource"}\n{"_dd":{"format_version":2,"drift":-1,"session":{"plan":2},"document_version":6,"replay_stats":{"records_count":131,"segments_count":3,"segments_total_raw_size":298239}},"application":{"id":"85ba2717-6f75-4167-b2e8-dd52e06f8fc4"},"date":1675910463153,"service":"alex-test-rum","source":"browser","session":{"id":"3355af37-cd5d-41ae-bc10-8250bc781e0f","type":"user","has_replay":true},"view":{"id":"345c669f-d49c-4429-b240-3b7ed629e3ac","url":"https://vzxg40.csb.app/account","referrer":"","action":{"count":0},"frustration":{"count":0},"cumulative_layout_shift":0,"dom_complete":2333200000,"dom_content_loaded":2085800000,"dom_interactive":2084400000,"error":{"count":0},"first_contentful_paint":5186100000,"first_input_delay":1100000,"first_input_time":6792000000,"is_active":true,"largest_contentful_paint":5186100000,"load_event":2335600000,"loading_type":"initial_load","long_task":{"count":3},"resource":{"count":37},"time_spent":129339000000,"in_foreground_periods":[{"start":5102300000,"duration":9618200000},{"start":31203800000,"duration":266600000},{"start":32784100000,"duration":5241400000}]},"type":"view"}',
        method: "POST",
        mode: "cors",
        credentials: "omit"
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleSortPosition);
    this.props.clearSort();
  }

  handleSortPosition() {
    let distanceFromTop = this.productSortRef.current.getClientRects()[0].top;
    this.props.getSortDistance(distanceFromTop);
  }

  renderProducts(currentProducts, sortedProducts) {
    let productsToRender;
    if (sortedProducts.length > 0) {
      productsToRender = sortedProducts;
    } else {
      productsToRender = currentProducts;
    }

    return productsToRender.map((product, idx) => {
      return (
        <ProductTile
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          animationDelay={idx}
        />
      );
    });
  }

  render() {
    const { products, openSort, sortedProducts } = this.props;

    return (
      <section className="ProductList">
        <header
          className="ProductList__header"
          style={{ backgroundImage: `url(${productListHeader})` }}
        >
          <h1 className="Heading h1">Products</h1>
        </header>

        <div className="ProductList__sort" ref={this.productSortRef}>
          <button
            onClick={() => openSort()}
            className="Heading Text--subdued h6"
          >
            Sort
            <i className="fas fa-chevron-down" />
          </button>
        </div>

        <div className="ProductList__collection">
          {this.renderProducts(products, sortedProducts)}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // products: state.products,
    products: state.firestoreProducts,
    sortTab: state.sort.sortTab,
    sortedProducts: state.sort.sortedProducts
  };
};

export default connect(mapStateToProps, {
  openSort,
  getSortDistance,
  clearSort
})(ProductList);
