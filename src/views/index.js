import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Hero from "./IndexSections/Hero.js";
import Carrousel from "./IndexSections/Carrousel"

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero/>
          <Carrousel />
          
          {/*<section className="section section-components">
            <Container>
              <Row className="row-grid justify-content-between align-items-center mt-lg">
              </Row>
              <Row className="row-grid justify-content-between">
              </Row>
            </Container>

          </section>*/}
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
