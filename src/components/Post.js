import React, { useState } from "react";
// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

class Post extends React.Component {
    constructor(props) {
        super(props);

        // Inicialize o estado 'likes' com o valor das propriedades
        this.state = {
            showMore: false,
            likes: props.likes, // Inicialize o estado likes com o valor das propriedades
        };
    }


    // Crie a função para lidar com o clique do botão "Like"
    handleLikeClick() {
        fetch(`http://localhost:8081/like/${this.props.id}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                // Atualize o estado 'likes' com o novo número de likes obtido da resposta
                this.setState({ likes: data.likes });
            })
            .catch(error => console.error('Erro ao adicionar like:', error));
    }


    sharePost() {
        const { title, text, id } = this.props; // Obtém o título e o texto das props
        const postLink = `http://localhost:3000/posts/${id}`; // Obtém o link da página atual
        console.log(postLink)

        if (navigator.share) { // Verifica se o navegador suporta a API de compartilhamento
            navigator.share({
                title: title, // Use o título da prop
                text: text,   // Use o texto da prop
                url: postLink
            })
                .then(() => console.log('Link compartilhado com sucesso!'))
                .catch((error) => console.error('Erro ao compartilhar:', error));
        } else {
            // Se o navegador não suporta a API de compartilhamento, você pode fornecer um link de compartilhamento alternativo
            const alternativeShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postLink)}`;
            window.open(alternativeShareLink, '_blank');
        }
    }


    render() {
        const { key, title, content, image, date } = this.props;

        const newDate = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = newDate.toLocaleDateString("en-US", options);

        return (
            <>
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="fill-white"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-4">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href={key} onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={image}
                                                        width="180px"
                                                        height="180px"
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col
                                            className="order-lg-3 text-lg-right align-self-lg-center"
                                            lg="4"
                                        >
                                            <div className="card-profile-actions py-4 mt-lg-0">
                                                <Button
                                                    className="mr-4"
                                                    color="info"
                                                    onClick={() => this.handleLikeClick()}
                                                    size="sm"
                                                >
                                                    Like
                                                </Button>

                                                <Button
                                                    className="float-right"
                                                    color="default"
                                                    onClick={() => this.sharePost()}
                                                    size="sm"
                                                >
                                                    Share
                                                </Button>

                                            </div>
                                        </Col>
                                        <Col className="order-lg-1" lg="4">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">{this.state.likes}</span>
                                                    <span className="description">Likes</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-5">
                                        <h3>
                                            {title}
                                            <span className="font-weight-light">, {formattedDate}</span>
                                        </h3>
                                    </div>
                                    <div className="mt-5 py-5 border-top text-center">
                                        <Row className="justify-content-center">
                                             <Col lg="9">
                                                <p>
                                                    {this.state.showMore ? content : content.slice(0, 200)}
                                                </p>
                                                {content.length > 200 && !this.state.showMore && (
                                                    <Button onClick={() => this.setState({ showMore: true })}>Show more</Button>
                                                )}
                                                {this.state.showMore && (
                                                    <Button onClick={() => this.setState({ showMore: false })}>Show less</Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>

                                </div>
                            </Card>
                        </Container>
                    </section>
                </main >
            </>
        );
    }

}

export default Post;
