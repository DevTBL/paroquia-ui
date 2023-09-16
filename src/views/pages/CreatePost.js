import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

// core components
import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import axios from "axios";


class CreatePost extends React.Component {
  state = {
    defaultModal: false,
    uploadedImage: null,
    photo: null,

  };

  handleSubmit = (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página após o envio

    const formData = new FormData();
    formData.append("title", event.target.elements.title.value);
    formData.append("content", event.target.elements.content.value);
    formData.append("photo", this.state.photo); // Utiliza o arquivo do estado 'photo'

    axios.post("http://localhost:8081/api/create-post", formData)
        .then((response) => {
          console.log("Dados enviados com sucesso:", response.data);
          // Limpa os campos do formulário e a imagem carregada
          this.setState({
            uploadedImage: null,
            photo: null,
          });
        })
        .catch((error) => {
          console.error("Erro ao enviar os dados:", error);
        });
  };



  handleImageUpload = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.setState({
          uploadedImage: e.target.result,
          photo: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };



  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
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
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <h1>Create Post</h1>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">

                      <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="title"
                                placeholder="Title"
                                type="text"
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="content"
                                id="exampleFormControlTextarea1"
                                placeholder="Write a content text here ..."
                                rows="3"
                                type="textarea"
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button
                                block
                                className="mb-3"
                                color="primary"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                            >
                              Image
                            </Button>
                            <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.defaultModal}
                                toggle={() => this.toggleModal("defaultModal")}
                            >
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">
                                  Upload image
                                </h6>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                >
                                  <span aria-hidden={true}>×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {this.state.uploadedImage && (
                                    <img
                                        src={this.state.uploadedImage}
                                        alt="Uploaded"
                                        style={{ maxWidth: "100%" }}
                                    />
                                )}

                              </div>

                              <div className="modal-footer">
                                <Input
                                    id="imageInput"
                                    name="photo"
                                    placeholder="Image"
                                    type="file"
                                    autoComplete="off"
                                    onChange={this.handleImageUpload}
                                />
                                <Button
                                    className="ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                >
                                  Close
                                </Button>
                              </div>
                            </Modal>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                              className="mt-4"
                              color="primary"
                              type="submit" // Altere de type="button" para type="submit"
                          >
                            Create post
                          </Button>

                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default CreatePost;
