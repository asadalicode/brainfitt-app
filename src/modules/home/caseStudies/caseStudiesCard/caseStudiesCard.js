import { useEffect, useState } from 'react';
import Style from './caseStudiesCard.module.scss';
import { ReactComponent as YoutubePlayButton } from '../../../../assets/images/youtubePlayButton.svg';

const CaseStudiesCard = ({ title, videoUrl }) => {

    const [thumbnail, setThumbnail] = useState('');
    const [videoId , setVideoId] = useState('');
    const [isVideoPlay, setIsVideoPlay] = useState(false);

    const getYoutubeVideoId = (url) => {
        let _id = '';
        let _url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (_url[2] !== undefined) {
            _id = _url[2].split(/[^0-9a-z_\-]/i);
            _id = _id[0];
        }
        else {
            _id = _url;
        }
        return _id;
    }

    useEffect(() => {
        let _id = getYoutubeVideoId(videoUrl);
        setVideoId(_id);
        setThumbnail(`http://img.youtube.com/vi/${_id}/0.jpg`)
    }, [videoUrl])

    const handlePlayVideo = () => {
        setIsVideoPlay((previousValue) => !previousValue);
    }

    return (
        <div className={`${Style.carouselItem}`}>
            <div>
                {
                    !isVideoPlay ?
                        <div className={`d-flex justify-content-center ${Style.videoContainer}`}>
                            <img src={thumbnail}
                                draggable="false"
                                className={`${Style.video}`}
                            />
                            <div onClick={handlePlayVideo} className={`${Style.playIcon} cursor-pointer`}>
                                <YoutubePlayButton height={80} width={80} />
                            </div>
                        </div>
                        :
                        <iframe
                            className={`${Style.video}`}
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            allow="autoplay"
                        />
                }

                <h5 className={`mt-3 ${Style.title}`}>{title}</h5>
            </div>
        </div>
    );
}
export default CaseStudiesCard;