import Style from './carousel.module.scss';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const CarouselSlider = ({
    carouselSlides = []
}) => {
    return (
        <>
            <Carousel
                responsive={responsive}
                containerClass={Style.carouselSlider}
                showDots={true}
                swipeable={false}
                autoPlay={true}
                dotListClass={Style.dot}
            >
                {
                    carouselSlides.map((item, i) => {
                        return <div className={`${Style.slide} d-flex align-items-center flex-column text-center `}>
                            <img src={item.image} />
                            <p className={`mt-4 ${Style.description}`}> {item.description}</p>
                        </div>
                    })
                }
            </Carousel>
        </>

    );
}
export default CarouselSlider;

