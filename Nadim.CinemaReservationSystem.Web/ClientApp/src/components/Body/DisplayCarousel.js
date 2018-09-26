import React from 'react';
import { Carousel, Button } from 'react-bootstrap';

const DisplayCarousel = (props) =>{
    return(
        <div className="carousele-container">
            <Carousel
                interval={4000}
            >
                {
                    props.list.map((el, i) => {
                        return(
                            <Carousel.Item
                                key={i}
                            >
                                <img className="carousele-image" alt={`carousele item №${i}`} src={el} />
                                <Button
                                    bsSize="large"
                                >
                                    <span className="font-bold">Buy</span>
                                </Button>
                                <Carousel.Caption>
                                    <span className="font-x-large">{i+1} slide</span>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </div>
    );
}

export default DisplayCarousel;