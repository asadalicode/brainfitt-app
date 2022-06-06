import { useEffect, useState } from 'react';
import { getYoutubeVideoId } from '../../../../shared/js/getYoutubeVideoId';
import Style from './notificationDetail.module.scss';
import { ReactComponent as YoutubePlayButton } from '../../../../assets/images/youtubePlayButtonNotification.svg';
import banner from '../../../../assets/images/notification/banner.png';
import graph from '../../../../assets/images/notification/graph.png';

const NotificationDetail = () => {
    const [thumbnail, setThumbnail] = useState('');
    const [isVideoPlay, setIsVideoPlay] = useState(false);
    const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/hUUyapA3QvM?autoplay=1");

    useEffect(() => {
        let _id = getYoutubeVideoId(videoUrl);
        setThumbnail(`http://img.youtube.com/vi/${_id}/0.jpg`)
    }, []);

    const handlePlayVideo = () => {
        setIsVideoPlay((previousValue) => !previousValue);
    }

    return (
        <div className={`${Style.container}`}>
            <div className={`${Style.bannerContainer}`}>
                <img src={banner}
                    className={`${Style.mainImage}`}
                />
                <span className={Style.title}>Blissiree</span>
            </div>
            <h5 className='mt-3 mb-3'>Hey Fahad,</h5>
            <p>
                I am extremely happy you're here on your pathway to happiness. I founded Brain Wellness Spa to help people overcome their mental challenges with utmost ease.
            </p>
            <p>
                t's important to be tenacious, when seeking a life changing experience. Your journey towards happiness starts with this pre-session 1 audio. Listen to it in a relaxed state in a darkened room preferably before going to sleep. You should listen to this audio right away and you can use it daily if it puts you more at ease. The pre session audio could help to prepare your brain to accept the necessary changes that are required to achieve successful results, so it is important to download and listen to it before your first session.
            </p>

            <div className='d-flex justify-content-center'>
                <button className={`white-btn cursor-pointer mt-3 mb-3 ${Style.openAudioButton}`}>Open Audio</button>
            </div>
            <p className={`${Style.instruction}`}>Instruction on how to download to your devices (tablet, iPad, iPhone)</p>
            <ol type='1'>
                <li>
                    Download the audio on your PC / Computer
                </li>
                <li>
                    Sign In to your iTunes account
                </li>
                <li>Upload (or simply drag and drop) the download audio on to your iTunes</li>
                <li>Then Right Click on the Audio file and select Add to Device</li>
            </ol >
            <p className={`${Style.videoInstruction} mt-1`}>
                <span className=''>Click Here</span> to checkout the video instructions.
            </p>


            <p className={`${Style.note} mt-4 mb-4`}>Please note that for Android users - the download should start automatically to your devices</p>
            {/* content change  */}
            <p>
                I request you to please fill out the
                <span className={`${Style.underLine}`}> pre - session e-booklet</span> which will help your
                facilitators ascertain where your brain is at
                and why it might be behaving in a certain
                way. This could set the foundation for your
                personalised help.
            </p>
            <p>
                Filling out this e-booklet will take about 20-30
                minutes. It is necessary to complete it prior
                to your session, so your facilitator can
                discuss your answers with you at your next
                appointment. Furthermore, completing the
                e-booklet beforehand will save time and
                allow your facilitator to make an assessment
                based on your answers.
            </p>
            <p>
                It's also recommended that you go through
                our Spa menu before attending the session.
                This will give you a better understanding of
                all our offerings.
            </p>
            <p>
                Further, I would like to share what others have
                experienced after taking the very first session
                of Emotional Empowerment Program.
                Click the link below:
            </p>

            {/* youtube video */}

            {
                !isVideoPlay ?
                    <div className={`${Style.videoContainer}`}>
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
                        src={`${videoUrl}`}
                        allow="autoplay"
                    />
            }



            {/* Text change */}


            <p className='mt-4'>
                We aim to use our proprietary method to
                communicate directly to the intelligence of
                your unconscious brain to release you from
                the negativity and replace it with more joyful
                and empowering ways of thinking and
                behaving each and every day.
            </p>
            <p className='mb-0'>
                For your reference, below is a graphical
                representation of patient's responses before
                and after the very first session
            </p>

            <p className={`${Style.selfAssessment}`}>   (Source - Client Self-Assessment Survey):</p>


            {/* Graph  */}
            <div className={`${Style.graphContainer}`}>
                <p className={`${Style.graphTitle} mt-4 mb-3`}>Patients Responses Before and After 1st Session</p>
                <img src={graph} />
            </div>
        </div>
    );
}
export default NotificationDetail;